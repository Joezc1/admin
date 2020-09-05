<template>
  <div class="dashboard-main">
    <h1 class="welcome">欢迎登录!</h1>
    <!-- <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <div class="cover darktored">
          <div class="timemd">
            <div id="time"></div>
            <div class="line"></div>
            <div id="timed"></div>
          </div>
          <div class="timehms">
            <div id="time-hour" class="hour"></div>
            <div id="time-time" class="mini"></div>
            <div id="time-second" class="secone"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="header-item" style="text-align:center"></div>
      </el-col>
      <el-col :span="4">
        <div class="header-item" style="text-align:center"></div>
      </el-col>
      <el-col :span="4">
        <div class="header-item"></div>
      </el-col>
      <el-col>
        <div class="header-item"></div>
      </el-col>
    </el-row>-->
    <div class="center">
      <div class="center-left">
        <pieEchart :mychartOption="pieoption" :key="refresh"></pieEchart>
      </div>
      <!-- <div class="center-right">
        <barEchart :mychartOption="baroption"></barEchart>
      </div> -->
    </div>
  </div>
</template>

<script>
var colors = ["#5793f3", "#d14a61", "#675bba"];
import * as myaxios from "../../api/systyps"


const barEchart = () => import("../../components/barEchart");
const pieEchart = () => import("../../components/pieEchart");

export default {
  name: "dashboard",
  data() {
    return {
      refresh: 0,
      // 系统列表
      sysList: [],
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
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["Android", "IOS"]
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
            name: "Android",
            min: 0,
            max: 800,
            position: "right",
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: "{value} 次"
            }
          },
          {
            type: "value",
            name: "IOS",
            min: 0,
            max: 800,
            position: "right",
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: "{value} 次"
            }
          }
        ],
        series: [
          {
            name: "Android",
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
            name: "IOS",
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
      // 餅圖
      pieoption: {
        // 图表背景颜色
        // 默认图表文字
        textStyle: {
          color: "#000000"
        },
        // 标题
        title: {
          text: "贺院知道微信小程序登录比例",
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
          data: ["Android", "Ios"]
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
            name: "小程序登录比例",
            type: "pie",
            radius: [30, 110],
            center: ["50%", "50%"],
            data: [
              { value: 0, name: "Android" },
              { value: 0, name: "Ios" }
            ]
          }
        ]
      },
      // ios设备登录信息
      // 安卓设备登录信息
      iosper: 70,
      androidper: 60,
      time: "",
      myInter: null,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  methods: {
    getList(){
      let that = this
      myaxios.getSystem().then(res => {
        console.log(that.sysList)
        that.pieoption.series[0].data[0].value = res.ios
        that.pieoption.series[0].data[1].value = res.and
      this.refresh++;

        console.log(that.pieoption.series)
      })
    }
  },
  created() {
    console.log(this.$store);
    this.getList()

    // if (this.myInter) {
    //   clearInterval(this.myInter);
    // }
    // this.initTime();
  },
  mounted() {
    
  },
  components: {
    pieEchart,
    barEchart
  }
};
</script>

<style lang="scss" scoped>
$dark: #43446c;
$green: #2bbfc1;

$leftred: #614361;
$rightred: #8d435c;

.welcome {
  width: 200px;
  height: 40px;
  // animation: welcome 3s;
  color: #2bbfc1;
  // -webkit-animation:myfirst 5s; /* Safari and Chrome */
}

@keyframes welcome {
  from {
    margin-left: 50vw;
    color: #000000;
  }
  to {
    margin-left: 0px;
    color: #2bbfc1;
  }
}

// @-webkit-keyframes welcome /* Safari and Chrome */
// {
// 	from {
//   background:red;
//   }
// 	to {bmargin-left: 0px;}
// }

.dashboard-main {
  position: relative;
  // background-image: linear-gradient(to right, $green 0%, #a0a08b 100%);
}
.pie-title {
  padding-top: 20px;
  box-sizing: border-box;
  color: #fff;
}
.timehms {
  padding: 0 0 0 80px;
  box-sizing: border-box;
  font-size: 30px;
  opacity: 0.8;
  font-weight: bold;
  color: orange;
}
.hour {
  float: left;
}
.mini {
  float: left;
}
.second {
  float: left;
}
.timemd {
  font-size: 32px;
  display: flex;
  width: 30%;
  // margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  height: 70px;
  font-size: 40px;
  padding: 20px 0 0 10px;
}
#time {
  color: #fff;
  flex: 1;
  font-size: 40px;
  line-height: 43px;
}
.line {
  width: 1px;
  height: 70%;
  box-sizing: border-box;
  background: #ffffff50;
  padding-top: 40px;
}
#timed {
  font-size: 30px;
  flex: 1;
  color: #f5f5f5;
  opacity: 0.5;
}

.header-two {
  border-top: 1px solid #f5f5f5;
}
.header-three {
  border-top: 1px solid #f5f5f5;
}
.header-four {
  border-top: 1px solid #f5f5f5;
}
.dashboard-main {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  // background-image: url("../../assets/img/backw.jpg");
  // background-size: cover;
  // background-repeat: no-repeat;
  // background-image: linear-gradient(to right, #db3125 0%,#578bc3 100%);
}
.el-col {
  // border-right: 1px solid #f5f5f5;
}
.cover {
  min-height: 120px;
  border-radius: 12px;
}
.header-item {
  min-height: 185px;
}
.dark {
  background-color: $dark;
  opacity: 0.8;
}
.green {
  opacity: 0.8;
  background-color: $green;
}
.darktored {
  opacity: 0.8;
  background-image: linear-gradient(to right, $leftred 0%, $rightred 100%);
  // background-image: linear-gradient(to right, #db3125 0%,#578bc3 100%);
}
.redtodark {
  opacity: 0.8;
  background-image: linear-gradient(to left, $leftred 0%, $rightred 100%);
}
.greentored {
  background-image: linear-gradient(to right, $green 0%, #a0a08b 100%);
}
</style>