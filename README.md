# github-generate-token [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Generating github personal access token using Basic Auth `username:password`

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i github-generate-token --save
npm test
```


## API
> For more use-cases see the [tests](./test.js)

## [githubGenerateToken](./index.js#L40)
> Generate github token with Basic Auth

- `<credentials>` **{String}** credentials pattern `username:password`
- `[opts]` **{Object}** options like `scopes` and `note`
  + `scopes` **{Array}** github oauth scopes
  + `note` **{String}** note for the access token
- `[callback]` **{Function}** node style callback
- `return` **{Promise}**

**Example**
```js
var githubGenerateToken = require('github-generate-token')

var opts = {
  scopes: ['user', 'gist'],
  note: 'my awesome app note'
}

githubGenerateToken('username:password', opts)
.then(console.log) //=> token
.catch(console.error)
```


## Related
- [gitclone](https://github.com/tunnckoCore/gitclone): Clone a Github repository with only `username/repo`. Support CLI and Promise.
- [gh-got](https://github.com/sindresorhus/gh-got): Convenience wrapper for `got` to interact with the GitHub API
- [hybridify](https://github.com/hybridables/hybridify): Building hybrid APIs. You can use both callback and promise in same time.  Like `asyncFn(name, cb).then().catch()`


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/github-generate-token/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/github-generate-token
[npmjs-img]: https://img.shields.io/npm/v/github-generate-token.svg?label=github-generate-token

[license-url]: https://github.com/tunnckoCore/github-generate-token/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/github-generate-token
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/github-generate-token.svg

[travis-url]: https://travis-ci.org/tunnckoCore/github-generate-token
[travis-img]: https://img.shields.io/travis/tunnckoCore/github-generate-token.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/github-generate-token
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/github-generate-token.svg

[david-url]: https://david-dm.org/tunnckoCore/github-generate-token
[david-img]: https://img.shields.io/david/tunnckoCore/github-generate-token.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
