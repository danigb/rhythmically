vows = require('vows');
assert = require('assert');
_ = require('lodash');

r = require('../');

vows.describe('Rhythmically merge').addBatch({
  "merge sequences": function() {
    s = r.merge(r.sequence('a b'), r.sequence('d e'));
    assert.equal(s.length, 4);
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'd', 'b', 'e']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4, 1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 0, 0.25, 0.25]);
  }
}).export(module);
