<template>
  <div class="tags-main">
    <el-tag
      size="medium"
      hit
      @click="changeTags(tag)"
      @close="closeTags(tag)"
      v-for="tag in taglist"
      :key="tag.adminname"
      closable
      :type="tag.type"
    >{{tag.adminname}}</el-tag>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Tags",
  data() {
    return {
      taglist: []
    };
  },
  computed: {
    ...mapGetters(["routes", "name", "tags"])
  },
  methods: {
    changeTags(tag) {
      console.log("打印点击");
      console.log(tag);
      this.$router.push(tag.upperpath +'/'+ tag.path)
    },
    closeTags(tag) {
      console.log("打印关闭");
      console.log(tag);
      this.taglist.splice(this.taglist.indexOf(tag), 1);
    //   this.$store.commit('SET_TAGS',this.taglist)
    localStorage.setItem('tags',JSON.stringify(this.taglist))
    }
  },
  created() {
      this.taglist = this.tags
  }
};
</script>

<style lang="scss" scoped>
.tags-main {
  margin: 10px 15px 0 15px;
  width: 85%;
  float: right;
  height: 10%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
}
.el-tag {
  margin-left: 20px;
  box-sizing: border-box;
  margin-top: 12px;
  cursor: pointer;
}
</style>