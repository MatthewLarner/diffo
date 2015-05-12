# cleanMerge

Merges simple objects recursivly in a predictable manner.

## API:

```javascript
var merge = require('clean-merge');

// Merge:
merge(value, value);

// Clone:
merge(value);

```

clean-merge will always take the source value when it is defined, eg:

```javascript
var target = {a:1, b:2, c:3};
var source = {b:10, c:null};

var result = merge(target, source);
```

merge will use the targets ```a``` value, as it is not defined in source.
merge will use all values from the source, even null and undefined.


## Notes

clean-merge is intentionally simple, and is intended to be used with objects that do not have cyclic references.