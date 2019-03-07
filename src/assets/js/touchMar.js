
class TouchMar {
  constructor() {
      this.startX = 0;
      this.startY = 0;
      this.activeIndex = 0;
      this.deltaX = 0;
  }
  // 开始触碰屏幕
  start(e, callback) {
      let point = this.getPoint(e);
      this.deltaX = 0;
      this.startX = point.pageX;
      this.startY = point.pageY;
      typeof callback === 'function' && callback();
  }
  // 滑动中
  move(e, params = {}, callback) {
      // 获取卡片的数量当前 active 的卡片
      let {total = 0, step = window.screen.width} = params;
      let point = this.getPoint(e);
      let deltaX = point.pageX - this.startX;
      let deltaY = point.pageY - this.startY;
      // 当斜率的绝对值小于1时认是左右滑动；
      let k = deltaY / deltaX;
      // 最后一张的缓冲效果
      let rate = Math.abs(deltaX / step);
      if (Math.abs(k) < 1) {
          if ((total - 1 === this.activeIndex && deltaX < 0) || (0 === this.activeIndex && deltaX > 0)) {
              rate = rate < 1 ? rate : 1
              deltaX = deltaX * (1 - rate) / 2;
          }
          this.deltaX = deltaX;
          typeof callback === 'function' && callback( deltaX );
          e && e.preventDefault();
      }
  }
  // 触碰结束
  end(params = {}, callback) {
      let { total = 0 } = params;
      let index = this.activeIndex;
      let deltaX = this.deltaX;

      if (Math.abs(deltaX) > 50) {
          if (deltaX > 0 ) { // 右滑时索引加 1
              // 是否是第一张
              index = index > 0 ? index - 1 : index
          }else { // 左滑时索引减1
              // 是否是最后一张
              index = index < total - 1 ? index + 1 : index;
          }
      }
      this.activeIndex = index;
      typeof callback === 'function' && callback( index );
  }

  getPoint(e) {// 默认以第一个手指的位置计算
      return e.touches ? e.touches[0] : e;
  }
}

export default TouchMar;