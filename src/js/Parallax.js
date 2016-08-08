import $ from 'jquery';

const defaults = {
    delta: 100,
    shift: 0,
    startbg: 0
};
var
  $win      = $(window),
  winHeight = $win.height();

export default class Parallax{

  // Parallax constructor
     // @param {string} selector - selector for parralax
     // @param {object} options
     // {number} options.delta - track 
     // {number} options.shift - initial offset

  constructor (selector, options){
    this._init(selector, options);
  }
  

  _init (selector, options = {}) {
    this.el = (selector instanceof $) ? selector : $(selector);
    this.pastProgress = 0;
    this.durationValueCache = winHeight + this.el.height();
    var htmlOptions = this.htmlData();

    this.props = $.extend({}, defaults, htmlOptions, options);

    if (this.props.shift)
      this.el.css({top: `${this.props.shift}px`})


    $(window).on("resize", this._updateDuration.bind(this)); 
    $(window).triggerHandler("resize"); 
  }

  htmlData() {
    var obj = {},
        data = this.el.data(Object.keys(this.el.data())[0]);

    if ($.isNumeric(data))
      obj.delta = data;
    else if (typeof data === 'object')
      obj = data;

    return obj
  }
  
  movePages (progress, direction, el) {
    let val = this.props.delta * progress;
    val = this.props.delta - this._threshold(val, direction);

    TweenMax.to(this.el, 0, {y: val, ease: Linear.easeNone});
  }


  moveWave (progress, direction) {
    let val = this.props.delta * progress;
    val = this._threshold(val, direction);
    //  this.el.css({
    //   'background-position-x': `${val}px`,
    //   '-webkit-transition': 'opacity 2000ms cubic-bezsier(0.18, 0.89, 0.18, 0.88)',
    //  transition: 'opacity 2000ms cubic-bezier(0.18, 0.89, 0.18, 0.88)',
    // });
    TweenMax.to(this.el, 1, {css:{'background-position-x': val}, ease: Linear.easeNone});
  }


  moveLand (progress, direction) {
    let val = this.props.delta * progress;

    if (this.props.delta > 0)
        val = this._threshold(val, direction);

    if (this.props.delta < 0)
        val =  Math.abs(this.props.delta) - this._threshold(Math.abs(val), direction);    

    TweenMax.to(this.el, .1, {css:{'background-position-y': this.props.startbg + val}, ease: Linear.easeNone});
  }

  _threshold(progress, direction) {
      const threshold = .1;
      if(direction == "REVERSE"){
        progress = progress + threshold < this.pastProgress ? progress:this.pastProgress;
   
      }else if (direction == "FORWARD"){
        progress = progress > this.pastProgress + threshold ? progress:this.pastProgress;
      } 
      this.pastProgress = progress;
      return progress;
  }

  _getDuration () {
    return this.durationValueCache;
  }

  _updateDuration () {
    this.durationValueCache = $win.height() + this.el.height();
  }

  setScene(scene){
      scene.duration(this._getDuration.bind(this));
  }
}