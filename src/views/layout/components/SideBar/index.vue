<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">
        <i class="el-icon-s-grid"></i>
      </el-radio-button>
      <el-radio-button :label="true">
        <i class="el-icon-menu"></i>
      </el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1-1"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF"
      :class='{"el-menu-vertical-demo":true,"hiddenscroll":!isCollapse}'
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu v-for="(item,index) in list" :key="index" :index="formatOne(index)">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.adminname}}</span>
        </template>
        <el-menu-item-group>
          <template v-for="(k,i) in item.children">
            <router-link :to="item.path +'/'+k.path" :key="i">
              <el-menu-item
                @click="handleItem(k)"
                :key="i"
                :index="formatIndex(index,i)"
              >{{k.adminname}}</el-menu-item>
            </router-link>
          </template>
        </el-menu-item-group>
      </el-submenu>

      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-warning-outline"></i>
          <span slot="title">回答管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">回答列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      -->
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      labelflag: false,
      isCollapse: false,
      arr: [],
      list: []
      // iconlist: ['el-icon-edit-outline','el-icon-warning-outline','el-icon-tickets','el-icon-user','el-icon-data-analysis']
    };
  },
  computed: {
    ...mapGetters(["routes", "name", "tags"])
  },
  created() {
    this.getRoutes();
  },
  methods: {
    ...mapMutations("admin", {
      setTags: "SET_TAGS"
    }),
    handleItem(item) {
      let list = this.tags;
      console.log("打印list");
      let obj = list.find(e => {
        return e.name === item.name;
      });
      if (obj) {
        console.log("有了");
        return false;
      } else {
        console.log("没有");
        list.push(item);
      }
      console.log(this.tags);

      localStorage.setItem("tags", JSON.stringify(list));
    },
    // 获取routes对象
    getRoutes() {
      for (let i = 0; i < this.routes.length; i++) {
        if (this.routes[i].hidden) {
        } else {
          this.arr.push(this.routes[i]);
        }
      }
      for (let j = 0; j < this.arr.length; j++) {
        // this.arr[j].icon = this.iconlist[j]
        this.list.push(this.arr[j]);
      }
      // 将routes存取到状态管理器
      this.$store.state.routes = this.list;
      console.log("打印routes对象");
      console.log(this.$store.state.routes);
    },
    formatIndex(ione, itwo) {
      let a = ione * 1 + 1;
      let b = itwo * 1 + 1;
      return `${a}-${b}`;
    },
    formatOne(a) {
      let str = a * 1 + 1;
      return `${str}`;
    },
    changeType(type) {
      this.labelflag = type;
      console.log(this.labelflag);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
.el-menu-item {
  font-size: 13px;
}
a {
  text-decoration: none;
}
.el-radio-group {
  margin-left: 24px;
  margin-top: 20px;
  box-sizing: border-box;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}
.el-menu-vertical-demo {
  border: none;
}
.hiddenscroll {
  overflow-x: hidden;
  overflow-y: auto;
  height: 74vh;
}
</style>