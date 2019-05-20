$ ember g component value-incrementor
$ ember g component value-decrementor

$ ember g model order name:string
$ ember g model OrderItem order:belongsTo product:belongsTo name:string amount:number quantity:number
$ ember g route orders

// app/components/value-incrementor.js
import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-link'],
  keyPress(){
    this.incrementProperty('value');
  },
  click(){
    this.incrementProperty('value');
  }
});

// app/components/value-incrementor.js
import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-link'],
  keyPress(){
    this.decrementProperty('value');
  },
  click(){
    this.decrementProperty('value');
  }
});

// app/controllers/cart.js
..
export default Controller.extend({
  ...
  actions: {
    ...
    checkOut(){
      if(this.get('shoppingCart').checkOut(this.get('customerName'))){
        this.transitionToRoute('orders');
      }
    }
  }
});
// app/services/shopping-cart.js
export default Service.extend({
  ...
  checkOut(name){
    return this.get('store').createRecord('order', { name: name }).save().then((order) => {
      this.get('cart.items').forEach(item => {
        this.get('store').createRecord('order-item', { order: order, product: item.get('product'), name: item.get('product.name'), amount: item.get('product.price'), quantity: item.get('quantity') }).save();
      });
      return this.get('cart.items').invoke('destroyRecord');
    });
  },
  ...
});

// mirage/config.js
...
this.get('/orders');
this.post('/orders');
this.post('/order-items');

// app/templates/cart.hbs
<td>
  {{value-decrementor value=item.quantity}}
  <span class="btn btn-link">{{item.quantity}}</span>
  {{value-incrementor value=item.quantity}}
</td>
...
{{#if shoppingCart.cart.items}}
  {{input type="text" value=customerName}}
  <button class="btn btn-success" {{action 'checkOut'}}>Checkout</button>
{{/if}}


// app/templates/components/value-incrementor.hbs
<span class="glyphicon-plus glyphicon"></span>
{{yield}}

// app/templates/components/value-decrementor.hbs
<span class="glyphicon-minus glyphicon"></span>
{{yield}}
