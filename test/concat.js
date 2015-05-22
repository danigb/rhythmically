vows = require('vows');
assert = require('assert');
_ = require('lodash');

r = require('../');

vows.describe('Rhythmically concat').addBatch({
  "concat sequences": function() {
    s = r.concat(r.sequence('a b'), r.sequence('c d'));
    assert.equal(s.length, 4);
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b', 'c', 'd']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4, 1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 0.25, 0.5, 0.75]);
  }
}).export(module);
