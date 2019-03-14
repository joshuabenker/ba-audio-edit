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

  // function touchStarted() {
  //   wavesurfer.on('ready', function () {
  //     wavesurfer.play();
  //   });
  //   if (wavesurfer.getAudioContext().state !== 'running') {
  //     wavesurfer.getAudioContext().resume();
  //   }
  //
  // }
  //
  function playButtonClicked(){
    console.log("test");
    wavesurfer.on('ready', function () {
      wavesurfer.play();
    });
  }

 wavesurfer.load('./files/audiosamples/carbonara.mp3');

  function init() {
    editorModel = new audioEditor.editorModel();
    editorModel.test();
    editorView = new audioEditor.editorView();
    editorView.test();
    recordingView = new audioEditor.recordingView();
    editorView.test();
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
