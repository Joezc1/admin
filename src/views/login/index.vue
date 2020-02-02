<template>
  <div class="login-main">
    <div class="login-header">
      <el-row type="flex" class="row-bg" justify="end">
        <el-col class="header-color clearfix" :span="3">
          <div class="title">不喜欢这颜色?</div>
          <el-color-picker
            @change="changeColor"
            show-alpha
            v-model="color"
            :predefine="predefineColors"
          ></el-color-picker>
        </el-col>
        <el-col :span="1">
          <el-button style="color: #666;" type="primary" plain @click="resetColor">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="login-body" :style="bodystyle">
      <h6 class="login-title">用户登录</h6>
      <el-form
        size="medium "
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item class="clearfix label" label="用户名" prop="name">
          <el-input class="form-input" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item class="clearfix label" label="密码" prop="password">
          <el-input class="form-input" type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button style="margin-right:56px;" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="body-bottem clearfix">
        <div class="bottem-left">注册</div>
        <div class="bottem-right">忘记密码?</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字母和数字",
            trigger: "blur"
          }
        ]
      },
      logincolor: "",
      colorArr: [],
      bodystyle: { "background-color": "#545c64" },
      loginstyle: { "background-color": "rgba(56, 78, 78, 0.95)" },
      color: "rgba(255, 69, 0, 0.68)",
      predefineColors: [
        "rgba(24, 92, 61, 1)",
        "rgba(92, 88, 92, 1)",
        "rgba(222, 222, 197, 1)",
        "rgba(139, 122, 79, 1)",
        "#00ced1",
        "#1e90ff",
        "#c71585"
      ],
      list: []
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // localStorage.removeItem('tags')
          let list = [];
          localStorage.setItem("tags", JSON.stringify(list));
          sessionStorage.menuindex = '1-1'
          this.$router.push("/data_analysis/analysis_list");
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
    // 将背景色rgba(a,b,c,d,e)的c加上50，改变登录框颜色
    formatRgba(color) {
      let str = color.substring(5, color.length - 1);
      let arr = str.split(",");
      this.colorArr = arr;
      this.colorArr[2] = (this.colorArr[2] * 1 + 50 * 1).toString();
      if (this.colorArr[2] * 1 > 255) {
        this.colorArr[2] = (this.colorArr[2] - 255).toString();
      }
      console.log(this.colorArr);
      let colorstr = this.colorArr.join(",");
      console.log(colorstr);
      return "rgba(" + colorstr + ")";
    },
    // 重置主题色
    resetColor() {
      this.bodystyle["background-color"] = "#fff";
      this.loginstyle["background-color"] = "#fff";
      localStorage.backcolor = "#fff";
      localStorage.logincolor = "#fff";
      this.color = "#fff";
    },
    // 改变主题色
    changeColor() {
      this.logincolor = this.formatRgba(this.color);
      this.bodystyle["background-color"] = this.color;
      this.loginstyle["background-color"] = this.logincolor;
      localStorage.backcolor = this.color;
      localStorage.logincolor = this.logincolor;
    },
    // 初始化主题
    initTheme() {
      this.bodystyle["background-color"] = localStorage.backcolor;
      this.loginstyle["background-color"] = localStorage.logincolor;
      this.color = localStorage.backcolor;
      this.logincolor = localStorage.logincolor;
    }
  },
  computed: {
    ...mapGetters(["routes", "name"])
  },
  created() {
    this.initTheme();
  },
  components: {}
};
</script>

<style lang="scss">
.body-bottem {
  width: 100%;
  height: 30px;
}
.bottem-left {
  float: left;
  width: 55px;
  text-align: left;
  font-size: 16px;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  cursor: pointer;
  color: #000000;
}
.bottem-right {
  float: right;
  width: 100px;
  text-align: right;
  font-size: 16px;
  padding: 0 10px 0 0;
  box-sizing: border-box;
  cursor: pointer;
  color: #000000;
}
.bottem-left:hover {
  color: #66b1ff;
}
.bottem-right:hover {
  color: #66b1ff;
}
body {
  width: 100%;
  height: 100%;
}
.login-main {
  background: url("../../assets/img/backone.jpg") no-repeat;
  background-size: cover;
  padding: 20px;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
}

.login-title {
  margin: 0 auto;
  font-size: 23px;
  text-align: center;
  margin-top: 12px;
  box-sizing: border-box;
}
.demo-ruleForm {
  text-align: center;
  margin-top: 20px;
  box-sizing: border-box;
}
.el-color-picker__color {
  border: none;
}
.is-alpha {
  border: none;
}
.login-body {
  border-radius: 8px;
  height: 260px;
  width: 417px;
  margin: 0 auto;
  position: absolute;
  top: 20%; /*偏移*/
  left: 50%;
  transform: translateY(-20%);
  transform: translateX(-50%);
  box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
  font-size: 17px;
}
.login-body:hover {
  box-shadow: 0 2px 12px 8px rgba(0, 0, 0, 0.7);
}
.header-color {
  .title {
    float: left;
    color: #fff;
    font-size: 16px;
    line-height: 42px;
    margin-right: 17px;
    box-sizing: border-box;
  }
  .el-color-picker {
    float: left;
  }
}
.el-form-item__label {
  float: left;
}
.form-input {
  margin-left: 0;
  width: 320px;
  float: left;
}
.label /deep/ .el-form-item__label {
  color: #000000;
}
.btns /deep/ .el-form-item__content {
  margin-left: 0;
}
.el-form /deep/ .el-form-item {
  margin-bottom: 19px;
}
</style>