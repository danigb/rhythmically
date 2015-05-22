vows = require('vows');
assert = require('assert');
_ = require('lodash');

r = require('../');

vows.describe('Rhythmically duration').addBatch({
  "sequence duration": function() {
    assert.equal(r.duration(r.sequence('a b c d')), 1);
  }
}).export(module);
