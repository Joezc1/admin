<template>
  <div
    class="kongtiaojifang"
    ref="kongtiao"
    @mousedown="mouseDownHandleelse($event)"
    @mouseup="mouseUpHandleelse($event)"
  ></div>
</template>

<script>
export default {
  name: "zhinengjifang",
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null
      }
    };
  },
  mounted() {},
  beforeDestroy() {},
  components: {},
  methods: {
    mouseDownHandleelse(event) {
        console.log("鼠标按下")
      this.moveDataelse.x = event.pageX - this.$refs.kongtiao.offsetLeft;
      this.moveDataelse.y = event.pageY - this.$refs.kongtiao.offsetTop;
      event.currentTarget.style.cursor = "move";
      window.onmousemove = this.mouseMoveHandleelse;
    },
    mouseMoveHandleelse(event) {
      let moveLeft = event.pageX - this.moveDataelse.x + "px";
      let moveTop = event.pageY - this.moveDataelse.y + "px";
      this.$refs.kongtiao.style.left = moveLeft;
      this.$refs.kongtiao.style.top = moveTop;
    },
    mouseUpHandleelse(event) {
      window.onmousemove = null;
      event.currentTarget.style.cursor = "move";
      console.log("鼠标松开了");
    }
  }
};
</script>

<style lang='scss'>
.kongtiaojifang {
  height: 200px;
  width: 400px;
  position: fixed;
  top: 150px;
  left: 550px;
  background: red;
  cursor: pointer;
}
</style>
