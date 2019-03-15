audioEditor.editorController = function() {

  "use strict";
  var that = {},
    playButtonClicked;

  function onplaypauseClicked(){
    playButtonClicked();
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
