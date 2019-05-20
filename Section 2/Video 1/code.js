$ ember g model Category name:string image:string products:hasMany
$ ember g mirage-model Category
$ ember g mirage-factory Category
$ ember g route application
$ ember g mirage-serializer category
$ ember g controller application


// app/templates/application.hbs
...
<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <ul class="list-group">
        {{#each rootCategories as |category|}}
          <li class="list-group-item">
            {{category.name}}
            <ul class="list-group">
              {{#each category.children as |child|}}
                <li class="list-group-item">{{child.name}}</li>
              {{/each}}
            </ul>
          </li>
        {{/each}}
      </ul>
    </div>
    <div class="col-md-9">
      {{outlet}}
    </div>
  </div>
</div>


// mirage/config.js
...
this.get('/categories');

// mirage/scenarios/default.js
server.createList('category', 3, 'withChildren');

// app/controllers/application.js
import Controller from '@ember/controller';

export default Controller.extend({
  rootCategories: Ember.computed('model', function(){
    return this.get('model').rejectBy('parent.id');
  })
});

// app/models/category.js
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  image: DS.attr('string'),
  products: DS.hasMany('product'),
  children: DS.hasMany('category', { inverse: 'parent' }),
  parent: DS.belongsTo('category', { inverse: 'children' })
});

// app/routes/application.js
import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return this.get('store').findAll('category');
  }
});

// mirage/factories/category.js
import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  name(){
    return faker.commerce.department();
  },
  image(){
    return faker.image.image(250, 250);
  },
  withChildren: trait({
    afterCreate(category, server){
      category.children = server.createList('category', 3);
      category.save();
    }
  })
});


// mirage/models/category.js
import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  children: hasMany('category', { inverse: 'parent' }),
  parent: belongsTo('category', { inverse: 'children' })
});

// mirage/serializers/category.js
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['children']
});




