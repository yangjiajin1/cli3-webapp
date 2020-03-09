<template>
  <div class="imgList">
    <van-nav-bar title="图片上传" left-text="返回" left-arrow @click-left="back"/>
    <div class="content">
        
        <div @click="look">多图上传 并发队列</div>
        <img-uploader action="/upl/zuul/resource/uploadProductInfo" :fileList="fileList"></img-uploader>
    </div>
  </div>
</template>

<script>
import imgUploader from '@/components/img-uploader'
export default {
  name: "imgList",
  data() {
    return {
      fileList: []
    };
  },
  components: {
      imgUploader
  },
  mounted() {
  },
  methods: {
    look () {
      console.log(this.fileList)
    }
  }
};
</script>
<style lang="scss">
.imgList {
  // height: 300px;
}
</style>

