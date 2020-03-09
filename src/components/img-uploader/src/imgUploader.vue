<template>
  <div class="cp-imgUploader">
    <!-- <ul class="imgListBox"> -->
    <transition-group name="img-list" tag="ul" class="imgListBox clearfix">
      <li v-for="(item,index) in fileList" :key="item.id">
        <div @click="preview(index)">
          <img :src="item.dataUrl" alt />
          <div class="cp-stateBox" v-if="statusAll[item.status]">
            <!-- item.progress -->
            <div v-if="item.status == 1" class="progressBox">
              <div :style="{'width': item.progress > 100? '100%':item.progress+'%'}"></div>
            </div>
            <span v-else>{{statusAll[item.status]}}</span>
          </div>
          <div class="leReUpload" v-if="item.status == 3" @click="handleReUpload(item)">重新上传</div>
          <i class="deleteButton" @click="handleDelete(index)"></i>
        </div>
      </li>
      <li @click="openSelect" class="cp-li_addInput" :key="'moren999999999'">
        <div class="addButton">
          <div>
            <b class="jiahao"></b>
            <p>上传照片</p>
          </div>
        </div>
        <input
          class="cp-upload__input"
          ref="input"
          type="file"
          multiple
          @change="handleInputChange"
          accept="image/*"
        />
      </li>
    </transition-group>
    <!-- </ul> -->
  </div>
</template>

