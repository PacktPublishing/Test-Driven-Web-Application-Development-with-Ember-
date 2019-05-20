$ ember g acceptance-test index
$ ember g route product


// app/models/product.js
import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr('string'),
image: DS.attr('string'),
price: DS.attr('number'),
displayPrice: Ember.computed('price', function(){
  let price = parseFloat(this.get('price')),
  tax = price * 25/100;
  return price + tax;
})

// app/router.js
..
Router.map(function() {
  this.route('product', { path: '/products/:product_id' });
});

// app/templates/index.hbs
{{#link-to 'product' product class="thumbnail"}}
  <img src="{{product.image}}" alt="{{product.name}}">
  <div class="caption">
   <h3>{{product.name}}</h3>
  </div>
{{/link-to}}

// tests/unit/models/product-test.js
...
test('it displays price with tax', function(assert){
  let price = parseFloat(Math.random() * 1000),
  model = this.subject({ price: price }),
  tax = price * 25/100;

  assert.equal(model.get('displayPrice'), price + tax);
});

// mirage/config.
export default function() {

  this.namespace = '/api';
  ...
  this.get('/products/:id');
}

// app/routes/product.js
import Route from '@ember/routing/route';

export default Route.extend({
  model(params){
    return this.get('store').find('product', params.product_id);
  }
});

// app/templates/product.hbs
<div class="container">
  <h2>{{model.name}}</h2>
</div>

// tests/acceptance/index.js
import { test } from 'qunit';
import moduleForAcceptance from 'supercart/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting /index', function(assert) {
  server.createList('product', 10);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.thumbnail').length, 10);
  });
});

test('clicking the thumbnail', function(assert){

  server.create('product', { name: "My awesome product" });
  
  visit('/');

  andThen(function(){
    click('a.thumbnail:first');
    andThen(function(){
      assert.equal(find('h2').text(), "My awesome product");
    })
  })

});
