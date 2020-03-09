//适配iPad
!function () {
    var docEl = document.documentElement,  //返回文档对象的根元素
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    //   u = navigator.userAgent,
      recalc = function () {
        var clientWidth = document.documentElement.clientWidth;
        if (!clientWidth) return;
        // if (!u.match(/AppleWebKit.*Mobile.*/)) {
        //     clientWidth = 375
        //     docEl.style.width = '375px'
        //     docEl.style.margin = '0 auto'
        // }
        docEl.style.fontSize =  clientWidth/7.5 + 'px';
        
      };
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
  }();