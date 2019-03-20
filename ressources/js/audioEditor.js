

var audioEditor = function () {
  "use strict";

  var that = {},
    editorModel,
    editorView,
    editorController;


  function playButtonClicked(){
  }


  function init() {
    editorModel = new audioEditor.editorModel();
    editorModel.test();
    editorView = new audioEditor.editorView();
    editorView.init();
    editorController = new audioEditor.editorController();
    editorController.init();
    editorController.setOnPlayPauseButtonListener(playButtonClicked);



  }

  function start() {
    init();
  }

  that.start = start;
  return that;
}();
