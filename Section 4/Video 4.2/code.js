$ ember g component category-item

// app/controllers/application.hbs
import Ember from 'ember';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ['categoryId'],
  categoryId: undefined,
  ...
  categoryFiltered: Ember.computed('categoryId', function(){
    return this.get('categoryId') != undefined;
  }),
  actions: {
    showAllProducts(){
      this.set('categoryId', undefined);
    }
  }
});


// app/templates/application.hbs
<div class="col-md-3">
  {{#if categoryFiltered}}
    <button class="btn btn-link" {{action 'showAllProducts'}}>Show All Products</button>
  {{/if}}
  <ul class="list-group">
    {{#each rootCategories as |category|}}
      {{#category-item category=category activeCategoryId=categoryId}}
        <ul class="list-group">
          {{#each category.children as |child|}}
            {{category-item category=child activeCategoryId=categoryId}}
          {{/each}}
        </ul>
      {{/category-item}}
    {{/each}}
  </ul>
</div>