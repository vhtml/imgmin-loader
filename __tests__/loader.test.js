import fs from 'fs';
import path from 'path';

import imageminPngquant from 'imagemin-pngquant';

import compiler from './compiler';

const testPng = fs.readFileSync(path.resolve(__dirname, './test.png'));
const giftPng = fs.readFileSync(path.resolve(__dirname, './gift.png'));

describe('imgmin-loader', () => {
  test('img unchanged by default', () => {
    return compiler('test.png').then((image) => {
      expect(image).toEqual(testPng);
    });
  });

  test('can apply optimizations for png', () => {
    return compiler('test.png', {
      plugins: [imageminPngquant()],
    }).then((image) => {
      expect(image.length).toBeLessThan(testPng.length);
    });
  });

  test('img unchanged for limit(number) < size', () => {
    return compiler('test.png', {
      limit: 1000,
      plugins: [imageminPngquant()],
    }).then((image) => {
      expect(image.length).toEqual(testPng.length);
    });
  });

  test('can apply optimizations for limit(string) > size', () => {
    return compiler('test.png', {
      limit: '10000',
      plugins: [imageminPngquant()],
    }).then((image) => {
      expect(image.length).toBeLessThan(testPng.length);
    });
  });

  test('can apply optimizations for limit(boolean) true', () => {
    return compiler('test.png', {
      limit: true,
      plugins: [imageminPngquant()],
    }).then((image) => {
      expect(image.length).toBeLessThan(testPng.length);
    });
  });

  test('img unchanged for limit(boolean) false', () => {
    return compiler('test.png', {
      limit: false,
      plugins: [imageminPngquant()],
    }).then((image) => {
      expect(image.length).toEqual(testPng.length);
    });
  });

  test('img unchanged for uncompress', () => {
    return compiler('gift.png', {
      plugins: [imageminPngquant()],
    }).then((image) => {
      expect(image.length).toEqual(giftPng.length);
    });
  });
});
