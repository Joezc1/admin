<template>
  <section class="app-main">
    <div class="app-main-container">
      <!-- <transition name="el-zoom-in-top"> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- </transition> -->
    </div>
  </section>
</template>

<script>
import * as myAxios from "../../../../api/login"
export default {
  name: "AppMain",
  data() {
    return {
      _gap_time: ''
    };
  },
  methods: {
    async logout() {
      await myAxios.logout({userid:this.$store.getters.userid}).then(res=>{
        alert("登出")
      })
    },
     beforeunloadHandler() {
      this._beforeUnload_time = new Date().getTime();
    },
    unloadHandler(e) {
      this._gap_time=new Date().getTime()-this._beforeUnload_time;
        debugger
        this.logout()
        //判断是窗口关闭还是刷新
        if(this._gap_time<=5){
          //如果是登录状态，关闭窗口前，移除用户
          // if(!this.showLoginButton){
          //   $.ajax({
          //     url: '/pictureweb/user/remove',
          //     type: 'get',
          //     async:false, //或false,是否异步
             
          //   })
          // }
        }

    }
  },
  computed: {},
  created(){},
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
.app-main {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.app-main-container {
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>


