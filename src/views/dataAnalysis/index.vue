<template>
  <div class="content">
    <pieEchart :mychartOption="mychartOption"></pieEchart>
  </div>
</template>

<script>
const pieEchart = () => import("../../components/pieEchart")
export default {
  data() {
    return {
      mychartOption: {
        // 图表背景颜色
        backgroundColor: "#2c343c",
        // 默认图表文字
        textStyle: {
          color: "#ffffff"
        },
        // 标题
        title: {
          text: "南丁格尔",
          subtext: "纯属虚构",
          textStyle: {
            color: "#ffffff"
          },
          x: "center"
        },
        // 工具栏
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          textStyle: {
            color: "#ffffff"
          },
          data: [
            "rose1",
            "rose2",
            "rose3",
            "rose4",
            "rose5",
            "rose6",
            "rose7",
            "rose8"
          ],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            // 鼠标显示标题
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["50%", "50%"],
            roseType: "area",
            data: [
              { value: 10, name: "rose1" },
              { value: 5, name: "rose2" },
              { value: 15, name: "rose3" },
              { value: 25, name: "rose4" },
              { value: 20, name: "rose5" },
              { value: 35, name: "rose6" },
              { value: 30, name: "rose7" },
              { value: 40, name: "rose8" }
            ]
          }
        ]
      }
    };
  },
  methods: {
   
  },
  created(){
       
  },
  mounted() {
  
  },
  components:{
      "pieEchart": pieEchart
  }
};
</script>
<style lang="scss">
.echart-demo{
    width: 100%;
    height: 400px;
}
</style>