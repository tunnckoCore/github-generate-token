/*!
 * github-generate-token <https://github.com/tunnckoCore/github-generate-token>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var request = require('simple-get')
var generate = require('./index')

test('should throw when `username` not a string', function (done) {
  function fixture () {
    generate({one: 'two'}, {})
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `credentials` be string/)
  done()
})

test('should throw when invalid `user:pass` pattern given', function (done) {
  function fixture () {
    generate('user and password')
  }

  test.throws(fixture, Error)
  test.throws(fixture, /invalid `credentials` given/)
  done()
})

test('should create token then delete it', function (done) {
  var creds = 'fake-user123:fakeuser123'
  var auth = new Buffer(creds).toString('base64')

  generate(creds, function (err, data) {
    test.ifError(err)
    request({
      method: 'delete',
      url: 'https://api.github.com/authorizations/' + data.id,
      headers: {
        'user-agent': 'tunnckoCore/github-generate-token',
        'authorization': 'Basic ' + auth
      }
    }, function (err) {
      test.ifError(err)
      done()
    })
  })
})

test('should work properly without options', function (done) {
  generate('udasdasdasdasser:fdsfsdf43fvdfgdg', function bad (err, data) {
    test.ifError(err)
    test.deepEqual(data, {
      message: 'Bad credentials',
      documentation_url: 'https://developer.github.com/v3'
    })
    done()
  })
})

test('should work properly with valid options given', function (done) {
  generate('udasdasdasdasser:fdsfsdf43fvdfgdg', {
    scopes: ['user'],
    note: 'some test'
  }, function bad (err, data) {
    test.ifError(err)
    test.deepEqual(data, {
      message: 'Bad credentials',
      documentation_url: 'https://developer.github.com/v3'
    })
    done()
  })
})

test('should normalize invalid options', function (done) {
  generate('udasdasdasdasser:fdsfsdf43fvdfgdg', {
    scopes: 'user',
    note: ['some test']
  }, function bad (err, data) {
    test.ifError(err)
    test.deepEqual(data, {
      message: 'Bad credentials',
      documentation_url: 'https://developer.github.com/v3'
    })
    done()
  })
})
