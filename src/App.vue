<template>
  <div id="app">
    <el-collapse-transition>
      <router-view />
    </el-collapse-transition>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
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
