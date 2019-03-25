import { pixelsToSeconds } from '../../utils/conversions';

export default class {
  constructor(track) {
    this.track = track;
    this.active = false;
  }

  setup(samplesPerPixel, sampleRate) {
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
  }

  emitShift(x) {
    const deltaX = x - this.prevX;
    const deltaTime = pixelsToSeconds(deltaX, this.samplesPerPixel, this.sampleRate);
    this.prevX = x;
    this.track.ee.emit('shift', deltaTime, this.track);
  }


  touchstart(e) {
    e.preventDefault();
    this.active = true;
    this.prevX = e.changedTouches[0].pageX;
  }


  touchmove(e) {
    e.preventDefault();
    this.active = true;
    var newTouch = e.changedTouches[0];
    this.emitShift(newTouch.pageX);
  }


  touchend(e) {
    e.preventDefault();
    this.active = true;
  }


  touchcancel(e) {
    if (this.active) {
      e.preventDefault();
      this.complete(e.changedTouches[0].pageX);
    }
  }





  complete(x) {
    this.emitShift(x);
    this.active = false;
  }

  mousedown(e) {
    e.preventDefault();

    this.active = true;
    this.el = e.target;
    this.prevX = e.offsetX;
  }

  mousemove(e) {
    if (this.active) {
      e.preventDefault();
      this.emitShift(e.offsetX);
    }
  }

  mouseup(e) {
    if (this.active) {
      e.preventDefault();
      this.complete(e.offsetX);
    }
  }

  mouseleave(e) {
    if (this.active) {
      e.preventDefault();
      this.complete(e.offsetX);
    }
  }

  static getClass() {
    return '.state-shift';
  }

  static getEvents() {
    return ['mousedown', 'mousemove', 'mouseup', 'mouseleave','touchstart','touchmove','touchend','touchcancel'];
  }
}
