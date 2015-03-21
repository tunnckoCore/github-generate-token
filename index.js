/**
 * github-generate-token <https://github.com/tunnckoCore/github-generate-token>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var typeOf = require('kind-of');
var got = require('then-got');

var api = 'https://api.github.com/authorizations';

/**
 * Generate github token with Basic Auth
 *
 * **Example**
 * ```js
 * var githubGenerateToken = require('github-generate-token');
 *
 * var opts = {
 *   scopes: ['user', 'gist'],
 *   note: 'my awesome note here'
 * };
 *
 * githubGenerateToken('username', 'password', opts);
 * .then(function(token) {
 *   console.log(token);
 * })
 * .catch(function(err) {
 *   console.error(err.message);
 * });
 * ```
 *
 * @name   githubGenerateToken
 * @param  {String} `username` github username
 * @param  {String} `password` github password
 * @param  {Object} `opts`     options like `scopes` and `note`
 *   @option {Array} [opts] `scopes` github oauth scopes
 *   @option {String} [opts] `note` note for the access token
 * @return {Promise}
 * @api public
 */
module.exports = function githubGenerateToken(username, password, opts) {
  if (typeOf(username) !== 'string') {
    throw new TypeError('[github-generate-token] expect `username` be string');
  }
  if (typeOf(password) !== 'string') {
    throw new TypeError('[github-generate-token] expect `password` be string');
  }

  opts = opts || {};
  if (typeOf(opts) !== 'object') {
    throw new TypeError('[github-generate-token] expect `opts` be object');
  }

  var auth = username + ':' + password;

  opts.scopes = typeOf(opts.scopes) === 'array';
  opts.note = typeOf(opts.note) === 'string';

  var body = {};
  body.scopes = opts.scopes ? opts.scopes : ['user', 'repo', 'gist'];
  body.note = opts.note ? opts.note : 'tunnckoCore/github-generate-token';

  opts = {
    body: JSON.stringify(body),
    headers: {
      'authorization': 'Basic ' + new Buffer(auth).toString('base64'),
      'user-agent': 'https://github.com/tunnckoCore/github-generate-token',
      'content-type': 'application/json'
    }
  };

  return got.get(api, opts).then(function _then(res) {
    /* istanbul ignore next */
    var body = JSON.parse(res[0]);

    /* istanbul ignore next */
    return body.token;
  });
};
