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
          <el-row style="padding:20px 0 20px 0;" :gutter="20">
            <el-col :span="7">
              <div class="drawer-label">topicid:</div>
            </el-col>
            <el-col :span="17">
              <el-input v-model="reqData.topicid"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="btns">
                <el-button type="primary" @click.native.stop="restReqdata" plain>重置</el-button>
                <el-button type="primary" @click.native.stop="handleSearch" plain>搜索</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-drawer>
      <el-row>
        <el-col :span="2">
          <el-button icon="el-icon-refresh" @click="refeshForm"></el-button>
        </el-col>
        <el-col :span="2" :offset="20">
          <el-button plain @click="openDrawer">过滤</el-button>
        </el-col>
      </el-row>
    </div>

    
    <div class="topic-table">
      <el-table :data="tableData" size="medium" v-loading="loading">
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="摘要" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.abstract }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="赞同数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.agree }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关注数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.follow }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.comments }}</span>
          </template>
        </el-table-column>
        <el-table-column label="话题编号" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.topicid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者UID" width="230">
          <template slot-scope="scope">
            <span>{{scope.row.userid}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="200">
          <template slot-scope="scope">
            <span>{{parseTime(scope.row.createtime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="200">
          <template slot-scope="scope">
            <span>{{parseTime(scope.row.updatetime) }}</span>
          </template>
        </el-table-column>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="reqData.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout=" sizes,prev, pager, next"
        :total="reqData.pageCount"
      ></el-pagination>
      <el-dialog
        :title="disabled==true?'回答详情':'编辑回答'"
        show-close
        top="20px"
        close-on-press-escape
        @close="closeDialog"
        :visible.sync="dialogVisible"
        width="80%"
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
            <el-col :span="24">
              <el-form-item label="回答内容" prop="answer">
                <el-input type="textarea" v-model="ruleForm.answer"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="赞同数" prop="agree">
                <el-input v-model="ruleForm.agree"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关注数" prop="follow">
                <el-input v-model="ruleForm.follow"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="评论数" prop="comments">
                <el-input v-model="ruleForm.comments"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button @click="handleUpdate('ruleForm')" type="primary">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { parseTime } from "../../utils";
import { VueEditor } from "vue2-editor";
const searchBtns = () => import("@/components/searchBtns");
// @ is an alias to /src
import * as myAxios from "@/api/answermanage";
export default {
  name: "home",
  data() {
    return {
      drawer: false,
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
        agree: ""
      },
      // 表单规则
      rules: {
        detail: [
          { required: true, message: "请输入话题标题", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        agree: [{ required: true, message: "请输入话题简介", trigger: "blur" }],
        follow: [
          { required: true, message: "请输入话题详情", trigger: "blur" }
        ],
        comments: [
          { required: true, message: "请上传话题封面", trigger: "blur" }
        ]
      },
      reqData: {
        topicid: "",
        title: "",
        pageNo: 1,
        pageSize: 10,
        pageCount: ""
      },
      tableData: []
    };
  },
  methods: {
    restReqdata() {
      this.reqData.topicid = "";
    },
    openDrawer() {
      this.drawer = true;
    },
    handleClose(done) {
      done();
    },
    handleSearch() {
      this.getList();
      this.drawer = true;
    },
    refeshForm(){
      this.restReqdata()
      this.getList()
    },

    // 创建websocket
    initWs() {
      this.socket = new WebSocket("ws://localhost:8080/admin/api/ws");
      this.socket.addEventListener("open", function(event) {
        console.log("socket is open");
      });
      this.socket.addEventListener("message", function(event) {
        console.log("Message from server", event.data);
      });
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
          that.updateAnswer(this.topicid);
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
      this.getAnswers();
    },
    // 清除reqdata
    clearReqdata(formName) {
      this.reqData.topicid = "";
      this.reqData.title = "";
      this.disabled = false;
      this.$refs[formName].clearValidate();
    },
    // 投不充值
    restProject() {
      this.clearReqdata("ruleForm");
    },
    handleSizeChange(val) {
      this.reqData.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.reqData.pageNo = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    // 话题详情
    async answerDetail(id) {
      let that = this;
      await myAxios.answerDetail(id).then(res => {
        console.log(res);
        that.ruleForm = res.data.data;
        console.log(that.ruleForm);
      });
    },
    // 修改话题
    async updateAnswer(id) {
      let that = this;
      await myAxios.updateAnswer(this.ruleForm, id).then(res => {
        console.log(res);
        if (res.data.success) {
          that.$message({
            message: res.data.msg,
            type: "success"
          });
          that.clearReqdata("ruleForm");
          that.disabled = false;
          that.getList();
          that.dialogVisible = false;
        }
      });
    },
    // 删除话题
    async deleteAnswer(id) {
      let data = {};
      data.id = topicid;
      await myAxios.deleteAnswer(data, id).then(res => {
        console.log(res);
      });
    },
    // 获取话题列表
    async getList() {
      let that = this;
      this.loading = true;
      await myAxios
        .getAnswer(this.reqData)
        .then(res => {
          console.log(res);
          that.tableData = res.data.list;
          that.reqData.pageCount = parseInt(res.data.pageCount);
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    handleDetail(index, row) {
      this.disabled = true;
      this.answerDetail(row.id);
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.topicid = row.id;
      this.disabled = false;
      this.dialogVisible = true;
      this.answerDetail(row.id);
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
          that.deleteAnswer(row.id);
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
    this.getList();
  },
  components: {
    searchBtns: searchBtns,
    VueEditor
  }
};
</script>

<style lang="scss" scoped>
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
.btns{
  text-align: center;
}


.el-pagination {
  padding: 20px 0 0 0;
}
.header-label {
  font-size: 17px;
}
</style>