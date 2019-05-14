<template>
  <div>
    <van-nav-bar title="页面1" left-text="返回" left-arrow fixed @click-left="back"/>
    <div class="map-area" id="ditu"></div>
  </div>
</template>

<script>
/* eslint-disable */
import myBMap from "./bmap.js";
import { close, closeSync } from 'fs';
export default {
  name: "yemian1",
  data() {
    return {
      myMap: null,
      geolocation: null,
      point : {
        lng: '',
        lat: ''
      }
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      myBMap("y25djtz1pLXH7bRWBnX9VUfV1HpNWtLU")
        .then(() => {
          // 百度地图API功能
          this.myMap = new BMap.Map("ditu"); // 创建Map实例
          this.geolocation = new BMap.Geolocation(); // 创建h5定位
          this.getPoint()
          this.myMap.centerAndZoom(new BMap.Point(this.point.lng, this.point.lat), 15); // 初始化地图,设置中心点坐标和地图级别
          this.myMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPoint() {
      let _this = this
      _this.geolocation.getCurrentPosition(function(r) {
        console.log(JSON.stringify(r));
        // if (_this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          _this.point = r.point
          _this.myMap.addOverlay(mk);
          _this.myMap.panTo(r.point);
          // alert("您的位置：" + r.point.lng + "," + r.point.lat);
        // } else {
        //   alert("failed" + _this.getStatus());
        // }
      },{enableHighAccuracy: true});
    }
  }
};
</script>
<style lang="scss">
.map-area {
  height: 300px;
}
</style>

