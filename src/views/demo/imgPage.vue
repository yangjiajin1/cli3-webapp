<template>
  <div class="imgPage">
    <van-nav-bar title="图片压缩" left-text="返回" left-arrow @click-left="back"/>
    <div class="content needsclick">
        <div>
            点击拍照
            <van-uploader :after-read="afterRead"/>
            压缩大小KB
            <input  type="number" v-model="value">
            
        </div>
        <div>
          宽px
            <input type="number" v-model="Vwidth">
          高px
            <input type="number" v-model="Vheight">
        </div>
        <p>输入一个尺寸，另一个自动按比例。不输入按原尺寸</p>
        <div class="imgShow">
            <img :src="imgSrc" alt="">
        </div>
    </div>
  </div>
</template>

<script>
// import fixImgFile from '@/assets/lib/iosPhotoRepair'
import imageConversion from '@/assets/lib/conversion'
export default {
  name: "imgPage",
  data() {
    return {
        value: 100,
        Vwidth: '',
        Vheight: '',
        imgSrc: ''
    };
  },
  mounted() {
  },
  methods: {
      afterRead (file) {
        
        // fixImgFile(file.file).then( base64 => {
        //   let blobimg = imageConversion.dataURLToBlob(base64)
          imageConversion.compressAccurately(file.file, 
          {size: this.value,
            width: this.Vwidth > 0 ? Number(this.Vwidth) : null,
            height: this.Vheight > 0 ?Number(this.Vheight) : null
          }
          ).then(data => {
              imageConversion.filetoDataURL(data).then( base64 => {
                this.imgSrc = base64
              })
          })
        // })
          
      }
  }
};
</script>
<style lang="scss">
.imgPage {
  // height: 300px;

  .imgShow {
      img {
          width: 200px;
      }
  }
}
</style>

