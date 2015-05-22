'use strict';

var duration = require('note-duration');

var Sequence = function(source, transform, options) {
  options = options || {};
  var opts = {};
  opts.parseDuration = options.parseDuration || parse;
  opts.restValue = options.restValue || 'r';

  if(typeof(source) === 'string') {
    source = source.trim().split(' ');
  } else if (!Array.isArray(source)) {
    throw Error('Sequenze source must be an string or an array.')
  }

  var seq = source.map(function(e) {
    return { value: e.value || e,
      position: e.position || 0, duration: e.duration || 0 };
  });

  var parsed, position = 0;
  seq.forEach(function(e) {
    parsed = opts.parseDuration(e.value);
    if(parsed) {
      e.value = parsed.value;
      e.duration = parsed.duration;
    }
    e.position = position;
    position += e.duration;
  });

  if(transform) {
    seq.forEach(transform);
  }
  return Sequence.sort(removeRests(seq, opts.restValue));
}

Sequence.sort = function(seq) {
  return seq.sort(function(a, b) {
    return a.position - b.position;
  });
}


function parse(value) {
  var split = value.split('/');
  var dur = duration(split[1]);

  return dur ?
    { value: split[0], duration: dur } :
    { value: value, duration: 0.25 }
}

function removeRests(array, restValue) {
  var result = [];
  for(var i = 0, total = array.length; i < total; i++) {
    if(array[i].value != restValue) result.push(array[i]);
  }
  return result;
}
module.exports = Sequence;
