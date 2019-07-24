/* eslint-disable
  global-require,
  no-param-reassign,
  prefer-destructuring,
  import/no-dynamic-require,
*/

import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';

function shouldTransform(limit, size) {
  if (typeof limit === 'boolean') {
    return limit;
  }

  if (typeof limit === 'number' || typeof limit === 'string') {
    return size <= parseInt(limit, 10);
  }

  return true;
}

export default function loader(src) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, {
    name: 'IMGMIN Loader',
    baseDataPath: 'options',
  });

  if (typeof options.plugins === 'function') {
    options.plugins = options.plugins(this);
  }

  if (!Array.isArray(options.plugins) || options.plugins.length === 0) {
    return src;
  }

  if (shouldTransform(options.limit, src.length)) {
    const callback = this.async();
    return require('imagemin')
      .buffer(src, options)
      .then((buffer) => {
        if (buffer.length <= src.length) {
          callback(null, src);
        } else {
          callback(null, buffer);
        }
      })
      .catch((error) => {
        callback(error);
      });
  }

  return src;
}

export const raw = true;
