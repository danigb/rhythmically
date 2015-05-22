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
  },
  "custom rest value": function() {
    s = sequenze("a rest b", null, { restValue: 'rest' });
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 0.5]);
  },
  "change parseDuration": function() {
    s = sequenze("a{10} b{5}", null, { parseDuration: function(value) {
      var match = /^([a-z]+)\{(\d+)\}$/.exec(value);
      return [match[1], +match[2]];
    }});
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b']);
    assert.deepEqual(_.pluck(s, 'duration'), [10, 5]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 10]);
  }
}).export(module);
