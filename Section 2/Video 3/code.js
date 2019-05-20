$ ember generate transform array
$ ember generate transform price

// app/models/product.js
...
export default Imageable.extend({
  ...
  price: DS.attr('price'),
  traits: DS.attr('array'),
  ...
});

// app/templates/product.hbs
<h2>{{model.name}}</h2>
<div class="row">
  <div class="col-md-6">
    <img src="{{model.image.url}}" alt="{{model.name}}"/>
  </div>
  <div class="col-md-6">
    <h3>${{model.price}}</h3>
    <ul>
      {{#each model.traits as |trait|}}
        <li>{{trait}}</li>
      {{/each}}
    </ul>
  </div>
</div>

// app/transforms/price
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return parseFloat(serialized).toFixed(2);
  },

  serialize(deserialized) {
    return parseFloat(deserialized);
  }
});


// app/transforms/array.js
import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if(Ember.isArray(serialized)){
      return Ember.A(serialized);
    } else{
      return Ember.A();
    }
  },

  serialize(deserialized) {
    if(Ember.isArray(deserialized)){
      return Ember.A(deserialized);
    } else{
      return Ember.A();
    }
  }
});


// mirage/factories/product.js
...
export default Factory.extend({
  ...
  traits(){
    return [faker.commerce.productAdjective(), faker.commerce.productAdjective(), faker.commerce.productAdjective(), faker.commerce.productAdjective(), faker.commerce.productAdjective()];
  },
  price(){
    return faker.commerce.price();
  },
  ...
});


