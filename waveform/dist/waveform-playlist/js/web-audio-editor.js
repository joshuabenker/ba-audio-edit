var userMediaStream;
var playlist;
var constraints = { audio: true };

navigator.getUserMedia = (navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia);

function gotStream(stream) {
  userMediaStream = stream;
  playlist.initRecorder(userMediaStream);
  $(".btn-record").removeClass("disabled");
}

function logError(err) {
  console.error(err);
}

if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotStream)
    .catch(logError);
} else if (navigator.getUserMedia && 'MediaRecorder' in window) {
  navigator.getUserMedia(
    constraints,
    gotStream,
    logError
  );
}

playlist = WaveformPlaylist.init({
  samplesPerPixel: 5000,
  zoomLevels: [1000, 5000, 9000],
  waveHeight: 100,
  container: document.getElementById("playlist"),
  state: 'cursor',
  timescale: true,
  colors: {
    waveOutlineColor: '#E0EFF1',
    timeColor: 'grey',
    fadeColor: 'black'
  },
  controls: {
    show: true, //whether or not to include the track controls
    width: 200 //width of controls in pixels
  }
});

playlist.load([
  {
    "src": "./media/audio/audio1.mp3",
    "name": "Vocals",
    "fadeIn": {
      "duration": 0.5
    },
    "fadeOut": {
      "duration": 0.5
    },
    "customClass": "vocals",
    "waveOutlineColor": '#c0dce0'
  },
  {
    "src": "./media/audio/audio2.mp3",
    "name": "Vocals",
    "fadeIn": {
      "duration": 0.5
    },
    "fadeOut": {
      "duration": 0.5
    },
    "customClass": "vocals",
    "waveOutlineColor": '#c0dce0'
  }
]).then(function() {
  //can do stuff with the playlist.

  //initialize the WAV exporter.
  playlist.initExporter();
});


//old

// var playlist = WaveformPlaylist.init({
//   samplesPerPixel: 3000,
//   waveHeight: 100,
//   container: document.getElementById("playlist"),
//   state: 'cursor',
//   colors: {
//     waveOutlineColor: '#E0EFF1',
//     timeColor: 'grey',
//     fadeColor: 'black'
//   },
//   timescale: true,
//   controls: {
//     show: true, //whether or not to include the track controls
//     width: 200 //width of controls in pixels
//   },
//   seekStyle : 'line',
//   zoomLevels: [500,1000, 3000, 5000,10000,20000]
// });
//
// playlist.load([
//   {
//     "src": "./media/audio/carbonara.mp3",
//     "name": "Vocals",
//     "fadeIn": {
//       "duration": 0.5
//     },
//     "fadeOut": {
//       "duration": 0.5
//     },
//     "customClass": "vocals",
//     "waveOutlineColor": '#c0dce0'
//   }
// ]).then(function() {
//   //can do stuff with the playlist.
//
//   //initialize the WAV exporter.
//   playlist.initExporter();
// });
