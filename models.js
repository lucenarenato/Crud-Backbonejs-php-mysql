"use strict";
APP.crudModel = Backbone.Model.extend({
  // you can set any defaults you would like here
  defaults: {
    name: "",
    address: "",
    email: "",
    phone: "",
    // just setting random number for id would set as primary key from server
    id: ""
  },

  validate: function (attrs) {
    var errors = {};
    if (!attrs.name) errors.name = "Bèk tuwö nan droëkeuh";
    if (!attrs.address) errors.address = "Teumpat tinggai droëkeuh peu katuwö";
    if (!attrs.email) errors.email = "Surèl droëkeuh kapasoe beh";
    if (!attrs.phone) errors.phone = "Numboi hp kah bèk tuwö";
    if (!_.isEmpty(errors)) return errors;
  }
});

APP.crudCollection = Backbone.Collection.extend({
  model: APP.crudModel,
  url: 'crud.php'
});