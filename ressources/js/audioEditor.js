

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
//
// var wavesurfer = WaveSurfer.create({
//   // Use the id or class-name of the element you created, as a selector
//   container: '#waveform',
//   // The color can be either a simple CSS color or a Canvas gradient
//   waveColor: 'grey',
//
//   progressColor: 'hsla(200, 100%, 30%, 0.5)',
//   cursorColor: '#fff',
//   // This parameter makes the waveform look like SoundCloud's player
//   barWidth: 3
//
// });

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
    // console.log("test");
    // wavesurfer.on('ready', function () {
    //   wavesurfer.play();
    // });
  }

 // wavesurfer.load('./files/audiosamples/carbonara.mp3');

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

    var playlist = WaveformPlaylist.init({
      samplesPerPixel: 3000,
      mono: true,
      waveHeight: 70,
      container: document.getElementById('playlist'),
      state: 'cursor',
      colors: {
        waveOutlineColor: '#E0EFF1',
        timeColor: 'grey',
        fadeColor: 'black'
      },
      controls: {
        show: true,
        width: 200
      },
      zoomLevels: [500, 1000, 3000, 5000]
    });

    playlist.load([
      {
        src: 'media/audio/Vocals30.mp3',
        name: 'Vocals',
        gain: 0.5,
      },
      {
        src: 'media/audio/BassDrums30.mp3',
        name: 'Drums',
        start: 8.5,
        fadeIn: {
          duration: 0.5,
        },
        fadeOut: {
          shape: 'logarithmic',
          duration: 0.5,
        },
      },
      {
        src: 'media/audio/Guitar30.mp3',
        name: 'Guitar',
        start: 23.5,
        fadeOut: {
          shape: 'linear',
          duration: 0.5,
        },
        cuein: 15,
      }
    ]).then(function() {
      // can do stuff with the playlist.
    });

  }

  function start() {
    init();
  }

  that.start = start;
  return that;
}();
