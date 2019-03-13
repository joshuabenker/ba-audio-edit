audioEditor.editorModel = function() {

  "use strict";
  var that = {};

  function init(){
    console.log("hey");
  }

  function test() {
    console.log("editormodel:yes.");
  }

  that.test= test;
  that.init = init;
  return that;

};
