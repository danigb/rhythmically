vows = require('vows');
assert = require('assert');
_ = require('lodash');

r = require('../');

vows.describe('Parse sequence').addBatch({
  "parse rest": function() {
    s = r.sequence('r a r/w b');
    assert.equal(s.length, 2);
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0.25, 1.5]);
  },
  "sequenze default duration": function() {
    s = r.sequence('a b');
    assert.equal(s.length, 2);
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 1/4]);
  },
  "simple duration parsing": function() {
    s = r.sequence('a2 c3/e c4/e. b/w f#-2/q.');
    assert.equal(s.length, 5);
    assert.deepEqual(_.pluck(s, 'value'), 'a2 c3 c4 b f#-2'.split(' '));
    assert.deepEqual(_.pluck(s, 'duration'), [0.25, 0.125, 0.1875, 1, 0.375]);
  },
  "wrong duration": function() {
    s = r.sequence('a2/a b2/b');
    assert.deepEqual(_.pluck(s, 'value'), 'a2/a b2/b'.split(' '));
    assert.deepEqual(_.pluck(s, 'duration'), [0.25, 0.25]);
  }
}).export(module);
