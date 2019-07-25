<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="100" height="100" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![size][size]][size-url]

# imgmin-loader

A loader for webpack4 which minify images.

## Getting Started

To begin, you'll need to install `imgmin-loader`:

```console
$ npm install imgmin-loader imagemin-pngquant imagemin-mozjpeg --save-dev
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'imgmin-loader',
            options: {
              limit: 8192,
              plugins: [
                require('imagemin-pngquant')(),
                require('imagemin-mozjpeg')()
              ]
            }
          }
        ]
      }
    ]
  }
}
```

And run `webpack` via your preferred method.

## Options

### `limit`

Type: `Number|Boolean|String`
Default: `undefined`

The limit can be specified via loader options and defaults to no limit.

#### `Number`

A `Number` specifying the maximum size of an image in bytes. If the image size is
**equal** or **greater** than the limit, will disable minify.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'imgmin-loader',
            options: {
              limit: 8192,
              plugins: [
                require('imagemin-pngquant')(),
                require('imagemin-mozjpeg')()
              ]
            }
          }
        ]
      }
    ]
  }
}
```

#### `Boolean`

Enable or disable minify images.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'imgmin-loader',
            options: {
              limit: false,
              plugins: [
                require('imagemin-pngquant')(),
                require('imagemin-mozjpeg')()
              ]
            }
          }
        ]
      }
    ]
  }
}
```

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/imgmin-loader.svg
[npm-url]: https://npmjs.com/package/imgmin-loader
[node]: https://img.shields.io/node/v/imgmin-loader.svg
[node-url]: https://nodejs.org
[size]: https://packagephobia.now.sh/badge?p=imgmin-loader
[size-url]: https://packagephobia.now.sh/result?p=imgmin-loader
