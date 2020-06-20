<template>
  <div class="svgAnimation">
    <van-nav-bar title="svg动画" left-text="返回" left-arrow @click-left="back" />
    <div class="content">
      <lottie :options="defaultOptions" :height="300" v-on:animCreated="handleAnimation" />
      <div>
        <p>速度: x{{animationSpeed}}</p>
        <input
          type="range"
          value="1"
          min="0"
          max="3"
          step="0.5"
          v-on:change="onSpeedChange"
          v-model="animationSpeed"
        />
      </div>
      <button v-on:click="stop">停止</button>
      <button v-on:click="pause">暂停</button>
      <button v-on:click="play">开始</button>
    </div>
  </div>
</template>

<script>
import Lottie from "./lottie.vue";
// import * as animationData from "@/assets/svg/pinjump.json";
import * as animationData from "../../assets/svg/24748-bike.json";
export default {
  name: "svgAnimation",
  components: {
    'lottie': Lottie
  },
  data() {
    return {
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      anim: null
    };
  },
  mounted() {},
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    stop: function() {
      this.anim.stop();
    },

    play: function() {
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    }
  }
};
</script>
<style lang="scss">
.svgAnimation {
  // height: 300px;
}
</style>

