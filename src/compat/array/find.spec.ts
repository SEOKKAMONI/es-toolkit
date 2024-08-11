import { describe, expect, it } from 'vitest';
import { empties } from '../_internal/empties';
import { find } from './find';
import { slice } from '../_internal/slice';

describe('find', () => {
  const array = [1, 2, 3, 4];

  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ];

  it(`should return the found value`, () => {
    expect(find(objects, object => object.a)).toEqual(objects[1]);
  });

  it(`should return undefined if value is not found`, () => {
    expect(find(objects, object => object.a === 3)).toEqual(undefined);
  });

  it(`find should work with \`matches\` shorthands`, () => {
    expect(find(objects, { b: 2 })).toBe(objects[2]);
  });

  it(`find should work with \`matchesProperty\` shorthands`, () => {
    expect(find(objects, ['b', 2])).toBe(objects[2]);
  });

  it(`find should work with \`property\` shorthands`, () => {
    expect(find(objects, 'b')).toBe(objects[1]);
  });

  it(`find should return undefined for empty collections`, () => {
    const emptyValues = empties;
    const expecting = emptyValues.map(() => undefined);

    const actual = emptyValues.map(value => {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        return find(value, { a: 3 });
      } catch (e) {}
    });

    expect(actual).toEqual(expecting);
  });

  it(`find should provide correct \`predicate\` arguments for arrays`, () => {
    let args: any;
    const array = ['a'];

    find(array, function () {
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual(['a', 0, array]);
  });

  it(`find should work with an object for \`collection\``, () => {
    const actual = find({ a: 1, b: 2, c: 3 }, n => n < 3);

    expect(actual).toBe(1);
  });

  it(`find should provide correct \`predicate\` arguments for objects`, () => {
    let args: any;
    const object = { a: 1 };

    find(object, function () {
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual([1, 'a', object]);
  });
});
