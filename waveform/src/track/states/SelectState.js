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

  emitSelection(x) {
    const minX = Math.min(x, this.startX);
    const maxX = Math.max(x, this.startX);
    const startTime = pixelsToSeconds(minX, this.samplesPerPixel, this.sampleRate);
    const endTime = pixelsToSeconds(maxX, this.samplesPerPixel, this.sampleRate);

    this.track.ee.emit('select', startTime, endTime, this.track);
  }

  complete(x) {
    this.emitSelection(x);
    this.active = false;
  }

  //bei den Touchevents wird nicht der relative Wert wie bei Klick übergeben, sondern der absolute, deshalb muss die Breite des Insprektors von 200 abgezogen werden.
  touchstart(e) {
    // console.log('e.changedTouches', e.changedTouches[0].pageX)
    // console.log(e)
    e.preventDefault();
    this.active = true;
    this.startX = e.changedTouches[0].pageX-200;
    const startTime = pixelsToSeconds(this.startX, this.samplesPerPixel, this.sampleRate);
    this.track.ee.emit('select', startTime, startTime, this.track);
  }


  touchmove(e) {
    //console.log('touchmove', e)
    if (this.active) {
      e.preventDefault();
      this.emitSelection(e.changedTouches[0].pageX-200);
    }
  }

  touchend(e) {
    //console.log('touchend', e)
    if (this.active) {
      e.preventDefault();
      this.complete(e.changedTouches[0].pageX-200);
    }

  }


  touchcancel(e) {
    //console.log('touchcancel', e)
    if (this.active) {
      e.preventDefault();
      this.complete(e.changedTouches[0].pageX-200);
    }
  }


  mousedown(e) {
    // console.log('e.offsetX', e.offsetX)
    // console.log('mousedown', e)
    e.preventDefault();
    this.active = true;

    this.startX = e.offsetX;
    const startTime = pixelsToSeconds(this.startX, this.samplesPerPixel, this.sampleRate);

    this.track.ee.emit('select', startTime, startTime, this.track);
  }

  mousemove(e) {
    //console.log('mousemove', e)
    if (this.active) {
      e.preventDefault();
      this.emitSelection(e.offsetX);
    }
  }

  mouseup(e) {
    //console.log('mouseup', e)
    if (this.active) {
      e.preventDefault();
      this.complete(e.offsetX);
    }
  }

  mouseleave(e) {
    //console.log('mouseleave', e)
    if (this.active) {
      e.preventDefault();
      this.complete(e.offsetX);
    }
  }

  static getClass() {
    return '.state-select';
  }

  static getEvents() {
    return ['mousedown', 'mousemove', 'mouseup', 'mouseleave','touchstart','touchmove','touchend','touchcancel'];
    //return ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
  }
}