<script>
import imageConversion from "@/assets/lib/conversion";
import { ImagePreview } from 'vant';
export default {
  name: "imgUploader",
  props: {
    // 请求地址
    action: {
      type: String,
      required: true
    },
    // 列表图片
    fileList: Array,
    // 并发上传控制
    maxUploadSize: {
      type: Number,
      default: 5
    },
    // 张数限制
    multiple: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      imgNumber: 0,
      // maxUploadSize: 2,
      // fileList: [],
      uploadQueue: [],
      uploadGen: null, // Generator 函数
      statusAll: {
        0: "等待上传",
        1: "上传中",
        2: "已完成",
        3: "上传错误"
      }
    };
  },
  mounted() {
    
  },
  methods: {
    getUUID() {
      return new Date().getTime() + this.imgNumber++;
    },
    openNative() {
      let parameter = {
        pagePhoto: "5",
        channel: "dfsdf",
        Scaling: "sdf"
      };
      window.iosDelegate.getImage(JSON.stringify(parameter));
    },
    openSelect() {
      this.$refs.input.click();
      // this.openNative()
    },
    // vant 预览
    preview(index) {
      let aaa = []
      this.fileList.forEach((element) => {
        aaa.push(element.dataUrl)
      })
      ImagePreview({
        images: aaa,
        startPosition: index
      });
    },
    handleInputChange(e) {
      // 获取选择文件类数组转数组
      const files = Array.prototype.slice
        .call(e.target.files)
        .map(item => item);
      const promiseArray = files.map(item => {
        let uuid = this.getUUID();
        // 图片压缩
        return imageConversion
          .compressAccurately(item, { size: 500, width: 500 })
          .then(data => {
            // 转base64
            this.uploadQueue.push({ id: uuid, status: 0 });
            return imageConversion.filetoDataURL(data).then(base64 => {
              this.fileList.push({
                id: uuid, // 图片唯一id
                dataUrl: base64, // 图片的base64编码
                file: data, // 图片文件
                imgKey: "", // 图片的key 后端上传保存使用
                imgUrl: "", // 图片真实路径 后端返回的
                name: item.name, // 图片的名字
                progress: 0,
                // orientation: orientation, // 图片旋转
                status: 0 // status表示这张图片的状态 0:等待上传 1：上传中，2上传成功，3：上传失败
              });
            });
          });
      });
      Promise.all(promiseArray).then(() => {
        // 清空input
        this.$refs.input.value = null;
        // 没有 Generator 时 在创建新的
        this.uploadQueue = this.uploadQueue.filter(item => {
          return item.status == 0;
        });
        console.log(this.uploadQueue);
        // 通过该函数获取每次要上传的数组
        this.uploadGen = this.uploadGenerator(this.uploadQueue);
        // 第一次要上传的数量
        const firstUpload = this.uploadGen.next();
        firstUpload.value.map(item => {
          /**
           * 调用上传
           */
          this.uploadImg(item);
        });
      });
    },
    // 删除
    handleDelete(index) {
      this.fileList.splice(index, 1);
    },
    // 重新上传
    handleReUpload(item) {
      item.status = 1;
      this.uploadImg(item, "again");
    },
    // 进度控制
    handleProgress(data, percent) {
      // 监听上传进度 操作DOM 显示进度
      data.progress = percent;
    },
    // 上传完成
    handleUploadEnd(data, rsp, status) {
      // 上传完成
      console.log("完成", data, rsp, status);
      data.status = status;
      if (rsp !== undefined) {
        data.imgUrl = rsp.url;
      }

      this.nextgen();
    },
    // 下一张
    nextgen() {
      const nextUpload = this.uploadGen.next();
      if (!nextUpload.done) {
        nextUpload.value.map(item => {
          this.uploadImg(item);
        });
      } else {
        console.log("结束了");
      }
    },
    // 队列上传文件
    *uploadGenerator(uploadQueue) {
      /**
       * 多张图片并发上传控制规则
       * 上传1-max数量的图片
       * 设置一个最大上传数量
       * 保证最大只有这个数量的上传请求
       *
       */
      // 最多请求数
      this.underway = true;
      const maxUploadSize = this.maxUploadSize;

      if (uploadQueue.length > maxUploadSize) {
        const result = [];

        for (let i = 0; i < uploadQueue.length; i++) {
          // 第一次return maxUploadSize数量的图片
          if (i < maxUploadSize) {
            result.push(uploadQueue[i]);

            if (i === maxUploadSize - 1) {
              yield result;
            }
          } else {
            yield [uploadQueue[i]];
          }
          console.log(uploadQueue.length, i);
        }
      } else {
        yield uploadQueue.map(item => item);
      }
    },
    // 开始上传 查看对应数据 更改状态
    uploadImg(data, upType = "first") {
      // 查找列表中有的图片进行上传,没有则下一个
      let imgState = true;
      if (upType === "again") {
        imgState = false;
        this.ajaxUplader(data);
      } else {
        for (let index = 0; index < this.fileList.length; index++) {
          const element = this.fileList[index];
          if (element.id === data.id && element.status === 0) {
            imgState = false;
            console.log("上传", data);
            this.ajaxUplader(element, data);
            break;
          }
        }
      }

      if (imgState) {
        this.nextgen();
      }
    },
    // ajax上传文件
    ajaxUplader(item, data = null) {
      // 开始发送请求上传
      // const _this = this;

      // const formData = new FormData();
      // // type
      // // formData.append('type', item.type || 'image/jpeg"');
      // formData.append('id', '47490e847a0f49a796dae10e948e75b5');
      // // append 文件
      // formData.append('file', item.file);
      // item.status = 1;
      // if (data !== null) {
      //   data.status = 1
      // }
      // const xhr = new XMLHttpRequest();
      // const action = this.action;

      // // 进度监听
      // xhr.upload.addEventListener('progress', function (e) {
      //   if (e.total > 0) {
      //     e.percent = e.loaded / e.total * 100;
      //     _this.handleProgress(item,e.percent)
      //   }
      // }, false);

      // xhr.onreadystatechange = function () {
      //     if (xhr.readyState === 4) {
      //         if (xhr.status === 200 || xhr.status === 201) {
      //           console.log(xhr.responseText)
      //             // 上传成功
      //             _this.handleUploadEnd(item, { url: "dsfdsf" }, 2);
      //         } else {
      //           console.log(xhr)
      //             // 上传失败
      //             _this.handleUploadEnd(item, undefined, 3);
      //         }
      //     }
      // };

      // xhr.open('POST', action , true);
      // xhr.send(formData);

      // 测试模拟
      item.status = 1;
      if (data !== null) {
        data.status = 1;
      }
      this.handleProgress(item, 5);
      setTimeout(() => {
        this.handleProgress(item, 20);
      }, 1000);
      setTimeout(() => {
        this.handleProgress(item, 50);
      }, 2000);
      setTimeout(() => {
        this.handleProgress(item, 80);
      }, 3500);
      setTimeout(() => {
        this.handleUploadEnd(item, { url: "dsfdsf" }, 2);
      }, 5000);
    }
  }
};
</script>
<style lang="scss">
.cp-imgUploader {
  // height: 300px;
  .imgListBox {
    width: 100%;
    padding: 0 2vw;
    .cp-upload__input {
      display: none;
    }
    .cp-stateBox {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 16px;
      line-height: 16px;
      color: #fff;
      font-size: 10px;
      background: rgba(0, 0, 0, 0.5);
      .progressBox {
        width: 80%;
        height: 3px;
        background-color: #fff;
        border-radius: 3px;
        display: inline-block;
        > div {
          background-color: #049aff;
          height: 100%;
          width: 0;
          transition: 0.5s width;
        }
      }
    }
    li {
      width: 33.33%;
      height: 32vw;
      float: left;
      padding: 8px;
      > div {
        width: 100%;
        height: 100%;
        position: relative;
        .deleteButton {
          position: absolute;
          background-color: #fc5249;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          right: -8px;
          top: -8px;
          &::after {
            content: "";
            position: absolute;
            display: inline-block;
            width: 50%;
            height: 2px;
            background-color: #fff;
            left: 25%;
            top: 50%;
            margin-top: -1px;
          }
        }
        .leReUpload {
          position: absolute;
          width: 100%;
          height: 40px;
          line-height: 40px;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          left: 0;
          top: 50%;
          margin-top: -20px;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .cp-li_addInput {
      .addButton {
        background-color: #f5f5f5;
        color: #999;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
          display: inline-block;
        }
        .jiahao {
          width: 20px;
          height: 20px;
          display: inline-block;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 2px;
            background-color: #999;
            margin-top: -1px;
          }
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 0;
            width: 2px;
            height: 100%;
            background-color: #999;
            margin-left: -1px;
          }
        }
      }
    }
  }
  // 动画
  .img-list-enter-active,
  .img-list-leave-active {
    transition: all 0.3s;
  }
  .img-list-enter,
  .img-list-leave-to {
    opacity: 0;
    transform: scale(0);
  }
  .img-list-enter-to,
  .img-list-leave {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

