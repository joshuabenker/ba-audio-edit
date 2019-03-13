// import WaveSurfer from '../wavesurfer/wavesurfer.js';
// import TimelinePlugin from '../wavesurfer/plugin/timeline.js';
// import MinimapPlugin from '../wavesurfer/plugin/minimap.js';
//

// var wavesurfer = WaveSurfer.create({
//   container: document.querySelector('#wave'),
//   backend: 'MediaElement'
// });
// // var wavesurfer2 = WaveSurfer.create({
// //   container: '#waveform2'
// // });
//
// wavesurfer.load('./files/audiosamples/carbonara.mp3');
//
// // wavesurfer2.load('./files/audiosamples/carbonara.mp3');
//
// wavesurfer.on('ready', function () {
//   wavesurfer.play();
// });
var audioEditor = function () {
  "use strict";

  var that = {},
    editorModel,
    editorView,
    editorController,
    recordingView;

// const params = {
//   container: '#waveform',
//   waveColor: 'violet',
//   progressColor: 'purple'
// };

var wavesurfer = WaveSurfer.create({
  // Use the id or class-name of the element you created, as a selector
  container: '#waveform',
  // The color can be either a simple CSS color or a Canvas gradient
  waveColor: 'grey',

  progressColor: 'hsla(200, 100%, 30%, 0.5)',
  cursorColor: '#fff',
  // This parameter makes the waveform look like SoundCloud's player
  barWidth: 3

});

 wavesurfer.load('./files/audiosamples/carbonara.mp3');

  function init() {
    console.log("hey");
    editorModel = new audioEditor.editorModel();
    editorModel.test();
    console.log("hey1");
    editorView = new audioEditor.editorView();
    editorView.test();
    console.log("hey2");
    recordingView = new audioEditor.recordingView();
    editorView.test();
    console.log("hey3");
    editorController = new audioEditor.editorController();
    editorController.test();
    console.log("hey4");
  }

  function start() {
    init();
  }

  that.start = start;
  return that;
}();
