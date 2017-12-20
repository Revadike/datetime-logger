Usage:
```
const logger = require("datetime-logger");
console.log = logger({ filename: "log.txt" });
// ...
console.log("Hello world!"); // [1970-01-01 00:00:00.000] Hello world!
```