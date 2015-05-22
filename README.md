# Rhythmically

Create musical sequences with javascript. Rhythmically parses a string with
optional durations, and returns an array of objects in the
form: `{ value: '', position: 0, duration: 0 }` ordered by `position`.

```javascript
var r = require('rhythmically');
var s = r.sequence('a/q b/q c/e');
// [{ value: 'a', position: 0, duration: 0.25 }
//  { value: 'b', position: 0.25, duration: 0.25 }
//  { value: 'c', position: 0.5, duration: 0.125 }]
```

Rhythmically uses [note-duration](http://github.com/danigb/note-duration) to convert
from duration names ('quarter', 'whole', 'q.') to duration values.

It is agnostic about the content of the event (the value). It only cares about
durations and positions:

```javascript
var s = r.sequence('Cm/d Dm/w G7/w');
// [{ value: 'Cm', position: 0, duration: 2}]
//  { value: 'Dm', position: 2, duration: 1}]
//  { value: 'G7', position: 3, duration: 1}]
```

## Usage

Add the module to your project `npm i --save rhythmically` and require it:

```javascript
var r = require('rhythmically');
```

## API

### Rhythmically.sequence(source [, transform] [, options])

Returns an array of objects where `value`, `position` and `duration` are
__always__ defined (the first as string, the others as numbers).

The durations are expressed in musical names ('whole', 'eight') and separated
by a `/`. If no duration given, 1/4 is the default. This can be customized
with a options.parseDuration function (see options below).

The source can be a string or an array:

```javascript
s1 = r.sequence('c d');
// [{ value: 'c', position: 0, value: 0.25 },
//  { value: 'd', position: 0.25, value: 0.25 }]
s2 = r.sequence(['c', 'd']);
// s2 is equal to s1
```

By default, events with value equal to 'r' are treated as rests:
```javascript
s = r.sequence('a r/w b');
// [{ value: 'a', position: 0, value: 0.25},
//  { value: 'b', position: 1, value: 0.25}]
```
You can change the rest event value with the options.

#### Transformations

The transform is an optional function that is used to modify the events.  
For example, used in combination with [note-pitch](http://github.com/danigb/note-pitch):

```javascript
var pitch = require('note-pitch');

s = r.sequence('c d e', function(event) {
  event.value = pitch.transpose(event.value, 'M2');
});
// [{ value: 'd', position: 0, duration: 0.25}
//  { value: 'e', position: 0.25, duration: 0.25}
//  { value: 'f#', position: 0.5, duration: 0.25}]
```

You can use it to transform previously parsed sequences:

```javascript
var original = r.sequence('c d e');
var delayed = r.sequence(original, function(event) {
  event.position += 0.25;
});
var combined = r.merge(original, delayed);
```

#### Options

The following options are accepted:
- restValue: the value of the events to be treated as rest. `'r'` by default.
- parseDuration: a function that parses a string and returns [value, duration] array

```javascript
function parseDuration(value) {
  var match = /^([a-z]+)\{(\d+)\}$/.exec(value);
  return [match[1], +match[2]];
}
r.sequence("a{10} rest{5} b{15}", null, { restValue: 'rest', parseDuration: parseDuration });
// [{ value: 'a', position: 0,    duration: 10 },
//  { value: 'b', position: 15,   duration: 15 }]
```

### Rhythmically.duration(seq)

Return the total duration of a sequence array

### Rhythmically.merge(seq1, seq2 [, seq3, ...])

Merges the given sequences:

```javascript
r.merge(r.sequence('a b'), r.sequence('c d'));
// [{ value: 'a', position: 0,    duration: 0.25 },
//  { value: 'c', position: 0,    duration: 0.25 },
//  { value: 'b', position: 0.25, duration: 0.25 },
//  { value: 'd', position: 0.25, duration: 0.25 }]
```

### Rhythmically.concat(seq1, seq2 [, seq3, seq4, ...])

Concatenates the given sequences:

```javascript
r.concat(r.sequence('a b'), r.sequence('c d'));
// [{ value: 'a', position: 0,    duration: 0.25 },
//  { value: 'b', position: 0.25,    duration: 0.25 },
//  { value: 'c', position: 0.50, duration: 0.25 },
//  { value: 'd', position: 0.75, duration: 0.25 }]
```

## License

MIT License
