<template>
  <div class="slideStack">
    <div
      class="stack-box"
      @touchstart="(e) => {touchStart(e)}"
      @touchmove="(e) => {touchMove(e)}"
      @touchend="(e) => {touchEnd(e)}"
    >
      <div class="stack-items">
        <div
          class="stack-item"
          v-for="(item,index) in imgLists"
          :key="index"
          :style="getStyle(index)"
        >
          <img :src="item" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TouchMar from "@/assets/js/touchMar.js";
export default {
  name: "slideStack",
  // props: {
  //   imgList: Array
  // },
  data() {
    return {
      touchMar: new TouchMar(),
      imgLists: [
        "https://pic.tujia.com/upload/landlordunit/day_170408/thumb/201704082336594689_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170408/thumb/201704082337454710_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170408/thumb/201704082338212691_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170408/thumb/201704082338493735_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170408/thumb/201704082339248680_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170329/thumb/201703290019496484_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170329/thumb/201703290019376798_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170329/thumb/201703290019473097_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170329/thumb/201703290019416911_700_467.jpg",
        "https://pic.tujia.com/upload/landlordunit/day_170329/thumb/201703290019412213_700_467.jpg"
      ],
      state: {
        activeIndex: 0, // 当前索引
        deltaX: 0,
        wrapHeight: "auto"
      },
      opacityStep: 0.4, // 透明度步长
      transformStep: 10, // 变换步长
      movedStep: -window.screen.availWidth,
      referWidth: window.screen.availWidth,
      // 手指触碰时的（x, y）x坐标
      startX: 0,
      startY: 0,
      duration: 0
    };
  },
  methods: {
    //获取每个样式
    getStyle(index) {
      let style = {};
      let movedRatio = this.state.deltaX / this.referWidth;

      let changeStep = index - this.state.activeIndex + movedRatio;
      // 透明度
      let opacity = 1 - this.opacityStep * changeStep;
      // 小位移
      let trans = -this.transformStep * changeStep;
      // 缩放
      let scale = 1 - (this.transformStep * changeStep) / 100;
      // 左滑位移
      let movedTrans =
        this.movedStep * (this.state.activeIndex - index) + this.state.deltaX;
      if (this.state.activeIndex >= index + movedRatio) {
        style = {
          transform: `translate3d(${movedTrans}px, 0, 0)`,
          WebkitTransform: `translate3d(${movedTrans}px, 0, 0)`,
          transitionDuration: `${this.duration}s`,
          zIndex: this.imgLists.length - index
        };
      } else {
        style = {
          opacity: `${opacity < 0 ? 0 : opacity}`,
          transform: `translate3d(${-trans}%, 0 , ${
            trans < 0 ? trans : 0
          }px) scale(${scale > 0 ? scale : 0})`,
          WebkitTransform: `translate3d(${-trans}%, 0 , ${
            trans < 0 ? trans : 0
          }px) scale(${scale > 0 ? scale : 0})`,
          transitionDuration: `${this.duration}s`,
          transitionTimingFunction: "linear",
          WebkitTransitionTimingFunction: "linear",
          zIndex: this.imgLists.length - index
        };
      }
      return style;
    },
    // 触碰屏幕瞬间
    touchStart(e) {
      this.touchMar.start(e);
      this.duration = 0;
    },
    // 滑动中
    touchMove(e) {
      // e.preventDefault();
      let { activeIndex } = this.state;
      let total = this.imgLists.length;
      this.touchMar.move(
        e,
        { step: this.movedStep, total, activeIndex },
        deltaX => {
          this.state.deltaX = deltaX;
        }
      );
    },
    // 离开屏幕
    touchEnd() {
      let total = this.imgLists.length;
      this.touchMar.end({ total }, index => {
        (this.state.activeIndex = index), (this.state.deltaX = 0);
        this.duration = 0.2;
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.slideStack {
  width: 100%;
  margin: 15px 0;
  padding-right: 15px;
  .stack-box {
    height: 380px;
    padding: 0px 30px 0px 15px;
    overflow: hidden;
    .stack-items {
      transform-style: preserve-3d;
      position: relative;
      .stack-item {
        transition-property: all;
        transition-timing-function: ease-in;
        position: absolute;
        img {
          border-radius: 6px;
          width: 100%;
          height: 380px;
        }
      }
    }
  }
}
</style>
