// app/adapters/application.js

import DS from 'ember-data';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend({
    namespace: 'api',
    host: ENV.host,
    pathForType(type){
      return pluralize(underscore(type));
    }
});

// app/serializers/application.js
import { underscore } from '@ember/string';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr){
    return underscore(attr);
  },
  keyForRelationship(attr){
    return underscore(attr);
  }
});


// mirage/config.js
export default function() {
  this.passthrough();
  this.namespace = '/api';
  this.urlPrefix = 'http://localhost:3000';
});
