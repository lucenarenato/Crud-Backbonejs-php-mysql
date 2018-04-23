"use strict";

APP.crudNewView = Backbone.View.extend({
  // functions to fire on events
  // here we are blocking the submission of the form, and handling it ourself
  events: {
    "click button.save": "save",
    "keyup input": "validate",
    "keyup textarea": "validate"
  },
  
  template: _.template($('#formTemplate').html()),

  initialize: function (options) {
    this.model.bind('invalid', APP.helpers.showErrors, APP.helpers);
  },

  save: function (event) {
    event.stopPropagation();
    event.preventDefault();

    // update our model with values from the form
    this.model.set({
      id: this.$el.find('input[name=id]').val(),
      name: this.$el.find('input[name=name]').val(),
      email: this.$el.find('input[name=email]').val(),
      phone: this.$el.find('input[name=phone]').val(),
      address: this.$el.find('textarea[name=address]').val()
    });
    
    if (this.model.isValid()) {
      // save it
      this.collection.add(this.model);
      this.model.save();
      var id = this.$el.find('input[name=id]').val();
      var nm = this.$el.find('input[name=name]').val();
      var em = this.$el.find('input[name=email]').val();
      var hp = this.$el.find('input[name=phone]').val();
      var ad = this.$el.find('textarea[name=address]').val();
      $.post("crud.php?p=add", { id: id, name: nm, email: em, phone: hp, address: ad } , function(data){
        Backbone.history.navigate("crud/index", {trigger: true});
      });
      // add it to the collection
      // redirect back to the index
    }
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(
    	this.template(this.model.toJSON())
    );
    return this;
  }
});