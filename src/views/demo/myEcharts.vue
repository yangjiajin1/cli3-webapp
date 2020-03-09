<template>
  <div class="myEcharts">
    <van-nav-bar title="图表" left-text="返回" left-arrow @click-left="back" />
    <div class="content">
      <div class="pieBox">
        <v-chart :options="option" />
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import "echarts/lib/chart/pie";
import 'echarts/lib/component/legend'
export default {
  name: "myEcharts",
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      option: {
        legend: {
          orient: "vertical",
          left: 'center',
          top: 'center',
          selectedMode: false,
          data: ["愿意70人", "不愿意10人"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            data: [
              { value: 70, name: "愿意70人", itemStyle:{ color: '#419af7'} },
              { value: 10, name: "不愿意10人", itemStyle:{ color: '#ea5e51'} }
            ]
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.myEcharts {
  // height: 300px;
  .pieBox {
      width: 100%;
      .echarts {
          width: 100%;
      }
  }
}
</style>

