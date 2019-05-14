<template>
  <div class="attendance2">
    <baidu-map 
    class="bm-view" 
    ak="y25djtz1pLXH7bRWBnX9VUfV1HpNWtLU"
    :center="center"
    :zoom="zoom"
    @ready="change">
    <bm-marker :position="nowPosition">
    </bm-marker>
    <bm-circle :center="center" radius="500" :stroke-opacity="0.3" :stroke-weight="0.1" fillColor="#ffeaa1"></bm-circle>
  </baidu-map>

  <button type="default" @click="upweizhi">更新位置</button>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmCircle from 'vue-baidu-map/components/overlays/Circle.vue'
export default {
  name: 'attendance2',
  components: {
    BaiduMap,
    BmMarker,
    BmCircle
  },
  data () {
    //116.655228,39.956155
    return {
      map : {},
      center: {
        lng: '116.655227',
        lat: '39.956155'
      },
      nowPosition: {
        lng: '116.655228',
        lat: '39.956155'
      },
      zoom: 15
    }
  },
  mounted () {
  },
  methods: {
    // eslint-disable-next-line
    change ({BMap, map}) {
      this.nowPosition.lng = 116.655228
      this.nowPosition.lat = 39.950956
    },
    upweizhi () {
      this.nowPosition.lng = 116.655228
      this.nowPosition.lat = this.nowPosition.lat + 0.001
    }
  }
}
</script>
<style lang="scss">
.attendance2 {
  .bm-view {
    height: 300px;
  }
}
</style>

