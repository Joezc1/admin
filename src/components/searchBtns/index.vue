<template>
  <div class="btn-main">
    <div class="topic-header">
      <el-row :gutter="5">
        <el-col class="inputbtns clearfix" v-for="(item,k) in inputBtns" :span="4" :key="k">
          <label class="inputlabel">{{item.name}}:</label>
          <el-input class="elinput" placeholder="请输入" v-model="reqData[item.value]"></el-input>
        </el-col>
        <el-col :span="5">
          <label class="selectlabel">标签:</label>
          <el-cascader
            class="elselect"
            v-model="reqData.tag"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-col>
        <el-col :span="5">
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
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="5">
          <el-button type="primary">查询</el-button>
          <el-button type="success">新增</el-button>
        </el-col>
        <!-- <el-col :span="5">
          <div class="selectbtns clearfix" v-for="(v,i) in selectedBtns" :key="v.name">
            <label class="selectlabel" :key="v.name">{{v.name}}:</label>
            <el-select
              class="elselect"
              :key="i"
              v-model="reqData[v.value]"
              placeholder="请输入标签"
              @change="handleList"
            >
              <el-option
                :label="val.name"
                :value="val.id"
                v-for="(val, $index) in v.data"
                :key="$index"
              ></el-option>
            </el-select>
          </div>
        </el-col>-->
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchBtns",
  data() {
    return {
      gut: "",
    };
  },
  props: {
    inputBtns: {
      type: Array
    },
    reqData: {
      type:Object
    },
    pickerOptions:{
      type: Object
    },
    options: {
      type: Array
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
    console.log("组件打印")
    console.log(this.inputBtns)
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
    handleChange(value) {
      this.$emit('handleChange', value);
    },
  }
};
</script>

<style lang="scss" scoped>
.topic-header {
  padding: 10px 0 20px 10px;
  border-bottom: 1px dashed #ebeef5;
  box-sizing: border-box;
}
.el-pagination {
  padding: 20px 0 0 0;
}
</style>