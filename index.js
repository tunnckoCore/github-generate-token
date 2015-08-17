/*!
 * github-generate-token <https://github.com/tunnckoCore/github-generate-token>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var typeOf = require('kind-of')
var concat = require('concat-stream')
var request = require('simple-get')

/**
 * > Generate github token with Basic Auth
 *
 * **Example**
 *
 * ```js
 * var generateToken = require('github-generate-token')
 *
 * var opts = {
 *   scopes: ['user', 'gist'],
 *   note: 'my awesome app note'
 * }
 *
 * generateToken('username:password', opts, function (err, data) {
 *   if (err) return console.error(err)
 *
 *   console.log(data.token) //=> token
 * })
 * ```
 *
 * @name   githubGenerateToken
 * @param  {String}   `<credentials>` credentials pattern `username:password`
 * @param  {Object}   `[opts]` options like `scopes` and `note`
 * @param  {Function} `<callback>` node style callback
 * @api public
 */

module.exports = function githubGenerateToken (credentials, opts, callback) {
  if (typeOf(credentials) !== 'string') {
    throw new TypeError('[github-generate-token] expect `credentials` be string')
  }
  if (credentials.indexOf(':') === -1) {
    throw new Error('[github-generate-token] invalid `credentials` given')
  }
  if (!callback && typeOf(opts) === 'function') {
    callback = opts
    opts = {}
  }
  opts = typeOf(opts) === 'object' ? opts : {}

  opts.scopes = typeOf(opts.scopes) === 'array'
  opts.note = typeOf(opts.note) === 'string'
  callback = typeOf(callback) === 'function' ? callback : function noop () {}

  var body = {}
  body.scopes = opts.scopes ? opts.scopes : ['user', 'repo', 'gist']
  body.note = opts.note ? opts.note : 'tunnckoCore/github-generate-token'

  request({
    url: 'https://api.github.com/authorizations',
    body: JSON.stringify(body),
    method: 'post',
    headers: {
      'user-agent': 'https://github.com/tunnckoCore/github-generate-token',
      'authorization': 'Basic ' + new Buffer(credentials).toString('base64')
    }
  }, function (err, res) {
    if (err) return callback(err)

    res.pipe(concat(function (data) {
      callback(null, JSON.parse(data.toString()), res, data)
    }))
  })
}
