import path from 'path';

import webpack from 'webpack';
import MemoryFs from 'memory-fs';

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    mode: 'none',
    module: {
      rules: [
        {
          test: /\.png/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'image',
              },
            },
            {
              loader: '../src/cjs.js',
              options,
            },
          ],
        },
      ],
    },
  });

  compiler.outputFileSystem = new MemoryFs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

      resolve(stats.compilation.assets.image.source());
    });
  });
};
