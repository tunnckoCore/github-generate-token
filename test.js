/**
 * github-generate-token <https://github.com/tunnckoCore/github-generate-token>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var lab = exports.lab = require('lab').script();
var assert = require('assert');
var typeOf = require('kind-of');
var githubGenerateToken = require('./index');

var describe = lab.describe;
var it = lab.it;

describe('github-generate-token:', function() {
  it('should throw when `username` not a string', function(done) {
    function fixture() {
      githubGenerateToken({one: 'two'}, '', {});
    }

    assert.throws(fixture, TypeError);
    done();
  });
  it('should throw when `password` not a string', function(done) {
    function fixture() {
      githubGenerateToken('user', {one: 'two'}, {});
    }

    assert.throws(fixture, TypeError);
    done();
  });
  it('should throw when `opts` not an object', function(done) {
    function fixture() {
      githubGenerateToken('user', 'pass', [1, 2, 3]);
    }

    assert.throws(fixture, TypeError);
    done();
  });
  it('should work properly without options', function(done) {
    var promise = githubGenerateToken('udasdasdasdasser', 'fdsfsdf43fvdfgdg');

    assert.strictEqual(typeOf(promise.then), 'function');
    assert.strictEqual(typeOf(promise.catch), 'function');
    promise.catch(function _catch(err) {
      // work properly but fails
      // because the wrong credentials given

      done();
    });
  });
  it('should work properly with valid options given', function(done) {
    var promise = githubGenerateToken('udasdasdasdasser', 'fdsfsdf43fvdfgdg', {
      scopes: ['user'],
      note: 'some test'
    });

    assert.strictEqual(typeOf(promise.then), 'function');
    assert.strictEqual(typeOf(promise.catch), 'function');
    promise.catch(function _catch(err) {
      // work properly but fails
      // because the wrong credentials given

      done();
    });
  });
  it('should normalize invalid options', function(done) {
    var promise = githubGenerateToken('udasdasdasdasser', 'fdsfsdf43fvdfgdg', {
      scopes: 'user',
      note: ['some test']
    });

    assert.strictEqual(typeOf(promise.then), 'function');
    assert.strictEqual(typeOf(promise.catch), 'function');
    promise.catch(function _catch(err) {
      // work properly but fails
      // because the wrong credentials given

      done();
    });
  });

});
