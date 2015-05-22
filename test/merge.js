vows = require('vows');
assert = require('assert');
_ = require('lodash');

sequence = require('../');

vows.describe('sequence').addBatch({
  "merge sequence": function() {
    s = sequence.merge(sequence('a b'), sequence('d e'));
    assert.equal(s.length, 4);
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'd', 'b', 'e']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4, 1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 0, 0.25, 0.25]);
  }
}).export(module);
