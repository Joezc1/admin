<template>
  <div class="topic-main">
    <div class="topic-header">
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
              <div class="drawer-title">搜索回答</div>
            </div>
            <div class="drawer-right">
              <i class="el-icon-close" @click="drawer=false"></i>
            </div>
          </div>
          <div class="drawer-input">
            <el-row :gutter="20">
              <el-col :span="7">
                <div class="drawer-label">标题:</div>
              </el-col>
              <el-col :span="17">
                <el-input v-model="reqData.title"></el-input>
              </el-col>
            </el-row>
            <el-row style="padding:20px 0 20px 0;" :gutter="20">
              <el-col :span="9">
                <div class="drawer-label">作者UID:</div>
              </el-col>
              <el-col :span="15">
                <el-input v-model="reqData.userid"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="btns">
                  <el-button size="small" type="primary" @click.native.stop="restReqdata" plain>重置</el-button>
                  <el-button size="small" type="primary" @click.native.stop="handleSearch" plain>搜索</el-button>
                </div>
              </el-col>
            </el-row>
            </div>
          </div>
        </el-drawer>
        <el-row>
          <el-col :span="2">
            <el-button size="small" icon="el-icon-refresh" @click="refeshForm"></el-button>
          </el-col>
          <el-col :span="2" :offset="20">
            <el-button type="success" icon="el-icon-search" size="small" @click="openDrawer"></el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="topic-table">
      <el-table :data="tableData" size="small" v-loading="loading">
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
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.type|switchType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="热度" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.heat }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="赞同数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.agree }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="评论数" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.comment }}</span>
          </template>
        </el-table-column> -->
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
        <el-table-column label="操作" fixed="right" width="260">
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
            :disabled="scope.row.type!=1"
              size="small"
              type="primary"
              @click="handlePass(scope.$index,scope.row)"
              icon="el-icon-check"
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
        :title="disabled==true?'话题详情':'编辑话题'"
        show-close
        top="20px"
        close-on-press-escape
        @close="closeDialog"
        :visible.sync="dialogVisible"
        width="70%"
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

          <!-- <el-row :gutter="20">
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
          </el-row> -->

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
            <el-col :span="12">
              <el-form-item label="审核话题" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
import * as uploaddAxios from "@/api/upload"
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
        agree: "",
        heat: "",
        brower: "",
        topic: "",
        topiccover: ""
      },
      // 审核状态
      typeList: [
        {
          name: "未审核",
          value: 1
        },
        {
          name: "审核通过",
          value: 2
        },
        {
          name: "审核未通过",
          value: 3
        }
      ],
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
        brower: [{ required: true, message: "请输入公告详情", trigger: "blur" }],
        type: [{ required: true, message: "选择话题状态", trigger: "blur" }]

      },
      reqData: {
        title: "",
        pageNo: 1,
        pageSize: 10,
        pageCount: 1,
        userid: ""
      },
      tableData: [],
      level: '0'
    };
  },
  filters: {
    switchType(key) {
      switch (key) {
        case 1:
          return "未审核";
          break;
        case 2:
          return "审核通过";
          break;
        default:
          return "未审核通过";
          break;
      }
    }
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
  methods: {
    // 审核通过
    async handlePass(index, row) {
      let that = this;
      row.type = 2;
      await myAxios.updateTopic(row, row.id).then(res => {
        if (res.data.success) {
          that.$message({
            message: '审核通过',
            type: "success"
          });
        } else {
          that.$message({
            message: res.data.msg,
            type: "success"
          });
        }
      });
    },
    restReqdata() {
      this.reqData.title = "";
      this.reqData.userid = "";
    },
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
      this.restReqdata();
      this.getTopics();
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
      this.reqData.title = "";
      this.reqData.userid = "";
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
      let that = this
      await myAxios.deleteTopic(data, topicid).then(res => {
        if(res.data.success){
           that.$message({
            type: "success",
            message: res.data.msg
          });
          that.getTopics()
        }else{
           that.$message({
            type: "error",
            message: res.data.msg
          });
        }
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
          that.total = parseInt(res.pageCount);
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
      // formData.append('file', file);
      let that = this;
      var formData = new FormData();
      formData.append("file", file);

      await uploaddAxios.upload(formData).then(res => {
        const data = res.data;
        console.log(data);
        let url = res.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    }
  },
  created() {
    this.level = this.$store.getters.level
    console.log("打印store");
    console.log(this.$store);
    this.getTopics();
  },
  components: {
    searchBtns: searchBtns,
    VueEditor
  },
  activated() {
    this.$store.state.admin.tags = [];
  }
};
</script>

<style lang="scss" scoped>
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

.el-pagination {
  padding: 20px 0 0 0;
}
</style>