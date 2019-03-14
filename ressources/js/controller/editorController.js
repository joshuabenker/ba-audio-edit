audioEditor.editorController = function() {

  "use strict";
  var that = {},
    playButtonClicked;

  function onplaypauseClicked(){
    console.log("klick");
    playButtonClicked();
    console.log("klick2");
  }

  function setOnPlayPauseButtonListener(listener) {
    playButtonClicked = listener;
  }

  function init(){
    document.getElementById("playpausebutton").addEventListener("click", onplaypauseClicked);
  }

  that.setOnPlayPauseButtonListener = setOnPlayPauseButtonListener;
  that.init=init;
  return that;

};
