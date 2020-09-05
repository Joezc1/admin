<template>
  <div class="topic-main">
    <div class="topic-header">
       <el-drawer
        :with-header="false"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose"
        size="20%"
      >
        <div class="drawer-main">
           <div class="drawer-header clearfix">
            <div class="drawer-left">
              <i class="el-icon-warning-outline"></i>
              <div class="drawer-title">搜索用户</div>
            </div>
            <div class="drawer-right">
              <i class="el-icon-close" @click="drawer=false"></i>
            </div>
          </div>
          <div class="drawer-input">
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="drawer-label">UID:</div>
            </el-col>
            <el-col :span="17">
              <el-input v-model="reqData.userid"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;" >
            <el-col :span="7">
              <div class="drawer-label">昵称:</div>
            </el-col>
            <el-col :span="17">
              <el-input v-model="reqData.nickname"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="btns">
                <el-button size="small" type="primary" @click.native.stop="refeshForm" plain>重置</el-button>
                <el-button size="small" type="primary" @click.native.stop="getUsers" plain>搜索</el-button>
              </div>
            </el-col>
          </el-row>
          </div>
        </div>
      </el-drawer>
      <el-row >
        <el-col :span="1">
          <el-button size="small" icon="el-icon-refresh" @click="getUsers"></el-button>
        </el-col>
        <el-col :span="1" :offset="21">
          <el-button size="small" type="success" @click="openDrawer" icon="el-icon-search"></el-button>
        </el-col>
      </el-row>
    </div>
    <div class="topic-table">
      <el-table :data="tableData" size="small" v-loading="loading">
        <el-table-column label="UID" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.userid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="UserName" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Cover" width="100">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.cover"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="Sex" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.sex | switchSex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Birthday" width="120">
          <template slot-scope="scope">
            <span>{{parseTime(scope.row.birthday,'{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Grade" width="100">
          <template slot-scope="scope">
            <span>{{parseNull(scope.row.grade) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否已完善信息" width="150">
          <template slot-scope="scope">
            <span>{{ switchComplete(scope.row.iscomplete) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="用户等级" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.level }}</span>
          </template>
        </el-table-column>-->

        <el-table-column label="操作" fixed="right" width="230">
          <div class="btns" slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleDetail(scope.$index, scope.row)"
              icon="el-icon-view"
            ></el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-delete"
            ></el-button>
          </div>
        </el-table-column>
      </el-table>

      <el-dialog
        :title="disabled?'用户详情':'编辑用户'"
        show-close
        top="20px"
        close-on-press-escape
        @close="closeDialog"
        :visible.sync="dialogVisible"
        width="60%"
        center
      >
        <el-form
          :disabled="disabled"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="UID" prop="userid">
                <el-input disabled v-model="ruleForm.userid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="昵称" disabled prop="nickname">
                <el-input disabled v-model="ruleForm.nickname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker format="yyyy-MM-dd" v-model="ruleForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年级">
                <el-select v-model="ruleForm.grade" placeholder="请选择年级">
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
           
          </el-row>
          <el-form-item>
            <el-button @click="handleUpdate('ruleForm')" type="primary">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="reqData.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="reqData.pageCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { parseTime } from "../../utils";
import { VueEditor } from "vue2-editor";
// @ is an alias to /src
import * as myAxios from "../../api/usermanage";
export default {
  name: "home",
  data() {
    return {
      drawer:false,
      topicid: "",
      disabled: false,
      dialogVisible: false,
      loading: false,
      
      // form表单
      ruleForm: {
        id: "",
        title: "",
        abstract: "",
        userid: "",
        comment: "",
        follow: "",
        agree: "",
        heat: "",
        brower: "",
        topic: "",
        topiccover: "",
        grade: ''
      },
      // 表单规则
      rules: {
       
      },
      reqData: {
        pageNo: 1,
        pageSize: 10,
        pageCount: 1,
        userid: "",
        nickname: ""
      },
      tableData: [],
      // 下拉框选择
      options: [
        {
          name: "男",
          value: 0
        },
        {
          name: "女",
          value: 1
        }
      ],
      grades: [
        {
          name: "大一",
          value: 1
        },
        {
          name: "大二",
          value: 2
        },
         {
          name: "大三",
          value: 3
        },
         {
          name: "大四",
          value: 4
        },
         {
          name: "其他",
          value: 5
        }
      ],
    };
  },
  computed: {
    total: {
      get: () => {
        return this.reqData.total;
      },
      set: newval => {
        this.reqData.total = newval;
      }
    }
  },
  filters: {
    switchSex(sex){
      switch (sex) {
        case 0:
          return "男";
          break;
        default:
          return "女";
          break;
      }
    }
  },
  methods: {
     openDrawer() {
      this.drawer = true;
    },
    handleClose(done) {
      done();
    },
    handleSearch() {
      this.getTopics();
      this.drawer = true;
    },
    refeshForm() {
      this.reqData =  {
        pageNo: 1,
        pageSize: 10,
        pageCount: 1,
        userid: "",
        nickname: ""
      }
    },
    switchComplete(type) {
      switch (type) {
        case 0:
          return "尚未完善";
          break;
        default:
          return "已经完善";
          break;
      }
    },
    parseNull(a) {
      return a == "" || a == null ? "空" : a;
    },
    parseTime,
    // 表单重置
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleUpdate(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(that.ruleForm.birthday!=null && that.ruleForm.birthday!=''){
          that.ruleForm.birthday = that.parseTime(that.ruleForm.birthday,'{y}-{m}-{d}')
          }
          that.updateUser(this.ruleForm.userid);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置form变淡
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 关闭dialog
    closeDialog() {
      console.log("调用打印");
      this.clearReqdata("ruleForm");
    },
    // 头部搜索框
    findProject() {
      console.log("打印reqdata");
      console.log(this.reqData);
      this.getUsers();
    },
    // 清除reqdata
    clearReqdata(formName) {
      this.reqData.userid = "";
      this.reqData.nickname = "";
      this.disabled = false;
      this.$refs[formName].clearValidate();
    },
    // 投不充值
    restProject() {
      this.clearReqdata("ruleForm");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.reqData.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleChange(value) {
      console.log("打印子组件传递的");
      console.log(value);
    },
    // 话题详情
    async userDeatil(userid) {
      let that = this;
      await myAxios.Detail(userid).then(res => {
        console.log(res);
        that.ruleForm = res.data.data;
        console.log(that.ruleForm);
      });
    },
    // 修改话题
    async updateUser(id) {
      let that = this;
      await myAxios.Update(this.ruleForm, id).then(res => {
        console.log(res);
        if (res.data.success) {
          that.$message({
            message: res.data.msg,
            type: "success"
          });
          that.clearReqdata("ruleForm");
          that.disabled = false;
          that.getUsers();
          that.dialogVisible = false;
        }
      });
    },
    // 删除话题
    async deleteUser(userid) {
      let that = this;
      await myAxios.Delete(userid).then(res => {
        console.log(res);
        let data = res.data;
        if (data.success) {
          that.$message.success(data.msg);
          that.getUsers()
        }
      });
    },
    // 获取话题列表
    async getUsers() {
      let that = this;
      this.loading = true;
      console.log(this.reqData);
      await myAxios
        .List(this.reqData)
        .then(res => {
          console.log(res);
          that.tableData = res.data.list;
          // that.reqData.pageCount = parseInt(res.pageCount);
          that.total = parseInt(res.pageCount);
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    handleDetail(index, row) {
      this.disabled = true;
      this.userDeatil(row.userid);
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.disabled = false;
      this.dialogVisible = true;
      this.userDeatil(row.userid);
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;
      console.log("删除");
      this.ruleForm = {};
      this.$confirm("此操作将删除该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.deleteUser(row.userid);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 插入图片处理
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      let that = this;
      var formData = new FormData();
      formData.append("file", file);

      await myaxios.upload(formData).then(res => {
        const data = res.data;
        console.log(data);
        let url = res.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    }
  },
  created() {
    // this.initWs()
    this.getUsers();
  },
  components: {
    VueEditor
  }
};
</script>

<style lang="scss" scoped>
$blue: #409eff;
$white: #f5f5f5;
$gray: #d9d9d9;
.header {
  padding: 10px;
  box-sizing: border-box;
  border: 1px dashed $gray;
  border-radius: 5px;
  span {
    line-height: 40px;
    font-size: 17px;
  }
}
.drawer-label{
  line-height: 40px;
}
.drawer-header {
  border-bottom: 1px solid #55555520;
  padding: 0 0 10px 0;
  box-sizing: border-box;
  .drawer-left {
    float: left;
    display: flex;
    i {
      line-height: 24px;
    }
    div {
    }
  }
  .drawer-right {
    float: right;
    i {
    }
  }
}
.drawer-input {
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 0 12px 0px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  .btns {
    margin-top: 20px;
    box-sizing: border-box;
  }
}
.drawer-main {
  padding: 50px 20px 50px 20px;
  box-sizing: border-box;
  height: 100vh;
}
.header {
  padding: 10px;
  box-sizing: border-box;
  border: 1px dashed #d9d9d9;
  border-radius: 5px;
  span {
    line-height: 40px;
    font-size: 17px;
  }
}
.topic-header {
  padding: 5px 0 7px 10px;
  border-bottom: 1px dashed #ebeef5;
  box-sizing: border-box;
}
.btns {
  text-align: center;
}
.topic-table{
  margin-top: 20px;
}
.topic-header {
  padding: 5px 0 0 10px;
  border-bottom: 1px dashed #ebeef5;
  box-sizing: border-box;
}
.el-pagination {
  padding: 20px 0 0 0;
}
</style>