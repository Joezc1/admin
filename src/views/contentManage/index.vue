<template>
  <div class="content-main">
    <div class="content-header">
      <searchBtns
        :reqData="reqData"
        @handleChange="handleChange"
        :inputBtns="inputBtns"
        :pickerOptions="pickerOptions"
        @newProject="newProject"
        @findProject="findProject"
        @restProject="restProject"
        :selectedBtns="selectedBtns"
        :newBtn="true"
        :hiddencase="true"
      ></searchBtns>
    </div>

    <div class="notice-table">
      <el-table :data="tableData" v-loading="loading" width="100%" size="medium">
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
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
        <el-table-column label="操作" width="230" fixed="right">
          <div class="btns" slot-scope="scope">
            <el-button size="small" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="reqData.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="reqData.count"
      ></el-pagination>
    </div>

    <el-dialog
      :title="newflag?'新增公告':'公告详情'"
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
            <el-form-item label="公告标题" prop="title">
              <el-input placeholder="请输入公告标题" v-model="ruleForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布作者" prop="author">
              <el-input  placeholder="请输入发布作者" v-model="ruleForm.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告类型" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择类型">
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
            <el-form-item label="公告视频" prop="detail">
              <el-upload
                v-show="newflag || !disabled"
                class="upload-demo"
                drag
                :action="defaultUrl"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeUploadVideo"
              >
                <i class="el-icon-upload"></i>
                <div v-if="disabled" class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div v-else class="el-upload__text">
                  修改原视频
                  <em>点击上传</em>新的视频
                </div>
                <div class="el-upload__tip" slot="tip">只能上传mp4,ogg,flv,avi,wmv,rmvb格式的视频</div>
              </el-upload>

              <video
                class="upload-video"
                v-show="ruleForm.video!='undefined'&&ruleForm.video!=''&&ruleForm.video!=null&&ruleForm.video!='null'"
                controls="controls"
                :src="ruleForm.video"
              ></video>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="公告详情" prop="detail">
              <vue-editor
                id="editor"
                useCustomImageHandler
                @image-added="handleImageAdded"
                v-model="ruleForm.detail"
                :disabled="disabled"
              ></vue-editor>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button v-if="newflag" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button v-else @click="handleUpdate" type="primary">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const searchBtns = () => import("@/components/searchBtns");
