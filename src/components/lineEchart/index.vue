<template>
  <div class="content">
    <div class="echart-demo" id="echart-demo"></div>
  </div>
</template>

<script>
export default {
  props: {
      mychartOption:Object
  },
  data() {
    return {
      myChart: null,
    };
  },
  methods: {
    initEchart() {
      var chart = document.getElementById("echart-demo");
      this.myChart = this.echarts.init(chart);
      this.myChart.setOption(this.mychartOption);
      // this.myChart.hideLoading();
    }
  },
  created(){
        // this.myChart.showLoading();
  },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      that.initEchart();
    });
  }
};
</script>
<style lang="scss">
.echart-demo{
    width: 100%;
    height: 400px;
}
</style>