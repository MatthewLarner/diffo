# Diffo

Recursively create an object that is the difference between two deeply nested objects.

# Usage

```javascript
var diffo = require('diffo');

var difference = diffo({a:1}, {a:1, b:2}); // result -> {b:2}
```
If a value of a key is different between the two objects the value of the second object wil be taken.