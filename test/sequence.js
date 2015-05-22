vows = require('vows');
assert = require('assert');
_ = require('lodash');

r = require('../');

vows.describe('Rhythmically sequence').addBatch({
  "sequenze array": function() {
    s = r.sequence(['a', 'b']);
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 0.25]);
  },
  "clone sequenze": function() {
    s1 = r.sequence("a b");
    s2 = r.sequence(s1);
    assert.deepEqual(s1, s2);
    assert(s1 !== s2, "Are equal but not same");
  },
  "sequenzes are always ordered": function() {
    s = r.sequence("a b", function(event) {
      if(event.value == 'a') event.position += 10;
    });
    assert.deepEqual(_.pluck(s, 'value'), ['b', 'a']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0.25, 10]);
  },
  "custom rest value": function() {
    s = r.sequence("a rest b", null, { restValue: 'rest' });
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/4, 1/4]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 0.5]);
  },
  "change parseDuration": function() {
    s = r.sequence("a{10} b{5}", null, { parseDuration: function(value) {
      var match = /^([a-z]+)\{(\d+)\}$/.exec(value);
      return [match[1], +match[2]];
    }});
    assert.deepEqual(_.pluck(s, 'value'), ['a', 'b']);
    assert.deepEqual(_.pluck(s, 'duration'), [10, 5]);
    assert.deepEqual(_.pluck(s, 'position'), [0, 10]);
  }
}).export(module);
