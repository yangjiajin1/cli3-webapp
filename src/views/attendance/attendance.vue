<template>
  <div class="attendance">
    <baidu-map 
    class="bm-view" 
    ak="y25djtz1pLXH7bRWBnX9VUfV1HpNWtLU"
    :center="center"
    :zoom="zoom"
    @ready="change">
    <bm-marker :position="nowPosition">
    </bm-marker>
    <!-- @infohtmlset="aaaa" @markersset="aaaa" -->
    <bm-local-search :keyword="value" :nearby="nearby" :auto-viewport="true" :panel="true" 
    ></bm-local-search>
  </baidu-map>
  <search placeholder="请输入搜索关键词" v-model="value1" />
  <button type="default" @click="sousuo">搜索1000米范围</button>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
export default {
  name: 'attendance',
  components: {
    BaiduMap,
    BmMarker,
    BmLocalSearch
  },
  data () {
    //116.655228,39.956155
    return {
      value1: '餐馆',
      value: '',
      map : {},
      center: {
        lng: '116.655228',
        lat: '39.956155'
      },
      nowPosition: {
        lng: '116.655228',
        lat: '39.956155'
      },
      // 检索范围
      nearby: {
        center: {
          lng: 116.655228, 
          lat: 39.956155
        },
        radius: 1000
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
    sousuo () {
      this.value = this.value1
    }
  }
}
</script>
<style lang="scss">
.attendance {
  .bm-view {
    height: 300px;
    .anchorBL {
      display: none;
    }
  }
}
</style>

