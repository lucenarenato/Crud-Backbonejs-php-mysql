"use strict";

window.APP = window.APP || {};
APP.crudRouter = Backbone.Router.extend({
  routes: {
    "crud/new": "create",
    "crud/index": "index",
    "crud/:id/edit": "edit",
    "crud/:id/delete": "delete"
  },

  $container: $('#primary-content'),

  initialize: function () {
    this.collection = new APP.crudCollection();
    this.collection.fetch({ajaxSync: false});
    APP.helpers.debug(this.collection);
    this.index();
    // start backbone watching url changes
    Backbone.history.start();
  },

  create: function () {
    var view = new APP.crudNewView({
      collection: this.collection, 
      model: new APP.crudModel()
    });
    this.$container.html(view.render().el);
    $('.myid').val(_.random(0, 10000));
  },

  delete: function (id) {
    var crud = this.collection.get(id);
    crud.destroy();
    $.get("crud.php?p=trash", { id: id }, function(data){
      Backbone.history.navigate("crud/index", {trigger: true});
    });
  },

  edit: function (id) {
    var view = new APP.crudEditView({model: this.collection.get(id)});
    this.$container.html(view.render().el);
  },

  index: function () {
    var view = new APP.crudIndexView({collection: this.collection});
    this.$container.html(view.render().el);
  }
});