
<template>
  <div class="Popupqnb">
    <div v-show="propsShow" class="overlay" @touchmove.stop.prevent @click.self="handleClick" :style="popupOverlay"></div>
    <div
      v-show="propsShow"
      class="qnb-popup-bottom"
      :style="popupBottom"
      @touchstart="(e) => {touchStart(e)}"
      @touchmove="(e) => {touchMove(e)}"
      @touchend="(e) => {touchEnd(e)}"
    >
      <div class="popup-title">
        <div class="closePop" @click="handleClick">
          <van-icon  name="cross" />
        </div>
      </div>
      <div class="popContent"
      ref="refpopup"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "Popupqnb",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      propsShow: this.value,
      decline: false,
      time: null,
      startX: 0,
      startY: 0,
      deltaY: 0,
      transformY: "100%",
      domHeight: 0,
      bgColor: 0
    };
  },
  watch: {
    value(n, v) {
      if (n !== v) {
        this.propsShow = n;
        if (n) {
          setTimeout(() => {
            this.deltaY = 0;
            this.bgColor = 0.5
            this.transformY = "0px";
          }, 100);
        }
      }
    },
    propsShow(n) {
      this.$emit("input", n);
    }
  },
  computed: {
    // 根据滑动距离在原位置的比例 计算透明度
    popupOverlay: function() {
      let opct = this.bgColor
      if (this.deltaY > 0) {
        opct = this.bgColor - 50 * (this.deltaY / this.domHeight) / 100
      } 
      let style = {
          backgroundColor: 'rgba(0, 0, 0, '+opct+')'
      };
      // 不在滑动过程中添加缓速动画
      if (this.deltaY <= 0) {
          style.transition = "all 300ms ease";
      }
      return style;
    },
    // 弹窗位置跟随手指滑动
    popupBottom: function() {
      let style = {
        height: this.height + '%',
        transform: "translateY(" + this.transformY + ")",
        WebkitTransform: "translateY(" + this.transformY + ")"
      };
      if (this.deltaY <= 0) {
        style.transition = "all 300ms ease";
      }
      return style;
    }
  },
  created() {},
  mounted() {
    this.domHeight = document.documentElement.clientHeight * (this.height/100);
  },
  methods: {
    // 关闭弹窗 在动画结束后改变v-show
    handleClick() {
      this.deltaY = 0;
      this.bgColor = 0
      this.transformY = "100%";
      setTimeout(() => {
        this.propsShow = false;

        // 触发关闭事件
        this.$emit("close");
      }, 300);
    },
    // 滑动开始
    touchStart(e) {
      // 判断内容是否在顶部并记录
      if (this.$refs.refpopup.scrollTop > 0) {
        this.decline = false;
      } else {
        this.decline = true;
        let point = this.getPoint(e);
        this.deltaX = 0;
        this.startX = point.pageX;
        this.startY = point.pageY;
        this.time = +new Date(); //记录开始触摸的时间戳
      }
    },
    // 滑动中
    touchMove(e) {
      if (this.decline) { // 在顶部时滑动
        let point = this.getPoint(e);
        let deltaX = point.pageX - this.startX;
        let deltaY = point.pageY - this.startY;
        // 当斜率的绝对值小于1时认是左右滑动；
        let k = deltaY / deltaX;
        // 上下滑动 并且为向下滑动时 获取滑动距离
        if (!(Math.abs(k) < 1) && deltaY > 0) {
            this.deltaY = deltaY;
            this.transformY = this.deltaY + "px";
            e && e.preventDefault();
        }
      }
      // e && e.stopPropagation()
    },
    touchEnd() {
      if (this.decline && this.deltaY > 0) { // 是向下滑动
        let duration = +new Date() - this.time; //滑动的持续时间
        if (Number(duration) < 300 && Math.abs(this.deltaY) > 30) { // 快速滑动;
          this.handleClick();
        } else if (
          Number(duration) > 300 &&
          Math.abs(this.deltaY) > this.domHeight / 2
        ) {
          // 慢速滑动 没超过一半时恢复位置
          this.handleClick();
        } else {
          this.deltaY = 0;
          this.bgColor = 0.5
          this.transformY = "0px";
        }
      }
    },
    getPoint(e) {
      // 默认以第一个手指的位置计算
      return e.touches ? e.touches[0] : e;
    }
  }
};
</script>
<style scoped lang="scss">
.Popupqnb {
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2018;
    overflow: hidden;
    // background-color: rgba(0, 0, 0, 0.7);
  }
  .qnb-popup-bottom {
    position: fixed;
    padding-top: 30px;
    width: 100%;
    max-height: 100%;
    bottom: 0;
    left: 0;
    z-index: 2019;
    border-radius: 8px 8px 0 0;
    // overflow-y: auto;
    overflow: hidden;
    background-color: #fff;
    // -webkit-overflow-scrolling: touch;
  }
  .popContent {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .popup-title {
    height: 30px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    .closePop {
      width: 30px;
      font-size: 16px;
      float: right;
      line-height: 30px;
      margin-right: 15px;
    }
  }
}
</style>
