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

module.exports = function githubGenerateToken(username, password, opts) {
  if (typeOf(username) !== 'string') {
    throw new TypeError('[github-generate-token] expect `username` be string');
  }
  if (typeOf(password) !== 'string') {
    throw new TypeError('[github-generate-token] expect `password` be string');
  }

  opts = opts || {};
  if (typeOf(opts) !== 'object') {
    throw new TypeError('[github-generate-token] expect `opts` be object if given');
  }

  var auth = username + ':' + password;

  opts.scopes = typeOf(opts.scopes) === 'array';
  opts.note = typeOf(opts.note) === 'string';

  var body = {}
  body.scopes = opts.scopes ? opts.scopes : ['user', 'repo', 'gist', 'public_repo'];
  body.note = opts.note ? opts.note : 'tunnckoCore/github-generate-token';

  var opts = {
    body: JSON.stringify(body),
    headers: {
      'authorization': 'Basic ' + new Buffer(auth).toString('base64'),
      'user-agent': 'https://github.com/sindresorhus/got',
      'content-type': 'application/json'
    }
  };

  return got.get(api, opts).then(function _then(res) {
    var body = JSON.parse(res[0]);
    return body.token;
  });
};
