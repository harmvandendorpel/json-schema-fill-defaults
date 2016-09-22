To install:

```
npm install json-schema-fill-defaults --save
```

After calling:
```
import autoDefaults from 'json-schema-fill-defaults';

autoDefaults(data, schema);
```

the object `data` will be complemented with default values specified in `schema`. Whatever already has a value will remain untouched. `autoDefaults` does not return a value but manipulates the object `data` by reference.


http://harmvandendorpel.com
