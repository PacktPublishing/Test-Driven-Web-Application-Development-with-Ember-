$ ember g route cart
$ ember g controller cart


// app/controllers/cart.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  shoppingCart: service(),
  actions: {
    removeFromCart(item){
      this.get('shoppingCart').remove(item);
    }
  }
});



// app/services/shopping-cart.js
import Service from '@ember/service';

export default Service.extend({
  items: {},
  token: null,
  itemsCount: Ember.computed('token', function(){
    return Object.keys(this.get('items')).length;
  }),
  init(){
    this._super(...arguments);
    if(localStorage.getItem('cartItems')){
      this.set('items', JSON.parse(localStorage.getItem('cartItems')));
    }
  },
  add(item){
    let items = this.get('items'),
    itemId = item.get('id');

    if(items[itemId]){
      items[itemId].quantity += 1;
    } else {
      items[itemId] = { quantity: 1, item: item };
    }
    this.set('token', Math.random());
    this.set('items', items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  },
  remove(item){
    let items = this.get('items'),
    itemId = item.get('id');
    delete items[itemId];

    this.set('items', {});
    this.set('token', Math.random());
    this.set('items', items);
  }
});

// app/templates/cart.hbs
<h3>Your Shopping Cart</h3>
<table class="table table-striped">
  <tbody>
    {{#each-in shoppingCart.items as |id item|}}
      <tr>
        <td>{{item.item.name}}</td>
        <td>{{item.item.price}}</td>
        <td>{{item.quantity}}</td>
        <td><button class="btn btn-danger" {{action 'removeFromCart' item.item}}>Remove</button></td>
      </tr>
    {{/each-in}}
  </tbody>
</table>
{{outlet}}
