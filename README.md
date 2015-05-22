# Sequenze

Create musical sequences with javascript. Sequenze parses a string with
optional durations, and returns an array of objects in the
form: `{ value: '', position: 0, duration: 0 }` ordered by `position`.

```javascript
var s = sequence('a/q b/q c/e');
// [{ value: 'a', position: 0, duration: 0.25 }
//  { value: 'b', position: 0.25, duration: 0.25 }
//  { value: 'c', position: 0.5, duration: 0.125 }]
```

Sequenze uses [note-duration](http://github.com/danigb/note-duration) to convert
from duration names ('quarter', 'whole', 'q.') to duration values.

It is agnostic about the content of the event (the value). It only cares about
durations and positions:

```javascript
var s = sequence('Cm/d Dm/w G7/w');
// [{ value: 'Cm', position: 0, duration: 2}]
//  { value: 'Dm', position: 2, duration: 1}]
//  { value: 'G7', position: 3, duration: 1}]
```

## Usage

Add the module to your project `npm i --save sequenze` and require it:

```javascript
var sequence = require('sequenze');
```

## API

### sequence(source [, transform] [, options])

__Parsing__

Returns an array of objects where `value`, `position` and `duration` are
__always__ defined (the first as string, the others as numbers).

The durations are expresed in musical names ('whole', 'eight') and separated
by a `/`. If no duration given, 1/4 is the default.

The source can be a string or an array:

```javascript
s1 = sequence('c d');
// [{ value: 'c', position: 0, value: 0.25 },
//  { value: 'd', position: 0.25, value: 0.25 }]
s2 = sequence(['c', 'd']);
// s2 is equal to s1
```

By default, events with value equal to 'r' are treated as rests:
```javascript
s = sequence('a r/w b');
// [{ value: 'a', position: 0, value: 0.25},
//  { value: 'b', position: 1, value: 0.25}]
```
You can change the rest event value with the options.

__Transformations__

The transform is an optional function that is used to transform the events.  
For example, used in combination with [note-pitch](http://github.com/dani/note-pitch):

```javascript
var pitch = require('note-pitch');

s = sequence('c d e', function(event) {
  event.value = pitch.transpose(event.value, 'M2');
});
// [{ value: 'd', position: 0, duration: 0.25}
//  { value: 'e', position: 0.25, duration: 0.25}
//  { value: 'f#', position: 0.5, duration: 0.25}]
```

You can use it to transform sequences:

```javascript
original = sequence('c d e');
delayed = sequence(original, function(event) {
  event.position += 0.25;
});
```

__Options__

The following options are accepted:
- restValue: the value of the events to be treated as rest. `'r'` by default.
- parseDuration: a function that parses a string and returns a `{ value: '', duration: 0}` object
