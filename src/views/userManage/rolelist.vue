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
.table {
  margin-top: 20px;
}
</style>

<template>
  <div class="main">
    <div class="header">
      <el-row>
        <el-col :span="2">
          <el-button icon="el-icon-refresh" @click="getList"></el-button>
        </el-col>
        <el-col :span="2">
          <span>Username:</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="reqData.username" placeholder="请输入Username"></el-input>
        </el-col>
        <el-col :offset="13" :span="4">
          <el-button size="small" type="primary" @click.native.stop="restReqdata" plain>重置</el-button>
          <el-button size="small" type="primary" @click.native.stop="searchReqdata" plain>搜索</el-button>
          <el-button size="small" type="primary" @click.native.stop="newProject" plain>新建</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table class="table" :data="tableData" size="medium" v-loading="loading">
      <el-table-column label="用户ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户等级" width="100">
        <template slot-scope="scope">
          <span>{{ switchLevel(scope.row.level) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tel" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="230">
        <div class="btns" slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-view" @click="handleDetail(scope.row)"></el-button>
          <el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          <el-button size="small" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)"></el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
    <el-dialog
      title="编辑用户信息"
      show-close
      top="20px"
      close-on-press-escape
      @close="closeDialog"
      :visible.sync="dialogVisible"
      width="90%"
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
            <el-form-item label="用户名" prop="username">
              <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input placeholder="请输入用户密码" v-model="ruleForm.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户等级" prop="type">
              <el-select v-model="ruleForm.level" placeholder="请选择类型">
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
            <el-form-item label="用户邮箱号" prop="password">
              <el-input placeholder="请输入用户邮箱" v-model="ruleForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户手机号" prop="password">
              <el-input placeholder="请输入用户手机号" v-model="ruleForm.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item v-show="!disabled">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as upload from "../../api/upload";

import { parseTime } from "../../utils";
import * as myAxios from "../../api/rolemanage";

export default {
  name: "home",
  data() {
    return {
      // loading控制表格加载数据
      loading: false,
      // 表格数据
      tableData: [],
      // 总记录数
      total: 0,
      // 分页变量
      reqData: {
        pageSize: 10,
        pageNo: 1,
        username: ""
      },
      // 控制是否是编辑数据
      disabled: false,
      // 弹框显示
      dialogVisible: false,
      // upload默认上传地址
      defaultUrl: "",
      // form表单数据
      ruleForm: {
        username: "",
        level: "",
        tel: "",
        email: "",
        password: ""
      },
      // formrule
      rules: {
        username: [
          { required: true, message: "请输入用户账号", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入账号密码", trigger: "change" }
        ],
        level: [
          { required: true, message: "请选择用户等级", trigger: "change" }
        ],
        tel: [{ required: true, message: "请输入手机号", trigger: "change" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      // 下拉框选择
      options: [
        {
          name: "普通管理员",
          value: 1
        },
        {
          name: "超级管理员",
          value: 2
        }
      ]
    };
  },
  methods: {
    switchLevel(level) {
      switch (level) {
        case 1:
          return "普通管理员";
          break;
        default:
          return "超级管理员";
          break;
      }
    },
    // 新建
    newProject() {
      this.$router.push({
        name: "add_role"
      });
    },
    // 搜索栏
    searchReqdata() {
      this.getList();
    },
    // 重置搜索表当
    restReqdata() {
      this.reqData = {
        pageSize: 10,
        pageNo: 1,
        id: "",
        isshelves: false,
        title: "",
        detail: "",
        type: "",
        author: "",
        cover: ""
      };
    },
    // 处理时间的js
    parseTime,
    // 分页下标改变
    handleCurrentChange(page) {
      this.reqData.pageNo = page;
      this.getList();
    },
    // 删除信息
    delete(id) {
      let that = this;
      that
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          myAxios.deleterole(id).then(res => {
            let data = res.data;
            that.getList();
            that.$message.success(data.msg);
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取列表数据
    async getList() {
      let that = this;
      this.loading = true;
      await myAxios.list(this.reqData).then(res => {
        let data = res.data;
        that.tableData = data.list;
        that.tableData.forEach((element, index, arr) => {
          arr[index].isshelves = that.switchisshelves(arr[index].isshelves);
        });
        that.total = parseInt(data.pageCount);
        this.loading = false;
      });
    },

    // 修改信息
    async update() {
      let that = this;
      console.log(this.ruleForm)
      this.ruleForm.isshelves == true ? "true" : "false";
      if(this.ruleForm.id == this.$store.getters.userid){
        this.$store.commit("SET_NAME",this.ruleForm.username)
        this.$store.commit("SET_LEVEL",this.ruleForm.level)
        sessionStorage.setItem( 'username',this.ruleForm.username)
        sessionStorage.setItem( 'level',this.ruleForm.level)
      }
      await myAxios.updaterole(this.ruleForm, this.ruleForm.id).then(res => {
        let data = res.data;
        if (data.success) {
          that.getList();
          that.$message.success(data.msg);
          that.dialogVisible = false;
        }
      });
    },
    // 获取详情
    async getDetail(id) {
      let that = this;
      await myAxios.detail(id).then(res => {
        that.ruleForm = res.data.data;
        that.ruleForm.createtime = parseTime(that.ruleForm.createtime);
        that.ruleForm.updatetime = parseTime(that.ruleForm.updatetime);
        that.ruleForm.isshelves = that.switchisshelves(that.ruleForm.isshelves);
        console.log("获取成功");
        console.log(that.ruleForm);
      });
    },
    // 格式issheves类型
    switchisshelves(type) {
      switch (type) {
        case "true":
          return true;
        case "false":
          return false;
      }
    },
    // 格式类型
    switchistype(type) {
      switch (parseInt(type)) {
        case 1:
          return "教研组";
        case 2:
          return "名师队伍";
      }
    },
    // 获取详情
    handleDetail(obj) {
      this.disabled = true;
      this.dialogVisible = true;
      let that = this;
      that.getDetail(obj.id);
    },
    // 删除
    handleDelete(obj) {
      this.delete(obj.id);
    },
    // 编辑
    handleEdit(obj) {
      this.getDetail(obj.id);
      this.disabled = false;
      this.dialogVisible = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.resetForm("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.update();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传图片封面
    handleCoverSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.ruleForm.cover = res.data.url;
      // this.ruleForm.video = URL.createObjectURL(file.raw);
      console.log("上传成功,打印封面地址");
      console.log(this.ruleForm.cover);
    },
    // 上传图片之前
    beforeUploadCover(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
      // if (!isLt10M) {
      //   this.$message.error("上传视频大小不能超过10MB哦!");
      //   return false;
      // }
    },
    // 插入图片处理
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      let that = this;
      var formData = new FormData();
      formData.append("file", file);

      await upload.upload(formData).then(res => {
        const data = res.data;
        console.log(data);
        let url = res.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    }
  },
  mounted() {
    this.defaultUrl = upload.defaultUrl;
    this.getList();
  },
  components: {
  }
};
</script>

