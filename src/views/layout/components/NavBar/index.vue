<template>
  <div class="navbar-main">
    <div class="navbar-left">hyknow后台管理系统</div>
    <div class="navbar-right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="@/assets/img/a.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item command="b" icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item command="c" icon="el-icon-circle-plus-outline">退出</el-dropdown-item>
          <el-dropdown-item command="d" icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item command="e" icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {};
  },
  methods: {
    handleCommand(e) {
      console.log(e);
      if (e == "c") {
        this.$store.commit("FedLogOut");
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.navbar-main {
  width: 100%;
  height: 10vh;
  overflow-x: hidden;
  .navbar-left {
    box-sizing: border-box;
    color: #ffffff;
    float: left;
    font-size: 19px;
    line-height: 50px;
    font-weight: bold;
    margin-left: 16px;
  }
  .navbar-right {
    float: right;
    img {
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 35px;
      margin-top: 4px;
    }
  }
}
</style>