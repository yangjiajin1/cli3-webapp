<template>
  <div class="home ios-paddingBottom" ref="home">
    
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      weizhi: 0,
    };
  },
  activated() {
    this.$refs.home.scrollTop = this.weizhi;
  },
  deactivated() {
    this.weizhi = this.$refs.home.scrollTop;
  },
  created () {
  },
  methods: {
  }

};
</script>
<style lang="scss">
.home {
}
</style>

