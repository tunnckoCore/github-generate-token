/*!
 * github-generate-token <https://github.com/tunnckoCore/github-generate-token>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var githubGenerateToken = require('./index')

test('should throw when `username` not a string', function (done) {
  function fixture () {
    githubGenerateToken({one: 'two'}, {})
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `credentials` be string/)
  done()
})

test('should throw when invalid `user:pass` pattern given', function (done) {
  function fixture () {
    githubGenerateToken('user and password')
  }

  test.throws(fixture, Error)
  test.throws(fixture, /invalid `credentials` given/)
  done()
})

test('should work properly without options', function (done) {
  var promise = githubGenerateToken('udasdasdasdasser:fdsfsdf43fvdfgdg')

  test.equal(typeof promise.then, 'function')
  test.equal(typeof promise.catch, 'function')
  test.equal(typeof promise.hybridify, 'function')
  promise.catch(function _catch (err) {
    test.ifError(!err)
    done()
  })
})

test('should work properly with valid options given', function (done) {
  var promise = githubGenerateToken('udasdasdasdasser:fdsfsdf43fvdfgdg', {
    scopes: ['user'],
    note: 'some test'
  })

  test.equal(typeof promise.then, 'function')
  test.equal(typeof promise.catch, 'function')
  test.equal(typeof promise.hybridify, 'function')
  promise.catch(function _catch (err) {
    test.ifError(!err)
    done()
  })
})

test('should normalize invalid options', function (done) {
  var promise = githubGenerateToken('udasdasdasdasser:fdsfsdf43fvdfgdg', {
    scopes: 'user',
    note: ['some test']
  })

  test.equal(typeof promise.then, 'function')
  test.equal(typeof promise.catch, 'function')
  test.equal(typeof promise.hybridify, 'function')
  promise.catch(function _catch (err) {
    test.ifError(!err)
    done()
  })
})

test('should be valid hybrid', function (done) {
  var cnt = 0
  var promise = githubGenerateToken('usernamefghkjdhfgdfg:passwordjsdgfhsdgf', function (err) {
    test.ifError(!err)
    cnt++
  })

  test.equal(typeof promise.hybridify, 'function')
  test.equal(typeof githubGenerateToken.hybridify, 'function')
  promise.catch(function _catch (err) {
    test.ifError(!err)
    test.equal(cnt, 1)
    done()
  })
})
