$ ember install ember-cli-mirage
$ ember g model Product name:string image:string
$ ember g mirage-model Product
$ ember g mirage-factory Product
$ ember g adapter application
$ ember g route index

// app/adapters/application.js
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: 'api'
});

// app/routes/index.js
import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        return this.get('store').findAll('product');
    }
});

// mirage/config.js
export default function() {
  this.namespace = '/api';

  this.get('/products', (schema) => {
    return schema.products.all();
  })
}

// mirage/scenarios/default.js
export default function(server) {
    
    server.createList('product', 10);

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
}

// mirage/factories/product.js
import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    name(){
        return faker.commerce.product();
    },
    image(){
        return faker.image.image();
    }
});




// app/templates/index.hbs
<div class="container">
    <h2>Products</h2>
    <div class="row">
        {{#each model as |product|}}
          <div class="col-sm-6 col-md-3">
            <div class="thumbnail">
              <img src="http://via.placeholder.com/250x250" alt="Category">
              <div class="caption">
                <h3>{{product.name}}</h3>
              </div>
            </div>
          </div>
        {{/each}}
    </div>
</div>

