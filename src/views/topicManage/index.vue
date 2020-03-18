<template>
  <div class="topic-main">
    <div class="topic-header">
      <!-- <searchBtns
        :reqData="reqData"
        @handleChange="handleChange"
        @findProject="findProject"
        @restProject="restProject"
        :inputBtns="inputBtns"
        :options="options"
        :pickerOptions="pickerOptions"
        :selectedBtns="selectedBtns"
        :newBtn="false"
        :hiddencase="false"
      ></searchBtns> -->
    </div>
    <div class="topic-table">
      <el-table :data="tableData" size="medium" v-loading="loading">
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布人ID" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.userid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="热度" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.heat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="赞同数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.agree }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关注数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.follow }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览量" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.brower }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200">
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
            <el-button size="small" type="primary" @click="handleDetail(scope.$index, scope.row)" icon="el-icon-view"></el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
          </div>
        </el-table-column>
      </el-table>

      <el-dialog
        :title="disabled==true?'话题详情':'编辑话题'"
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
            <el-col :span="12">
              <el-form-item label="话题标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="话题作者" prop="userid">
                <el-input v-model="ruleForm.userid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="关注数" prop="follow">
                <el-input v-model="ruleForm.follow"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="浏览量" prop="brower">
                <el-input v-model="ruleForm.brower"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="评论数" prop="comment">
                <el-input v-model="ruleForm.comment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="赞同数" prop="agree">
                <el-input v-model="ruleForm.agree"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="话题热度" prop="heat">
                <el-input v-model="ruleForm.heat"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="话题封面" prop="topiccover">
                <el-input v-model="ruleForm.topiccover"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="话题摘要" prop="abstract">
                <el-input type="textarea" v-model="ruleForm.abstract"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="话题详情" prop="topic">
                <vue-editor
                  id="editor"
                  useCustomImageHandler
                  @image-added="handleImageAdded"
                  v-model="ruleForm.topic"
                  :disabled="disabled"
                ></vue-editor>
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
const searchBtns = () => import("@/components/searchBtns");
// @ is an alias to /src
import * as myAxios from "@/api/topicmanage";
export default {
  name: "home",
  data() {
    return {
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
        topiccover: ""
      },
      // 表单规则
      rules: {
        title: [
          { required: true, message: "请输入话题标题", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "请输入话题简介", trigger: "blur" }
        ],
        topic: [{ required: true, message: "请输入话题详情", trigger: "blur" }],
        topiccover: [
          { required: true, message: "请上传话题封面", trigger: "blur" }
        ],
        userid: [{ required: true, message: "请输入用户", trigger: "blur" }],
        comment: [{ required: true, message: "请输入评论数", trigger: "blur" }],
        follow: [{ required: true, message: "请输入关注数", trigger: "blur" }],
        agree: [{ required: true, message: "请输入赞同数", trigger: "blur" }],
        heat: [{ required: true, message: "请输入热度", trigger: "blur" }],
        brower: [{ required: true, message: "请输入公告详情", trigger: "blur" }]
      },
      reqData: {
        id: "",
        title: "",
        abstract: "",
        pageNo: 1,
        pageSize: 10,
        pageCount: "",
        userid: "",
        createtime: "",
        tag: "",
        comment: "",
        follow: "",
        agree: "",
        heat: "",
        count: "",
        brower: ""
      },
      tableData: []
    };
  },
  computed:{
    total:{
      get:()=>{
        return this.reqData.total
      },
      set: (newval)=>{
        this.reqData.total = newval
      }
    }
  },
  methods: {
      // 创建websocket
    initWs() {
      this.socket = new WebSocket("ws://localhost:8080/admin/api/ws");
      this.socket.addEventListener("open", function(event) {
        console.log("socket is open");
      });
      this.socket.addEventListener("message",function(event){
         console.log('Message from server', event.data);
      })
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
          that.updateTopic(this.topicid);
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
      this.getTopics();
    },
    // 清除reqdata
    clearReqdata(formName) {
      this.reqData.id = "";
      this.reqData.title = "";
      this.reqData.abstract = "";
      this.reqData.userid = "";
      this.reqData.createtime = "";
      this.reqData.tag = "";
      this.reqData.comment = "";
      this.reqData.follow = "";
      this.reqData.agree = "";
      this.reqData.heat = "";
      this.reqData.count = "";
      this.reqData.brower = "";
      this.disabled = false;
      this.$refs[formName].clearValidate();
    },
    // 投不充值
    restProject() {
      this.clearReqdata("ruleForm");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleChange(value) {
      console.log("打印子组件传递的");
      console.log(value);
    },
    // 话题详情
    async topicDetail(topicid) {
      let that = this;
      await myAxios.topicDetail({ id: topicid }, topicid).then(res => {
        console.log(res);
        that.ruleForm = res.data.data;
        console.log(that.ruleForm);
      });
    },
    // 修改话题
    async updateTopic(topicid) {
      let that = this;
      await myAxios.updateTopic(this.ruleForm, topicid).then(res => {
        console.log(res);
        if (res.data.success) {
          that.$message({
            message: res.data.msg,
            type: "success"
          });
          that.clearReqdata("ruleForm");
          that.disabled = false;
          that.getTopics();
          that.dialogVisible = false;
        }
      });
    },
    // 删除话题
    async deleteTopic(topicid) {
      let data = {};
      data.id = topicid;
      await myAxios.deleteTopic(data, topicid).then(res => {
        console.log(res);
      });
    },
    // 获取话题列表
    async getTopics() {
      let that = this;
      this.loading = true;
      await myAxios
        .getTopics(this.reqData)
        .then(res => {
          console.log(res);
          that.tableData = res.data;
          // that.reqData.pageCount = parseInt(res.pageCount);
          that.total = parseInt(res.pageCount)
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    handleDetail(index, row) {
      this.disabled = true;
      this.topicDetail(row.id);
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.topicid = row.id;
      this.disabled = false;
      this.dialogVisible = true;
      this.topicDetail(row.id);
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
          that.deleteTopic(row.id);
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
    this.initWs()
    this.getTopics();
  },
  components: {
    searchBtns: searchBtns,
    VueEditor
  },
   activated(){
    alert("执行")
    console.log(this.$store)
    this.$store.state.admin.tags = []
  }
};
</script>

<style lang="scss" scoped>
.topic-header {
  padding: 5px 0 0 10px;
  border-bottom: 1px dashed #ebeef5;
  box-sizing: border-box;
}
.el-pagination {
  padding: 20px 0 0 0;
}
</style>