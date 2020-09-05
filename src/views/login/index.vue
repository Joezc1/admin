<template>
  <div class="login-main">
    <!-- <div class="stars" ref="stars"></div> -->
    <!--背景层，不要删除，不然没有作用-->
    <!-- <div class="img-wrap"> -->
    <!-- <div class="login-header">
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
    </div>-->
    <div class="login-body">
      <h6 class="login-title">Login</h6>
      <div class="body-two">
        <div class="username clearfix">
          <img class="username-img" src="../../assets/img/kehu.png" alt />
          <input v-model="ruleForm.username" class="username-input" type="text" placeholder="username" />
        </div>
        <div class="password clearfix">
          <img class="password-img" src="../../assets/img/quanxian.png" alt />
          <input
            v-model="ruleForm.password"
            type="password"
            class="password-input"
            placeholder="password"
          />
        </div>
      </div>
      <div class="body-three">
        <button type="button" ref="login" @click="login" class="login-btn">Login</button>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters, mapMutations, mapActions } from "vuex";
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
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
    ...mapActions(["Login"]),
    login() {
      let username = /^[a-zA-Z]{4,16}$/;
      let password = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?]).*$/;
      // alert(this.ruleForm.name)
      if (this.ruleForm.username == "" && this.ruleForm.username.length == 0) {
        this.$message.warning("请输入用户名");
      } else if (
        this.ruleForm.password.trim() == "" &&
        this.ruleForm.password.length == 0
      ) {
        this.$message.warning("请输入密码");
      }else if (!password.test(this.ruleForm.password)) {
        const h = this.$createElement;
        this.$notify({
          title: "提示信息",
          message: h(
            "i",
            { style: "color: teal" },
            "最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符@#$%^&*?"
          )
        });
      } else {
        let list = [];
        localStorage.setItem("tags", JSON.stringify(list));
        sessionStorage.menuindex = "1-1";
        this.$store.dispatch("Login", this.ruleForm).then((res, msg) => {
          console.log("打印login结果");
          console.log(res);
          if (res) {
            this.$router.push({
              name: "dashboard"
            });
          } else {
            return false;
          }
        });
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // localStorage.removeItem('tags')
          let list = [];
          localStorage.setItem("tags", JSON.stringify(list));
          sessionStorage.menuindex = "1-1";
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
    // this.initTheme();
  },
  mounted() {
    let that = this
  //  document.addEventListener('keydown', (e) => {
  //    if(e.keyCode==13){
  //      that.login()
  //    }
  //     console.log(e.keyCode)
  //     // 下面可以通过keyCode来添加键盘事件
  //  })    
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import url("../../assets/css/stars.css");

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
  font-size: 36px;
  color: #ffffff;
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
  background: #fff;
  height: 40%;
  width: 40%;
  margin: 0 auto;
  position: absolute;
  top: 20%; /*偏移*/
  left: 50%;
  transform: translateY(-20%);
  transform: translateX(-50%);
  box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.3);
  // opacity: 0.5;
  font-size: 17px;
  .body-two {
    width: 100%;
    .username {
      padding: 20px 15% 0 15%;
      box-sizing: border-box;
      width: 100%;
      .username-img {
        width: 30px;
        float: left;
        height: 30px;
      }
      .username-input {
        float: left;
        border: none;
        background: #ffffff00;
        border-bottom: 2px solid #fff;
        color: #000000;
        width: 86%;
        font-size: 25px;
        line-height: 26px;
        margin-left: 8px;
      }
      // .username-input::placeholder{
      //   color: #ffffff;
      // }
    }
    .password {
      padding: 20px 15% 0 15%;
      box-sizing: border-box;
      width: 100%;
      .password-img {
        float: left;
        width: 30px;
        height: 30px;
      }
      .password-input {
        color: #000000;
        width: 86%;
        font-size: 25px;
        line-height: 26px;
        float: left;
        border: none;
        background: #ffffff00;
        border-bottom: 2px solid #fff;
        margin-left: 8px;
      }
      // .password-input:focus{
      //   border: 1px solid #000000;
      // }
    }
  }
  .body-three {
    text-align: center;
    width: 100%;
    margin-top: 20px;
    .login-btn {
      width: 63%;
      font-size: 23px;
      border: none;
      border-radius: 19px;
      color: #fff;
      background-image: linear-gradient(to right, #db3125 0%, #578bc3 100%);
      height: 40px;
    }
  }
}
.login-body:hover {
  // box-shadow: 0 2px 12px 8px rgba(0, 0, 0, 0.7);
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