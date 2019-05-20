$ ember g component product-comparator


// app/controllers/index.js
...
export default Controller.extend({
  ...
  compareList: [],
  actions: {
    addToCompare(product){
      this.get('compareList').pushObject(product);
    }
  }
});


// app/components/product-comparator.js
import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
  didRender(){
    this._super(...arguments);
    Ember.$('html, body').animate({ scrollTop: 0 }, 'slow');
  }
});


// app/templates/index.hbs
...
{{#if compareList.length}}
  {{product-comparator products=compareList}}
{{/if}}
<div class="row">
    {{#each selectedProducts as |product|}}
      <div class="col-sm-4 col-md-3">
        ...
        <button class="btn btn-default" {{action 'addToCompare' product}}>Add to compare</button>
        <br/>
        <br/>
      ...
    {{/each}}
</div>
{{outlet}}


// app/templates/components/product-comparator.hbs
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        {{#each products as |product|}}
          <td>{{product.name}}</td>
        {{/each}}
      </tr>
    </thead>
    <tbody>
      <tr>
        {{#each products as |product|}}
          <td>
            <ul class="list-unstyled">
              {{#each product.traits as |trait|}}
                <li>{{trait}}</li>
              {{/each}}
            </ul>
          </td>
        {{/each}}
      </tr>
    </tbody>
  </table>
</div>
{{yield}}