<template>
  <div class="slide">
    <van-nav-bar title="滑动展示" left-text="返回" left-arrow @click-left="back"/>
    <div class="content">
        <slide-stack></slide-stack>
        <slide-line></slide-line>
    </div>
  </div>
</template>

<script>
import slideStack from "@/components/slide/slideStack";
import slideLine from "@/components/slide/slideLine";
export default {
  name: "slide",
  components: {
    slideStack,
    slideLine
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>
<style lang="scss">
.slide {
  // height: 300px;
}
</style>

