/*
 * This script is provided to give an example how the playlist can be controlled using the event emitter.
 * This enables projects to create/control the useability of the project.
*/
var ee = playlist.getEventEmitter();
var $container = $("body");
var $timeFormat = $container.find('.time-format');
var $audioStart = $container.find('.audio-start');
var $audioEnd = $container.find('.audio-end');
var $time = $container.find('.audio-pos');

var format = "hh:mm:ss.uuu";
var startTime = 0;
var endTime = 0;
var audioPos = 0;
var downloadUrl = undefined;
var isLooping = false;
var playoutPromises;

var activeMode = "cursor"; // possible select, shift
var messages = {
  'help': 'hi, welcome! you can now edit some audio! yeah! upload or record new files over the buttons on the topbar. on the sidebar you can find some sweet tools. enjoy!',
  'cursor': 'use this tool to set the cursor to a certain position.',
  'shift': 'use this tool to drag a track to another position. push the select button in the top bar to go back to your normal tool.',
  'select': 'use this tool to select a section of a track and trim it. push the select button in the top bar to go back to your normal tool.'
};

function toggleActive(node) {
  var active = node.parentNode.querySelectorAll('.active');
  var i = 0, len = active.length;

  for (; i < len; i++) {
    active[i].classList.remove('active');
  }

  node.classList.toggle('active');
}

$('#startmodal').modal({
  show: true
});

$container.on("change", ".automatic-scroll", function(e){
  ee.emit("automaticscroll", $(e.target).is(':checked'));
});

function drawSidebar(){
  var rightSidebarjs = new SidebarJS.SidebarElement({
    component: document.querySelector('[sidebarjs="rightsidebar"]'),
    position: 'right'
  });
}

function hideSidebar(){
  var element = document.getElementById("sidebarContainer");
  element.classList.remove("sidebarjs--is-visible");
}

function cueFormatters(format) {

  function clockFormat(seconds, decimals) {
    var hours,
        minutes,
        secs,
        result;

    hours = parseInt(seconds / 3600, 10) % 24;
    minutes = parseInt(seconds / 60, 10) % 60;
    secs = seconds % 60;
    secs = secs.toFixed(decimals);

    result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secs < 10 ? "0" + secs : secs);

    return result;
  }

  var formats = {
    "seconds": function (seconds) {
        return seconds.toFixed(0);
    },
    "thousandths": function (seconds) {
        return seconds.toFixed(3);
    },
    "hh:mm:ss": function (seconds) {
        return clockFormat(seconds, 0);
    },
    "hh:mm:ss.u": function (seconds) {
        return clockFormat(seconds, 1);
    },
    "hh:mm:ss.uu": function (seconds) {
        return clockFormat(seconds, 2);
    },
    "hh:mm:ss.uuu": function (seconds) {
        return clockFormat(seconds, 3);
    }
  };

  return formats[format];
}

function updateSelect(start, end) {
  if (start < end) {
    $('.btn-trim-audio').removeClass('disabled');
    $('.btn-trim-audio').css('display', 'inline-block');
    $('.btn-loop').removeClass('disabled');
  }
  else {
    $('.btn-trim-audio').addClass('disabled');
    $('.btn-trim-audio').hide();
    $('.btn-loop').addClass('disabled');
  }

  $audioStart.val(cueFormatters(format)(start));
  $audioEnd.val(cueFormatters(format)(end));

  startTime = start;
  endTime = end;
}

function updateTime(time) {
  $time.html(cueFormatters(format)(time));

  audioPos = time;
}

updateSelect(startTime, endTime);
updateTime(audioPos);





$container.on("click", ".btn-annotations-download", function() {
  ee.emit("annotationsrequest");
});

$container.on("click", ".btn-loop", function() {
  isLooping = true;
  playoutPromises = playlist.play(startTime, endTime);
});

$container.on("click", ".btn-play", function() {
  ee.emit("play");
});

$container.on("click", ".btn-pause", function() {
  isLooping = false;
  ee.emit("pause");
});

$container.on("click", ".btn-stop", function() {
  isLooping = false;
  ee.emit("stop");
});

$container.on("click", ".btn-rewind", function() {
  isLooping = false;
  ee.emit("rewind");
});

$container.on("click", ".btn-fast-forward", function() {
  isLooping = false;
  ee.emit("fastforward");
});

$container.on("click", ".btn-clear", function() {
  isLooping = false;
  ee.emit("clear");
});

$container.on("click", ".btn-record", function() {
  ee.emit("record");
});

//track interaction states
$container.on("click", ".btn-cursor", function() {
  hideSidebar();
  var activeMode = "cursor"; // possible cursor, select, shift
  $("#message").html(messages['cursor']);
  $(".btn-cursor").hide();
  $('.btn-shift').removeClass('active');
  $(".btn-trim-audio").hide();
  $('.btn-select').removeClass('active');
  ee.emit("statechange", "cursor");
  toggleActive(this);
});

