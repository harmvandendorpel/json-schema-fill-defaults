To install:

```
npm install json-schema-fill-defaults --save
```

After calling:
```
import autoDefaults from 'json-schema-fill-defaults';

const dataWithDefaults = autoDefaults(data, schema);
```

the object `data` will be complemented with default values specified in `schema`. 
Whatever already has a value will remain untouched. `autoDefaults` returns the complemented structure.


http://harmvandendorpel.com
