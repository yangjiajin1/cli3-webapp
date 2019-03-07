<template>
  <div class="slideLine">
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
  name: "slideLine",
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
        movedStep: 140 + 20,
        wrapHeight: "auto"
      },
      itemsGap: 20, // 卡片的间隔
      blurStep: 3, // 模糊度
      opacityStep: 0.5, // 透明度步长
      transformStep: 40, // 变换步长
      scaleStep: 0.1, // 卡片缩放
      preTransStep: 26,
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
      let { activeIndex, deltaX, movedStep } = this.state;
      let movedRatio = deltaX / this.referWidth;

      let changeStep = index - activeIndex - movedRatio;
      // 模糊度
      let blur = this.blurStep * (activeIndex - index - deltaX / movedStep);
      // 小位移
      let trans = -this.transformStep * changeStep;
      // active 卡片 的缩放 4倍比率缩放
      let scalePre =
        1 - this.scaleStep * (activeIndex - index - 1 - movedRatio * 4);
      let scaleActive = 1 - this.scaleStep * (Math.abs(movedRatio * 4) - 1.5);
      let scaleNext =
        deltaX < 0 ? 1 + this.scaleStep * Math.abs(movedRatio * 3) : 1;
      // active 后面卡片滑位移
      // 位移阈值
      let thresholdMoveStep =
        Math.abs(deltaX) / movedStep > 1
          ? (Math.abs(deltaX) / deltaX) * movedStep
          : deltaX;
      let movedTrans = movedStep * (index - activeIndex) + thresholdMoveStep;
      let preTrans = this.preTransStep * (index - activeIndex + movedRatio);
      let opacity = 1 + changeStep * this.opacityStep;
      opacity = opacity < 0 ? 0 : opacity;
      let style = {
        transitionDuration: `${this.duration}s`
      };
      if (activeIndex < index) {
        // 当前卡片后面的元素的样式
        if (activeIndex + 1 === index) {
          style = {
            ...style,
            transform: `translate3d(${movedTrans +
              this.itemsGap / 2}px, 0, 0) scale(${scaleNext})`,
            WebkitTransform: `translate3d(${movedTrans +
              this.itemsGap / 2}px, 0, 0) scale(${scaleNext})`
          };
        } else {
          style = {
            ...style,
            transform: `translate3d(${movedTrans + this.itemsGap / 2}px, 0, 0)`,
            WebkitTransform: `translate3d(${movedTrans +
              this.itemsGap / 2}px, 0, 0)`
          };
        }
      } else if (activeIndex === index) {
        style = {
          ...style,
          transform: `translate3d(${
            deltaX < 0 ? trans : movedTrans
          }px, 0, 0) scale(${scaleActive < 1 ? 1 : scaleActive})`,
          WebkitTransform: `translate3d(${
            deltaX < 0 ? trans : movedTrans
          }px, 0, 0) scale(${scaleActive < 1 ? 1 : scaleActive})`,
          filter: `blur(${deltaX < 0 ? blur : 0}px)`
        };
      } else if (activeIndex > index) {
        // 当前卡片前面的元素的样式
        style = {
          ...style,
          filter: `blur(${blur}px)`,
          opacity
        };
        // 当前
        style = {
          ...style,
          transform: `translate3d(${preTrans}px, 0, -10px) scale(${
            scalePre < 0 ? 0.1 : scalePre
          })`,
          WebkitTransform: `translate3d(${preTrans}px, 0, -10px) scale(${
            scalePre < 0 ? 0.1 : scalePre
          })`
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
.slideLine {
  margin: 15px 0;
  width: 100%;
  .stack-box {
    height: 200px;
    box-sizing: content-box;
    padding: 20px 0 20px 40px;
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
          width: 140px;
          height: 200px;
        }
      }
    }
  }
}
</style>
