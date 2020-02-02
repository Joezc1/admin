<template>
  <div class="btn-main">
    <div class="topic-header">
      <el-row class="row">
        <el-col class="inputbtns clearfix" v-for="(item,k) in inputBtns" :span="3" :key="k">
          <template v-if="!item.hidden">
            <label class="inputlabel">{{item.name}}:</label>
            <el-input class="elinput" placeholder="请输入" v-model="reqData[item.value]"></el-input>
          </template>
        </el-col>
        <template v-for="(v,i) in selectedBtns">
          <el-col :span="3" :class="{'hidden':v.hidden}" :key="v.name">
              <div :class="{selectbtns:true,clearfix:true,'hidden':v.hidden}" :key="v.name">
                <label class="selectlabel" :key="v.name">{{v.name}}:</label>
                <el-select class="elselect" :key="i" v-model="reqData[v.value]" placeholder="请输入标签">
                  <el-option
                    :label="val.name"
                    :value="val.id"
                    v-for="(val, $index) in v.data"
                    :key="$index"
                  ></el-option>
                </el-select>
              </div>
          </el-col>
        </template>
        <el-col :span="4" :class="{'hidden':hiddencase}">
          <template>
            <label class="selectlabel">关键字:</label>
            <el-cascader
              class="elselect"
              v-model="reqData.tag"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </template>
        </el-col>
        <el-col :span="5">
          <template v-if="!pickerOptions.hidden">
            <div class="block">
              <label class="inputlabel">创建时间:</label>
              <el-date-picker
                class="elinput"
                style="width:60%"
                v-model="reqData.createtime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
                @change="changeTime"
              ></el-date-picker>
            </div>
          </template>
        </el-col>
        <el-col :span="4" class="header-btn">
          <el-button @click="findProject" size="small" type="primary">查询</el-button>
          <el-button @click="restProject" size="small" type="primary">重置</el-button>
          <el-button v-if="newBtn" size="small" @click="newProject" type="success">新增</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchBtns",
  data() {
    return {
      gut: ""
    };
  },
  props: {
    inputBtns: {
      type: Array
    },
    reqData: {
      type: Object
    },
    pickerOptions: {
      type: Object
    },
    options: {
      type: Array
    },
    hiddencase: {
      type: Boolean
    },
    selectedBtns: {
      type: Array
    },
    newBtn:{
      type: Boolean
    }
  },
  computed: {
    gutter: {
      get: function() {
        return this.gut;
      },
      set: function(newval) {
        this.gut = newval;
      }
    }
  },
  created() {
    console.log("组件打印");
    console.log(this.inputBtns);
  },
  methods: {
    projectArrowStatus(type) {
      switch (type) {
        case 0:
          return "预热中";
        case 1:
          return "认购中";
        case 2:
          return "已结束";
      }
    },
    changeTime(e){
      console.log("打印时间")
      console.log(e)
    },
    handleChange(value) {
      this.$emit("handleChange", value);
    },
    newProject() {
      this.$emit("newProject");
    },
    findProject() {
      this.$emit("findProject");
    },
    restProject() {
      this.$emit("restProject");
    }
  }
};
</script>

<style lang="scss" scoped>
.topic-header {
  padding: 10px 0 0 10px;
  border-bottom: 1px dashed #ebeef5;
  box-sizing: border-box;
}
.el-pagination {
  padding: 20px 0 0 0;
}
</style>