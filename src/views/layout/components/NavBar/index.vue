<template>
  <div class="navbar-main">
    <div class="navbar-left clearfix">
      <el-button size="small" class="collapse" icon="el-icon-s-unfold" @click="Collapse"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
        <el-breadcrumb-item
          v-for="(item,index) in $route.matched"
          :key="index"
          :to="{ path: item.path }"
        >{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div class="left-title">hyknow后台管理系统</div> -->
    </div>
    <div class="navbar-right clearfix">
      <el-button class="exit" icon="el-icon-switch-button" size="small" @click="Exit">退出系统</el-button>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="@/assets/img/a.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" icon="el-icon-setting">设置</el-dropdown-item>
          <el-dropdown-item command="b" icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item command="c" icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item command="d" icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import * as myAxios from "../../../../api/login";
// import
export default {
  name: "navbar",
  // props: {
  //   breadlist: {
  //     type:Array
  //   }
  // },
  data() {
    return {
      breadlist: [],
      isCollapse: false
    };
  },
  watch: {
    $route: {
      getBreadList() {
        $route.matched.forEach(element => {
          this.breadlist.push(element);
        });
      }
    }
  },
  methods: {
    // logout:async function() {
    //   await myAxios.logout({ userid: this.$store.getters.userid }).then(res => {
    //     alert("登出");
    //   });
    // },
    Collapse() {
      if (this.isCollapse == true) {
        this.isCollapse = false;
        this.$emit("isCollapse", false);
      } else {
        this.isCollapse = true;
        this.$emit("isCollapse", true);
      }
      // this.$emit("isCollapse",!iscollapse)
    },
    Exit() {
      this.$store.dispatch("LogOut");
      // this.$store.commit("FedLogOut");
      console.log(this.$store);
      localStorage.removeItem("tags");
      this.$store.state.admin.tags = [];
      // console.log(this.$store)
      this.$router.push("/");
    },
    handleCommand(e) {
      console.log(e);
    },
    beforeunloadHandler() {
      this._beforeUnload_time = new Date().getTime();
    },
    unloadHandler(e) {
      // this.$store.dispatch("LogOut");
      // this.logout()
      this._gap_time = new Date().getTime() - this._beforeUnload_time;
      this.logout()
      // //判断是窗口关闭还是刷新
      if (this._gap_time <= 5) {
        //   //如果是登录状态，关闭窗口前，移除用户
        //   if (!this.showLoginButton) {
        //     this.$store.dispatch("LogOut");
        // }
      }
    }
  },
  created() {
    let userid = this.$store.getters.userid
    // $.ajax({
    //     contentType: 'application/json', //请求的媒体类型
    //     url: "http://localhost:8080/admin/api//admin/user/logout",
    //     type: "POST",
    //     async: false, //或false,是否异步
    //     data: { 'userid':  userid},
    //     beforeSend: function() {
    //       debugger
    //       //请求前的处理
    //     },
    //     success: function(req) {
    //       debugger
    //       //请求成功时处理
    //     },
    //     complete: function() {
    //       debugger
    //       //请求完成的处理
    //     },
    //     error: function() {
    //       debugger
    //       //请求出错处理
    //     }
    //   });
    console.log("打印router对象");
    this.$emit("isCollapse", this.isCollapse);
    // console.log(this.$route.matched)
  },
  mounted() {
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    // window.addEventListener("unload", e => this.unloadHandler(e));
  },
  destroyed() {
    // window.removeEventListener("beforeunload", e =>
    //   this.beforeunloadHandler(e)
    // );
    // window.removeEventListener("unload", e => this.unloadHandler(e));
  }
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  float: left;
  margin-left: 20px;
  line-height: 36px;
}
.collapse {
  float: left;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.exit {
  float: left;
  margin-right: 20px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.navbar-main {
  width: 100%;
  height: 8vh;
  overflow-x: hidden;
  overflow-y: hidden;
  border-bottom: 2px solid #8492a660;
  .navbar-left {
    box-sizing: border-box;
    color: #000000;
    float: left;
    font-size: 17px;
    line-height: 36px;
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
    }
  }
}
</style>