/**
 * github-generate-token <https://github.com/tunnckoCore/github-generate-token>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var typeOf = require('kind-of');
var githubGenerateToken = require('./index');

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
      githubGenerateToken('user', {one: 'two'},{});
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
  it('should work properly', function(done) {
    this.timeout(20000);
    var promise = githubGenerateToken('udasdasdasdasser', 'fdsfsdf43fvdfgdg');

    assert.strictEqual(typeOf(promise.then), 'function');
    assert.strictEqual(typeOf(promise.catch), 'function');
    promise.catch(function _catch(err) {
      // work properly but fails
      // because the wrong credentials given

      done();
    });
  });
});
