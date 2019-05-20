$ touch app/models/custom-inflector-rules.js


// app/adapters/application.js
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: 'api',
    // host: 'http://api.mathjs.org',
    headers: {
      'SUPER_IMPORTANT_API_KEY': 'super important api value'
    }
});


// app/app.js
...
import './models/custom-inflector-rules';
...

// app/models/custom-inflector-rules.js
import Inflector from 'ember-inflector';

Inflector.inflector.irregular('product', 'productes');

export default {};


// mirage/config.js
export default function() {
  ..
  this.get('/productes', (schema) => {
    return schema.productes.all();
  });
  this.get('/productes/:id');
  this.get('/categories', (schema, request) => {
    // debugger;
    return schema.categories.all();
  });
});