// @ is an alias to /src
import { parseTime } from "../../utils";
import * as myaxios from "@/api/upload";
import * as noticeAxios from "@/api/noticemanage";
import { VueEditor } from "vue2-editor";
export default {
  name: "home",
  data() {
    return {
      socket: null,
      videoFlag: false,
      videoUploadPercent: 0,
      defaultUrl: "",
      loading: false,
      newflag: false,
      disabled: false,
      options: [
        {
          name: "未发布",
          value: 1
        },
        {
          name: "已发布",
          value: 2
        }
      ],
      reqData: {
        title: "",
        author: "",
        detail: "",
        id: "",
        title: "",
        createtime: "",
        pageNo: 1,
        pageSize: 10,
        count: 0
      },
      ruleForm: {
        title: "",
        author: "",
        detail: "",
        id: "",
        video: "",
        type: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入公告名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入公告作者", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择公告类型", trigger: "blur" }
        ],
        detail: [{ required: true, message: "请输入公告详情", trigger: "blur" }]
      },
      dialogVisible: false,
      content: "", //这是富文本框内容
      pickerOptions: {
        hidden: false,
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      inputBtns: [
        {
          name: "ID",
          value: "id",
          hidden: false
        },
        {
          name: "标题",
          value: "title",
          hidden: false
        },
        {
          name: "作者",
          value: "author",
          hidden: false
        }
      ],
      selectedBtns: [
        {
          hidden: false,
          name: "标签",
          value: "tag",
          data: [
            { id: 0, name: "科技" },
            { id: 1, name: "IT技术" },
            { id: 2, name: "美食" }
          ]
        }
      ],
      tableData: []
    };
  },
  created() {
    this.getNoticeList();
    this.defaultUrl = myaxios.defaultUrl;
  },
  methods: {
    // 文件上传成功
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.ruleForm.video = res.data.url;
      // this.ruleForm.video = URL.createObjectURL(file.raw);
      console.log("上传成功,打印文件地址");
      console.log(this.ruleForm.video);
    },
    // 上传之前
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      // if (!isLt10M) {
      //   this.$message.error("上传视频大小不能超过10MB哦!");
      //   return false;
      // }
    },
    // 进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    // 重置表单
    clearForm() {
      this.reqData.id = "";
      this.reqData.title = "";
      this.reqData.author = "";
      this.reqData.title = "";
      this.reqData.createtime = "";
      this.ruleForm = {
        title: "",
        author: "",
        detail: "",
        id: "",
        title: "",
        createtime: "",
        videoo: ""
      };
    },
    parseTime,
    handleUpdate() {
      this.updateNotice(this.ruleForm, this.ruleForm.id);
    },
    handleSizeChange(val) {
      this.reqData.pageSize = val;
      this.getNoticeList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.reqData.pageNo = val;
      this.getNoticeList();
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      this.disabled = false;
      this.dialogVisible = true;
      this.noticeDetail(row.id);
    },
    handleDelete(index, row) {
      let that = this;
      console.log("删除");
      this.ruleForm = {};
      this.$confirm("此操作将删除该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.deleteNotice(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 更改公告
    async updateNotice(data, id) {
      let that = this;
      await noticeAxios.updateNotice(data, id).then(res => {
        if (res.data.success) {
          that.$message({
            type: "success",
            message: res.data.msg
          });
          that.dialogVisible = false;
          that.getNoticeList()
        } else {
          that.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    // 删除公告
    async deleteNotice(id) {
      let data = {
        id
      };
      let that = this;
      await noticeAxios.deleteNotice(data, id).then(res => {
        if (res.data.success) {
          that.$message({
            type: "success",
            message: res.data.msg
          });
          that.getNoticeList();
        } else {
          that.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    // 查询公告详情
    async noticeDetail(id) {
      let data = {
        id
      };
      let that = this;
      await noticeAxios.noticeDetail(data, id).then(res => {
        if (res.data.success) {
          that.ruleForm = res.data.data;
          that.ruleForm.createtime = that.parseTime(that.ruleForm.createtime);
          that.ruleForm.updatetime = that.parseTime(that.ruleForm.updatetime);
          console.log(that.ruleForm);
        }
      });
    },
    // 点击详情
    handleDetail(index, row) {
      this.dialogVisible = true;
      this.disabled = true;
      console.log(row);
      this.noticeDetail(row.id);
    },
    // 查询公告列表
    async getNoticeList() {
      let that = this;
      that.loading = true;
      this.reqData.createtime = parseTime(this.reqData.createtime);
      await noticeAxios
        .getNotices(this.reqData)
        .then(res => {
          if (res.data.success) {
            that.tableData = res.data.list;
            that.loading = false;
            that.reqData.count = parseInt(res.data.pageCount);
            console.log(that.reqData);
          } else {
            that.$message({
              type: "success",
              message: res.data.msg,
              duration: 1500
            });
          }
        })
        .catch(() => {
          that.loading = false;
        });
    },
    // 新增公告
    async newNotice() {
      let that = this;
      await noticeAxios.addNotice(this.ruleForm).then(res => {
        console.log(res.data);
        if (res.data.success) {
          that.dialogVisible = false;
          that.getNoticeList();
          that.$message({
            type: "success",
            message: res.data.msg,
            duration: 1500
          });
        } else {
          that.$message({
            type: "error",
            message: res.data.msg,
            duration: 1500
          });
        }
      });
    },
    // 表单重置
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.newNotice();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log("打印子组件传递的");
      console.log(value);
    },
    newProject() {
      this.clearForm();
      this.dialogVisible = true;
      this.newflag = true;
    },
    findProject() {
      console.log(this.reqData);
      this.getNoticeList();
    },
    restProject() {
      this.clearForm();
    },
    closeDialog() {
      this.disabled = false;
      this.dialogVisible = false;
      this.newflag = false;
      this.clearForm();
      console.log("调用关闭");
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
  components: {
    VueEditor,
    searchBtns
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-select{
  float: left;
}
.el-form-item__content::after{
  clear: both;
  font-size: 0;
  display: block;
  height: 0;
  content: '';
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-video {
  height: 200px;
  width: 40%;
  margin-left: 0;
}
</style>