vows = require('vows');
assert = require('assert');
_ = require('lodash');

sequence = require('../');

vows.describe('duration').addBatch({
  "sequence duration": function() {
    assert.equal(sequence.duration(sequence('a b c d')), 1);
  }
}).export(module);
