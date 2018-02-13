!function(){function t(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function i(t,i){return t.x*i.x+t.y*i.y}function e(e,s){var h=t(e)*t(s);if(0===h)return 0;var n=i(e,s)/h;return n>1&&(n=1),Math.acos(n)}function s(t,i){return t.x*i.y-i.x*t.y}function h(t,i){var h=e(t,i);return s(t,i)>0&&(h*=-1),180*h/Math.PI}function n(t,i){var e=new o(t);return e.add(i),e}var o=function(t){this.handlers=[],this.el=t};o.prototype.add=function(t){this.handlers.push(t)},o.prototype.del=function(t){t||(this.handlers=[]);for(var i=this.handlers.length;i>=0;i--)this.handlers[i]===t&&this.handlers.splice(i,1)},o.prototype.dispatch=function(){for(var t=0,i=this.handlers.length;i>t;t++){var e=this.handlers[t];"function"==typeof e&&e.apply(this.el,arguments)}};var a=function(t,i){this.element="string"==typeof t?document.querySelector(t):t,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;var e=function(){};this.rotate=n(this.element,i.rotate||e),this.touchStart=n(this.element,i.touchStart||e),this.multipointStart=n(this.element,i.multipointStart||e),this.multipointEnd=n(this.element,i.multipointEnd||e),this.pinch=n(this.element,i.pinch||e),this.swipe=n(this.element,i.swipe||e),this.tap=n(this.element,i.tap||e),this.doubleTap=n(this.element,i.doubleTap||e),this.longTap=n(this.element,i.longTap||e),this.singleTap=n(this.element,i.singleTap||e),this.pressMove=n(this.element,i.pressMove||e),this.touchMove=n(this.element,i.touchMove||e),this.touchEnd=n(this.element,i.touchEnd||e),this.touchCancel=n(this.element,i.touchCancel||e),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null}};a.prototype={start:function(i){if(i.touches){this.now=Date.now(),this.x1=i.touches[0].pageX,this.y1=i.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(i),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var e=this.preV,s=i.touches.length;if(s>1){this._cancelLongTap(),this._cancelSingleTap();var h={x:i.touches[1].pageX-this.x1,y:i.touches[1].pageY-this.y1};e.x=h.x,e.y=h.y,this.pinchStartLen=t(e),this.multipointStart.dispatch(i)}this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(i)}.bind(this),750)}},move:function(i){if(i.touches){var e=this.preV,s=i.touches.length,n=i.touches[0].pageX,o=i.touches[0].pageY;if(this.isDoubleTap=!1,s>1){var a={x:i.touches[1].pageX-n,y:i.touches[1].pageY-o};null!==e.x&&(this.pinchStartLen>0&&(i.zoom=t(a)/this.pinchStartLen,this.pinch.dispatch(i)),i.angle=h(a,e),this.rotate.dispatch(i)),e.x=a.x,e.y=a.y}else null!==this.x2?(i.deltaX=n-this.x2,i.deltaY=o-this.y2):(i.deltaX=0,i.deltaY=0),this.pressMove.dispatch(i);this.touchMove.dispatch(i),this._cancelLongTap(),this.x2=n,this.y2=o,s>1&&i.preventDefault()}},end:function(t){if(t.changedTouches){this._cancelLongTap();var i=this;t.touches.length<2&&this.multipointEnd.dispatch(t),this.x2&&Math.abs(this.x1-this.x2)>30||this.y2&&Math.abs(this.y1-this.y2)>30?(t.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout(function(){i.swipe.dispatch(t)},0)):(this.tapTimeout=setTimeout(function(){i.tap.dispatch(t),i.isDoubleTap&&(i.doubleTap.dispatch(t),clearTimeout(i.singleTapTimeout),i.isDoubleTap=!1)},0),i.isDoubleTap||(i.singleTapTimeout=setTimeout(function(){i.singleTap.dispatch(t)},250))),this.touchEnd.dispatch(t),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null}},cancel:function(t){clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout),this.touchCancel.dispatch(t)},_cancelLongTap:function(){clearTimeout(this.longTapTimeout)},_cancelSingleTap:function(){clearTimeout(this.singleTapTimeout)},_swipeDirection:function(t,i,e,s){return Math.abs(t-i)>=Math.abs(e-s)?t-i>0?"Left":"Right":e-s>0?"Up":"Down"},on:function(t,i){this[t]&&this[t].add(i)},off:function(t,i){this[t]&&this[t].del(i)},destroy:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=null,null}},"undefined"!=typeof module&&"object"==typeof exports?module.exports=a:window.AlloyFinger=a}();