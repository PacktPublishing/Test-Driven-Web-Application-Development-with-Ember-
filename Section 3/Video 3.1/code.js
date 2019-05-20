$ ember g service shopping-cart
$ ember g controller product


// app/controllers/application.js
import Ember from 'ember';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  shoppingCart: service(),
  ...
});

// app/controllers/product.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  cart: service('shopping-cart'),
  actions: {
    addToCart(){
      this.get('cart').add(this.get('model'));
    }
  }
});

// app/services/shopping-cart.js
import Service from '@ember/service';

export default Service.extend({
  items: [],
  add(item){
    this.get('items').pushObject(item);
  }
});


// app/templates/application.hbs
<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
  <ul class="nav navbar-nav navbar-right">
    <li>
      <a href="#">Shopping Cart <span class="badge">{{shoppingCart.items.length}}</span></a>
    </li>
  </ul>
</div>

// app/templates/product.hbs
<button class="btn btn-default" {{action 'addToCart'}}>Add to cart</button>



