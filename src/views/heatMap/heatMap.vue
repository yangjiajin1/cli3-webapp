<template>
  <div class="heatMap">
    <van-nav-bar title="热力图" left-text="返回" left-arrow @click-left="back" />
    <div class="content">
      <v-chart :options="option" />
    </div>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/map";
import "echarts/map/js/china.js";
import china from "../../assets/lib/mapJson/china.json";
ECharts.registerMap("china", china);
import dataMap from "./data/dataMap";
export default {
  name: "heatMap",
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      dataMap,
      option: {
        // 热力值
        visualMap: {
          min: 0,
          max: 2500,
          left: "left",
          top: "bottom",
          itemWidth: 10,
          itemHeight: 70,
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true
        },
        series: [
          {
            name: "热力图",
            type: "map",
            mapType: "china",
            top: 10,
            scaleLimit: {
              max: 3
            },
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    // let arr = [[123.4751272201538,25.751159252737235],[123.47542762756348,25.85123655950761],[123.57461223602295,25.751004639045572],[123.57486972808838,25.851081945916557]]
    // console.log(this.encodePolygon(arr,[12394,34209]));
  },
  methods: {
    convertData(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let geoCoord = this.dataMap.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push(geoCoord.concat(data[i].value));
        }
      }
      return res;
    },

    // json加密
    encodePolygon(coordinate, encodeOffsets) {
      var result = "";

      var prevX = this.quantize(coordinate[0][0]);
      var prevY = this.quantize(coordinate[0][1]);
      // Store the origin offset
      encodeOffsets[0] = prevX;
      encodeOffsets[1] = prevY;
      console.log(encodeOffsets);

      for (var i = 0; i < coordinate.length; i++) {
        var point = coordinate[i];
        result += this.encode(point[0], prevX);
        result += this.encode(point[1], prevY);

        prevX = this.quantize(point[0]);
        prevY = this.quantize(point[1]);
      }
      return result;
    },
    encode(val, prev) {
      // Quantization
      val = this.quantize(val);
      // var tmp = val;
      // Delta
      val = val - prev;

      if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
        //WTF, 8232 will get syntax error in js code
        val--;
      }
      // ZigZag
      val = (val << 1) ^ (val >> 15);
      // add offset and get unicode
      return String.fromCharCode(val + 64);
      // var tmp = {'tmp' : str};
      // try{
      //     eval("(" + JSON.stringify(tmp) + ")");
      // }catch(e) {
      //     console.log(val + 64);
      // }
    },

    quantize(val) {
      return Math.ceil(val * 1024);
    }
  }
};
</script>
<style lang="scss">
.heatMap {
  // height: 300px;
  .content {
    width: 100%;
    .echarts {
      width: 100%;
    }
  }
}
</style>
