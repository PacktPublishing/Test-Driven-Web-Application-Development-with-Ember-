$ ember g model cart
$ ember g model cart-item cart:belongsTo product:belongsTo quantity:number


// app/services/shopping-cart.js
import Ember from 'ember';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  init(){
    this._super(...arguments);
    this.get('store').createRecord('cart').save().then((cart) =>{
      this.set('cart', cart);
    });
  },
  add(item){
    let cartItem = this.get('cart.items').findBy('product.id', item.get('id'));
    if(cartItem){
      cartItem.incrementProperty('quantity');
    } else {
      cartItem = this.get('store').createRecord('cart-item', { cart: this.get('cart'), product: item, quantity: 1 });
    }
    cartItem.save();
  },
  remove(item){
    item.destroyRecord();
  }
});


// mirage/config.js

export default function() {
  this.post('/carts');
  this.post('/cart-items');
  this.patch('/cart-items/:id');
  this.del('/cart-items/:id');
};

// app/templates/cart.hbs
{{#each shoppingCart.cart.items as |item|}}
  <tr>
    <td>{{item.product.name}}</td>
    <td>{{item.product.price}}</td>
    <td>{{item.quantity}}</td>
    <td><button class="btn btn-danger" {{action 'removeFromCart' item}}>Remove</button></td>
  </tr>
{{/each}}

// app/templates/application.hbs
  <ul class="nav navbar-nav navbar-right">
    <li>
      {{#link-to 'cart'}}
        Shopping Cart <span class="badge">{{shoppingCart.cart.items.length}}</span>
      {{/link-to}}
