<template>
  <div class="layout-main clearfix">
    <SideBar :isCollapse="isCollapse" class="body-left"></SideBar>
    <div class="layout-body">
      <NavBar @isCollapse="getCollapse" class="layout-header"></NavBar>
      <Tags></Tags>
      <AppMain class="body-right"></AppMain>
    </div>
  </div>
</template>

<script>
const AppMain = () => import("./components/AppMain");
const SideBar = () => import("./components/SideBar");
const NavBar = () => import("./components/NavBar");
const Tags = () => import("./components/Tags");
export default {
  name: "layout",
  data() {
    return {
      breadlist: [],
      isCollapse: false
    };
  },
  components: {
    AppMain: AppMain,
    SideBar: SideBar,
    NavBar: NavBar,
    Tags: Tags
  },
  methods: {
    getCollapse(e) {
      this.isCollapse = e;
    }
  },
  created() {
    // this.breadlist = this.$route.matched
  }
};
</script>

<style lang="scss" scoped>
.layout-main {
  display: flex;
  .layout-header {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
  .body-left {
    background-color:rgb(48, 65, 86);
    // float: left;
    // width: 13%;
    height: 100vh;
    // margin: 7px 2px 2px 0;
    box-sizing: border-box;
    // box-shadow: 5px 10px 12px 0 rgba(0, 0, 0, 0.3);
    // border-radius: 0 5px 5px 0;
  }
  .layout-body {
    float: right;
    min-width: 87%;
    height: 100vh;
    // float: left;
    overflow-x: hidden;

    .body-left:hover {
      // box-shadow: 15px 7px 12px 0 rgba(0, 0, 0, 0.4);
    }
    .body-right {
      // margin: 7px 15px 15px 15px;
      float: right;
      width: 100%;
      height: 84vh;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    }
    // .body-right:hover {
    //   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.7);
    // }
  }
  .layout-body::after {
    clear: both;
    height: 0;
    font-size: 0;
    display: block;
    visibility: hidden;
    content: "";
  }
}
</style>