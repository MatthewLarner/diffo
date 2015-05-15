# Diffo

Recursively create an object that is the difference between two objects.

# Usage

```javascript
var diffy = require('diffy);

var difference = diffy({a:1}, {a:1, b:2}); // result -> {b:2}
```
If a value of a key is different between the two objects the value of the second object wil be taken.