vows = require('vows');
assert = require('assert');
_ = require('lodash');

r = require('../');

vows.describe('Parse sequence').addBatch({
  "sequenze transform": function() {
    s = r.sequence('a b', function(event) {
      event.value = event.value.toUpperCase();
      event.duration = event.duration * 2;
      event.position = event.position + 1;
    });
    assert.deepEqual(_.pluck(s, 'value'), ['A', 'B']);
    assert.deepEqual(_.pluck(s, 'duration'), [1/2, 1/2]);
    assert.deepEqual(_.pluck(s, 'position'), [1, 1.25]);
  },
  "remove rests AFTER the transformation": function() {
    s = r.sequence('a a a a a b', function(event) {
      if(event.value === 'a') event.value = 'r';
    });
    assert.equal(s.length, 1);
  }
}).export(module);
