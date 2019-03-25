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


  //ToDo
   touchstart(e) {
   console.log('touchstart', e)
   e.preventDefault();
   this.active = true;
   this.prevX = e.changedTouches[0].pageX;
   }


   touchmove(e) {
   console.log('touchmove', e)
   e.preventDefault();
   this.active = true;
   var newTouch = e.changedTouches[0];
   this.emitShift(newTouch.pageX);
   }


   touchend(e) {
   console.log('touchend', e)
   e.preventDefault();
   this.active = true;
   }


   touchcancel(e) {
   if (this.active) {
   console.log("touchcancel");
   e.preventDefault();
   this.complete(e.offsetX);
   }
   }




  mousedown(e) {
    e.preventDefault();
    this.active = true;

    this.startX = e.offsetX;
    const startTime = pixelsToSeconds(this.startX, this.samplesPerPixel, this.sampleRate);

    this.track.ee.emit('select', startTime, startTime, this.track);
  }

  mousemove(e) {
    if (this.active) {
      e.preventDefault();
      this.emitSelection(e.offsetX);
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
    return '.state-select';
  }

  static getEvents() {
    //ToDo return ['mousedown', 'mousemove', 'mouseup', 'mouseleave','touchstart','touchmove','touchend','touchcancel'];
    return ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
  }
}
