$ ember g model Image url:string
$ ember g model Imageable
$ ember g mirage-factory Image
$ ember g mirage-serializer Product

// app/models/image.js
import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  imageable: DS.hasMany({ polymorphic: true })
});

// app/models/imageable.js
import DS from 'ember-data';

export default DS.Model.extend({
  image: DS.belongsTo({ inverse: 'imageable' })

});

// app/models/product.js
...
import Imageable from './imageable';

export default Imageable.extend({
  ...
});

// app/models/category.js
...
import Imageable from './imageable';

export default Imageable.extend({
  ...
});


// app/templates/index.hbs

{{#each model as |product|}}
  <div class="col-sm-4 col-md-3">
    {{#link-to 'product' product class="thumbnail"}}
      <img src="{{product.image.url}}" alt="{{product.name}}">
      ...
    {{/link-to}}
  </div>
{{/each}}


// mirage/config.js
export default function() {
  ...
  this.get('/images/:id');
}

// mirage/factories/category.js
import { Factory, faker, trait, association } from 'ember-cli-mirage';

export default Factory.extend({
  ...
  image: association(),
  afterCreate(category){
    category.createImage({ url: faker.image.image(250, 250) });
    category.save();
  }
});

// mirage/factories/product.js
import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  ...
  image: association(),
  afterCreate(product){
    product.createImage({ url: faker.image.image(250, 250) });
    product.save();
  }
});

// mirage/factories/image.js
import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  url(){
    return faker.image.image(250, 250);
  }
});


// mirage/serializers/category.js
import ApplicationSerializer from './application';
export default ApplicationSerializer.extend({
  include: ['children', 'image']
});

// mirage/serializers/product.js
import ApplicationSerializer from './application';
export default ApplicationSerializer.extend({
  include: ['image']
});

