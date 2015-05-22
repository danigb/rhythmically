vows = require('vows');
assert = require('assert');
_ = require('lodash');

sequence = require('../');

vows.describe('sequence').addBatch({
  "concat sequence": function() {
    s = sequence.concat(sequence('a b'), sequence('c d'));
    assert.equal(s.length, 4);
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b', 'c', 'd']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4, 1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 0.25, 0.5, 0.75]);
  }
}).export(module);
