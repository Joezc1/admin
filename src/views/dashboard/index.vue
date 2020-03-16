<template>
  <div class="dashboard-main">
    <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <div class="cover darktored">
          <div class="timemd">
            <!-- {{time}} -->
            <!-- 2019-3-2 12:23 -->
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
        <div class="header-item green" style="text-align:center">
          <div class="pei-title">Ios登录比例</div>
          <el-progress :color="colors" type="circle" :percentage="iosper"></el-progress>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="header-item greentored" style="text-align:center">
          <div class="pie-title">Android登录比例</div>
          <el-progress :color="colors" type="circle" :percentage="androidper"></el-progress>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="header-item green"></div>
      </el-col>
      <el-col :span="4">
        <div class="header-item darktored"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="header-two">
      <el-col :span="6">
        <div class="header-item redtodark"></div>
      </el-col>
      <el-col :span="6">
        <div class="header-item darktored"></div>
      </el-col>
      <el-col :span="6">
        <div class="header-item green"></div>
      </el-col>
      <el-col :span="6">
        <div class="header-item greentored"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="header-three">
      <el-col :span="24">
        <div class="header-item greentored"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
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
    initTime() {
      this.myInter = setInterval(function() {
        var time = new Date();
        var year = time.getFullYear(); //获取年份
        var month = time.getMonth() + 1; //获取月份
        var day = time.getDate(); //获取日期
        var hour = checkTime(time.getHours()); //获取时
        var minite = checkTime(time.getMinutes()); //获取分
        var second = checkTime(time.getSeconds()); //获取秒
        /****当时、分、秒、小于10时，则添加0****/
        function checkTime(i) {
          if (i < 10) return "0" + i;
          return i;
        }
        var box = document.getElementById("time");
        var boxd = document.getElementById("timed");
        var boxtwo = document.getElementById("time-hour");
        var boxthree = document.getElementById("time-time");
        var boxfour = document.getElementById("time-second");
        // console.log(this.$refs)
        box.innerText = month;
        boxd.innerText = day;
        // console.log( box.innerText)
        boxtwo.innerText = hour + ":";
        boxthree.innerText = minite + ":";
        boxfour.innerText = second;
      }, 1000);
    }
  },
  created() {
    if (this.myInter) {
      clearInterval(this.myInter);
    }
    this.initTime();
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
$dark: #43446c;
$green: #2bbfc1;

$leftred: #614361;
$rightred: #8d435c;

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
  border-right: 1px solid #f5f5f5;
}
.cover {
  min-height: 185px;
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