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
        <!-- <el-col class="box" :span="2">
          <div
            :class="{'box-item':true,'clearfix':true,'selected':index==3}"
            @click="changeIndex(3)"
          >
            <img v-if="index==3" src="../../assets/img/sbar.png" />
            <img v-else src="../../assets/img/bar.png" />
            <div>柱状图</div>
          </div>
        </el-col> -->
      </el-row>
    </div>
    <pieEchart v-if="index==1" :key="refresh" :mychartOption="pieoption"></pieEchart>
    <lineEchart v-if="index==2" :key="refresh" :mychartOption="lineoption"></lineEchart>
    <!-- <barEchart v-if="index==3" :key="refresh" :mychartOption="baroption"></barEchart> -->
  </div>
</template>

<script>
// 柱状图颜色
var colors = ["#5793f3", "#d14a61", "#675bba"];
import * as myAxios from "../../api/systyps";
const pieEchart = () => import("../../components/pieEchart");
const barEchart = () => import("../../components/barEchart");
const lineEchart = () => import("../../components/lineEchart");
export default {
  data() {
    return {
      refresh: 0,
      // tag列表
      tagnameList: [],
      tagList: [],
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
          text: "话题占比",
          subtext: "",
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
            // "软件测试",
            //  "硬件开发",
            //  "后端开发",
            //   "前端开发",
            //   "数据库管理员",
            //  "算法设计",
            // "UI设计",
            //  "医药卫生"
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
              // { value: 10, name: "软件测试" },
              // { value: 5, name: "硬件开发" },
              // { value: 15, name: "后端开发" },
              // { value: 25, name: "前端开发" },
              // { value: 20, name: "数据库管理员" },
              // { value: 35, name: "算法设计" },
              // { value: 30, name: "UI设计" },
              // { value: 40, name: "医药卫生" }
            ]
          }
        ]
      },
      // 柱状图属性
      baroption: {
        color: colors,
        title: {
          text: "话题发表量",
          subtext: "",
          textStyle: {
            color: "#000000"
          },
          x: "center"
        },
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
          data: ["蒸发量", "降水量"]
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
          }
        ]
      },
      // 折线图属性
      lineoption: {
        title: {
          text: "",
          subtext: "",
          textStyle: {
            color: "#000000"
          },
          x: "center"
        },
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
            data: [23, 12, 34, 45, 55, 2, 23],
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
    },
    async getList() {
      let that = this;
      let res = await myAxios.getTags();
      let list = res.list;
      let taglist = [];
      let datalist = [];

      list.forEach((element, index, arr) => {
        taglist.push(element.name);
        datalist.push({
          value: element.num,
          name: element.name
        });
        // let obj = {
        //   name: element,
        //   value: ''
        // }
      });
      this.pieoption.legend.data = taglist;
      this.pieoption.series[0].data = datalist;
      this.refresh++;
      console.log(this.pieoption);
    }
  },
  created() {},
  mounted() {
    this.getList();
  },
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