<template>
  <div class="layout-main">
    <NavBar class="layout-header"></NavBar>
    <div class="layout-body">
      <SideBar class="body-left"></SideBar>
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
    return {};
  },
  components: {
    AppMain: AppMain,
    SideBar: SideBar,
    NavBar: NavBar,
    Tags: Tags
  }
};
</script>

<style lang="scss" scoped>
.layout-main {
  .layout-header {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #545c64;
  }
  .layout-body {
    width: 100%;
    height: 90vh;
    overflow-x: hidden;
    .body-left {
      background-color: #545c64;
      float: left;
      width: 12%;
      height: 95%;
      margin: 7px 2px 2px 0;
      box-sizing: border-box;
      box-shadow: 5px 10px 12px 0 rgba(0, 0, 0, 0.3);
      border-radius: 0 5px 5px 0;
    }
    .body-left:hover {
      box-shadow: 15px 7px 12px 0 rgba(0, 0, 0, 0.4);
    }
    .body-right {
      margin: 7px 15px 15px 15px;
      float: right;
      width: 85%;
      height: 83%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      border-radius: 10px;
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