$container.on("click", ".btn-select", function() {
  _LTracker.push('select btn pressed');
  hideSidebar();
  var activeMode = "select"; // possible cursor, select, shift
  $(".btn-cursor").css('display', 'inline-block');
  $('.btn-cursor').removeClass('active');
  $("#message").html(messages['select']);
  ee.emit("statechange", "select");
  toggleActive(this);
});
$container.on("click", ".btn-shift", function() {
  hideSidebar();
  var activeMode = "shift"; // possible cursor, select, shift
  $(".btn-cursor").css('display', 'inline-block');
  $("#message").html(messages['shift']);
  ee.emit("statechange", "shift");
  toggleActive(this);
});

function selectFile(e) {
  var files = e.target.files;
  for (var i = 0, f; f = files[i]; i++) {

    ee.emit("newtrack", f);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('newFile')
    .addEventListener('change', selectFile, false);
});

$container.on("click", ".btn-fadein", function() {
  ee.emit("statechange", "fadein");
  toggleActive(this);
});

$container.on("click", ".btn-fadeout", function() {
  ee.emit("statechange", "fadeout");
  toggleActive(this);
});

//fade types
$container.on("click", ".btn-logarithmic", function() {
  ee.emit("fadetype", "logarithmic");
  toggleActive(this);
});

$container.on("click", ".btn-linear", function() {
  ee.emit("fadetype", "linear");
  toggleActive(this);
});

$container.on("click", ".btn-scurve", function() {
  ee.emit("fadetype", "sCurve");
  toggleActive(this);
});

$container.on("click", ".btn-exponential", function() {
  ee.emit("fadetype", "exponential");
  toggleActive(this);
});

//zoom buttons
$container.on("click", ".btn-zoom-in", function() {
  hideSidebar();
  ee.emit("zoomin");
});

$container.on("click", ".btn-zoom-out", function() {
  hideSidebar();
  ee.emit("zoomout");
});

$container.on("click", ".btn-trim-audio", function() {
  ee.emit("trim");
});

$container.on("click", ".btn-info", function() {
  // console.log(playlist.getInfo());
});

$container.on("click", ".btn-download", function () {
  ee.emit('startaudiorendering', 'wav');
});

$container.on("click", ".btn-seektotime", function () {
  var time = parseInt(document.getElementById("seektime").value, 10);
  ee.emit("select", time, time);
});

$container.on("click", ".btn-fullscreen", function () {
    if (screenfull.enabled) {
      if (screenfull.isFullscreen == false) {
        screenfull.request();
        if (document.getElementById("mainscreen").style.visibility == "visible") {
          screenfull.exit();
        }
        else {
          // document.getElementById("startscreen").remove();
          $('#startmodal').modal('hide');
          $("#message").html(messages['help']);
          drawSidebar();
          if (screen.orientation.type != ("landscape-primary" || "landscape-secondary")) {
            $('#screenorientation_modal').modal('show')
          }
          else{
            $('#screenorientation_modal').modal('hide')
          };
          document.getElementById("mainscreen").style.visibility = "visible";
        }
      }
      else {
        screenfull.exit();
      }
    }
});


window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
  if (screen.orientation.type != ("landscape-primary" || "landscape-secondary")) {
    $('#screenorientation_modal').modal('show')
  }
  else{
    $('#screenorientation_modal').modal('hide')
  }
}, false);

$container.on("change", ".select-seek-style", function (node) {
  playlist.setSeekStyle(node.target.value);
});

//track drop
$container.on("dragenter", ".track-drop", function(e) {
  e.preventDefault();
  e.target.classList.add("drag-enter");
});

$container.on("dragover", ".track-drop", function(e) {
  e.preventDefault();
});

$container.on("dragleave", ".track-drop", function(e) {
  e.preventDefault();
  e.target.classList.remove("drag-enter");
});

$container.on("drop", ".track-drop", function(e) {
  e.preventDefault();
  e.target.classList.remove("drag-enter");
  var dropEvent = e.originalEvent;
  for (var i = 0; i < dropEvent.dataTransfer.files.length; i++) {
    ee.emit("newtrack", dropEvent.dataTransfer.files[i]);
  }
});






// joshua change
// files per click
// $container.on("click", ".track-drop", function(e) {
//   e.preventDefault();
//   console.log("test2");
//   e.target.classList.remove("drag-enter");
//
//   var dropEvent = e.originalEvent;
//
//   for (var i = 0; i < dropEvent.dataTransfer.files.length; i++) {
//     ee.emit("newtrack", dropEvent.dataTransfer.files[i]);
//   }
// });


$container.on("change", ".time-format", function(e) {
  format = $timeFormat.val();
  ee.emit("durationformat", format);

  updateSelect(startTime, endTime);
  updateTime(audioPos);
});

