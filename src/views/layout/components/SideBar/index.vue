<template>
  <div>
    <!-- <div class="isColl">
        <el-button type="primary" style="padding: 4px 8px;" size="small" @click="closeColl" v-if="isCollapse" plain icon="el-icon-s-unfold"></el-button>
        <el-button type="primary" style="padding: 4px 8px;" size="small" @click="openColl" v-else plain icon="el-icon-s-fold"></el-button>
    </div>-->
    <div class="header-title" v-show="!isCollapse">贺院知道管理系统</div>
    <el-menu
      @select="selectIndex"
      :default-active="menuindex || '1-1'"
      background-color="rgb(48, 65, 86)"
      text-color="rgb(191, 203, 217)"
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
import router from "../../../../router";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      isopen: true,
      labelflag: false,
      // isCollapse: false,
      arr: [],
      list: [],
      routes: []
      // iconlist: ['el-icon-edit-outline','el-icon-warning-outline','el-icon-tickets','el-icon-user','el-icon-data-analysis']
    };
  },
  props: {
    isCollapse: {
      type: Boolean
    }
  },
  computed: {
    // ...mapGetters(["routes", "name", "tags", "menuindex"])
  },
  created() {
    console.log("打印监听route");
    this.routes = this.$store.getters.routes
    console.log(router);
    this.getRoutes();
    // console.log(router)
  },
  watch: {
    $route: {
      getBreadList() {
        console.log("打印监听route");
        console.log(router);
      }
    }
  },
  methods: {
    ...mapMutations("admin", {
      setTags: "SET_TAGS"
    }),
    closeColl() {
      this.isCollapse = false;
    },
    openColl() {
      this.isCollapse = true;
    },
    handleItem(item) {
      let list = this.tags;
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
      console.log("打印store");
      console.log(this.$store);
      // sessionStorage.title=item.adminname
      localStorage.setItem("tags", JSON.stringify(list));
      console.log("tags");
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
      // console.log(this.$store.state.routes);
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
    },
    selectIndex(e) {
      console.log("选中函数");
      console.log(e);
      sessionStorage.menuindex = e;
    }
  }
};
</script>

<style lang="scss">
.header-title {
  font-size: 21px;
  margin-top: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}
.isColl {
  padding: 30px 0 0 20px;
  box-sizing: border-box;
}
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
  overflow-y: hidden;
  height: 93vh;
}
</style>