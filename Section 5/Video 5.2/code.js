$ ember g serializer application

// app/models/product.js
...
export default Imageable.extend({
  ...
  image: DS.belongsTo()
});

// mirage/serializers/application.js
import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  alwaysIncludeLinkageData: true
});
