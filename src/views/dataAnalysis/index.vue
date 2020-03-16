<template>
  <div class="content">
    <div class="data-header">
      <el-row justify="center">
        <el-col class="box" :span="2">
          <div
            :class="{'box-item':true,'clearfix':true,'selected':index==1}"
            @click="changeIndex(1)"
          >
            <img v-if="index==1" src="../../assets/img/spie.png" />
            <img v-else src="../../assets/img/pie.png" />
            <div>饼图</div>
          </div>
        </el-col>
        <el-col class="box" :span="2">
          <div
            :class="{'box-item':true,'clearfix':true,'selected':index==2}"
            @click="changeIndex(2)"
          >
            <img v-if="index==2" src="../../assets/img/sline.png" />
            <img v-else src="../../assets/img/line.png" />
            <div>折线图</div>
          </div>
        </el-col>
        <el-col class="box" :span="2">
          <div
            :class="{'box-item':true,'clearfix':true,'selected':index==3}"
            @click="changeIndex(3)"
          >
            <img v-if="index==3" src="../../assets/img/sbar.png" />
            <img v-else src="../../assets/img/bar.png" />
            <div>柱状图</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <pieEchart v-if="index==1" :mychartOption="pieoption"></pieEchart>
    <lineEchart v-if="index==2" :mychartOption="lineoption"></lineEchart>
    <barEchart v-if="index==3" :mychartOption="baroption"></barEchart>
  </div>
</template>

<script>
// 柱状图颜色
var colors = ["#5793f3", "#d14a61", "#675bba"];

const pieEchart = () => import("../../components/pieEchart");
const barEchart = () => import("../../components/barEchart");
const lineEchart = () => import("../../components/lineEchart");
export default {
  data() {
    return {
      // 判断当前选中的图表下标
      index: 1,
      // 饼图属性
      pieoption: {
        // 图表背景颜色
        // 默认图表文字
        textStyle: {
          color: "#000000"
        },
        // 标题
        title: {
          text: "南丁格尔",
          subtext: "纯属虚构",
          textStyle: {
            color: "#000000"
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
            color: "#000000"
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
          ]
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
      },
      // 柱状图属性
      baroption: {
        color: colors,

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          right: "20%"
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"]
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "蒸发量",
            min: 0,
            max: 250,
            position: "right",
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "降水量",
            min: 0,
            max: 250,
            position: "right",
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            position: "left",
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "降水量",
            type: "bar",
            yAxisIndex: 1,
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 2,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      },
      // 折线图属性
      lineoption: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ]
      }
    };
  },
  methods: {
    changeIndex(index) {
      this.index = index;
    }
  },
  created() {
  },
  mounted() {},
  components: {
    pieEchart: pieEchart,
    barEchart: barEchart,
    lineEchart: lineEchart
  }
};
</script>
<style lang="scss">
$blue: #409eff;
.echart-demo {
  width: 100%;
  height: 400px;
}
.data-header {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.box-item {
  height: 48px;
  margin: 0 auto;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  img {
    flex: 1;
    width: 25px;
    height: 25px;
    margin: 0 auto;
  }
  div {
    flex: 1;
    font-size: 16px;
    line-height: 23px;
  }
}
.selected {
  color: $blue;
}
</style>