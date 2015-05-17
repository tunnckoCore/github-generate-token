/*!
 * github-generate-token <https://github.com/tunnckoCore/github-generate-token>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var typeOf = require('kind-of')
var hybridify = require('hybridify')
var got = hybridify(require('gh-got'))

/**
 * > Generate github token with Basic Auth
 *
 * **Example**
 * ```js
 * var githubGenerateToken = require('github-generate-token')
 *
 * var opts = {
 *   scopes: ['user', 'gist'],
 *   note: 'my awesome app note'
 * }
 *
 * githubGenerateToken('username:password', opts)
 * .then(console.log)
 * .catch(console.error)
 * ```
 *
 * @name   githubGenerateToken
 * @param  {String}   `<credentials>` credentials pattern `username:password`
 * @param  {Object}   `[opts]` options like `scopes` and `note`
 * @param  {Function} `[callback]` node callback
 * @return {Promise}
 * @api public
 */
function githubGenerateToken (credentials, opts, callback) {
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

  var auth = ''
  var meta = credentials.split(':')

  auth = meta[0] + meta[1]
  opts = typeOf(opts) === 'object' ? opts : {}

  opts.scopes = typeOf(opts.scopes) === 'array'
  opts.note = typeOf(opts.note) === 'string'
  callback = typeOf(callback) !== 'function' ? function noop () {} : callback

  var body = {}
  body.scopes = opts.scopes ? opts.scopes : ['user', 'repo', 'gist']
  body.note = opts.note ? opts.note : 'tunnckoCore/github-generate-token'

  return got('authorizations', {
    body: JSON.stringify(body),
    headers: {
      'authorization': 'Basic ' + new Buffer(auth).toString('base64')
    }
  }, callback)
}

/**
 * expose `hybridify`
 */

githubGenerateToken.hybridify = hybridify

/**
 * expose `github-generate-token`
 */

module.exports = githubGenerateToken