$container.on("input change", ".master-gain", function(e){
  ee.emit("mastervolumechange", e.target.value);
});

$container.on("change", ".continuous-play", function(e){
  ee.emit("continuousplay", $(e.target).is(':checked'));
});

$container.on("change", ".link-endpoints", function(e){
  ee.emit("linkendpoints", $(e.target).is(':checked'));
});




function displaySoundStatus(status) {
  $(".sound-status").html(status);
}

function displayLoadingData(data) {
  var info = $("<div/>").append(data);
  $(".loading-data").append(info);
}

function displayDownloadLink(link) {
  var dateString = (new Date()).toISOString();
  var $link = $("<a/>", {
    'href': link,
    'download': 'track' + dateString + '.wav',
    // 'text': 'Download ',
    'class': 'fa fa-download fa-2x btn btn-primary btn-lg btn-download-link'
  });
  hideSidebar();
  $('#downloadModal').modal('show');

  $('.btn-download-link').remove();
  // $('.btn-download').after($link);
  $('#modal-body-download').after($link);
}


/*
* Code below receives updates from the playlist.
*/




ee.on("select", updateSelect);

ee.on("timeupdate", updateTime);

ee.on("mute", function(track) {
  displaySoundStatus("Mute button pressed for " + track.name);
});

ee.on("solo", function(track) {
  displaySoundStatus("Solo button pressed for " + track.name);
});

ee.on("volumechange", function(volume, track) {
  displaySoundStatus(track.name + " now has volume " + volume + ".");
});

ee.on("mastervolumechange", function(volume) {
  displaySoundStatus("Master volume now has volume " + volume + ".");
});


var audioStates = ["uninitialized", "loading", "decoding", "finished"];

ee.on("audiorequeststatechange", function(state, src) {
  var name = src;

  if (src instanceof File) {
    name = src.name;
  }

  displayLoadingData("Track " + name + " is in state " + audioStates[state]);
});

ee.on("loadprogress", function(percent, src) {
  var name = src;

  if (src instanceof File) {
    name = src.name;
  }

  displayLoadingData("Track " + name + " has loaded " + percent + "%");
});

ee.on("audiosourcesloaded", function() {
  displayLoadingData("Tracks have all finished decoding.");
});

ee.on("audiosourcesrendered", function() {
  displayLoadingData("Tracks have been rendered");
});

ee.on('audiorenderingfinished', function (type, data) {
  if (type == 'wav'){
    if (downloadUrl) {
      window.URL.revokeObjectURL(downloadUrl);
    }

    downloadUrl = window.URL.createObjectURL(data);
    displayDownloadLink(downloadUrl);
  }
});

ee.on('finished', function () {
  console.log("The cursor has reached the end of the selection !");

  if (isLooping) {
    playoutPromises.then(function() {
      playoutPromises = playlist.play(startTime, endTime);
    });
  }
});




/*
    This is a demo of the Tuna delay node. See the source at https://github.com/Theodeus/tuna
*/

// var inited = false;
// var delay;
// function init() {
//   //create an instance of Tuna by passing the AudioContext we use
//   var tuna = new Tuna(audioContext);
//   //create a new Tuna delay instance
//   delay = new tuna.Delay({
//     delayTime: 800 //a short delayTime to create a slap-back delay
//   });
//   //connect the source to the Tuna delay
//   source.connect(delay);
//   //connect delay as a standard web audio node to the audio context destination
//   delay.connect(audioContext.destination);
//   //start playing!
//   source.start(audioContext.currentTime);
//
//   inited = true;
// }

/*
    This is just the boilerplate needed to load an audio file and provide the dry/wet button functionality
*/

// var AC = "AudioContext" in window ? AudioContext : "webkitAudioContext" in window ? webkitAudioContext : document.write("Web Audio not supported");
// var audioContext = new AC();
// var source = audioContext.createBufferSource();
// var format = checkAudioFormat();
// var xhr = new XMLHttpRequest();
//
// xhr.open("GET", "https://oskareriksson.se/shed/assets/gitarrkompet." + format);
// xhr.responseType = "arraybuffer";
// xhr.onload = function(e) {
//   audioContext.decodeAudioData(e.target.response, function(b) {
//     source.buffer = b;
//   })
// }
//
// xhr.send(null);

/*
    Check file format to use
*/

// function checkAudioFormat () {
//   var elem = document.createElement('audio');
//   if (elem.canPlayType) {
//     if (elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
//       return "ogg";
//     }
//     if (elem.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, '')) {
//       return "mp3";
//     }
//   }
//   return false;
// }

/*
    Setup dry/wet buttons
*/

// var dry = document.getElementById("dry");
// var wet = document.getElementById("wet");
//
// dry.addEventListener("click", function(e) {
//   if (!inited) init();
//   delay.bypass = true;
// });
//
// wet.addEventListener("click", function(e) {
//   if (!inited) init();
//   delay.bypass = false;
// });
