vows = require('vows');
assert = require('assert');
_ = require('lodash');

sequenze = require('../');

vows.describe('Sequenze').addBatch({
  "sequenze array": function() {
    s = sequenze(['a', 'b']);
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 0.25]);
  },
  "clone sequenze": function() {
    s1 = sequenze("a b");
    s2 = sequenze(s1);
    assert.deepEqual(s1, s2);
    assert(s1 !== s2, "Are equal but not same");
  },
  "sequenzes are always ordered": function() {
    s = sequenze("a b", function(event) {
      if(event.value == 'a') event.position += 10;
    });
    assert.deepEqual(_.pluck(s, 'value'), ['b', 'a']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0.25, 10]);
  }
}).export(module);
