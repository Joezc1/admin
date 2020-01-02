<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <input v-model="text" type="text"/>
    <el-button @click="save">点击我访问接口</el-button>


  <el-upload
  class="avatar-uploader"
  :action="$http.defaults.baseURL+'/upload'"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data(){
    return {
      imageUrl: '',
      text: '',
      reqdate: {}
    }
  },
  methods:{
    async save(){
    this.reqdate.name = this.text
      await this.$http.get('categories/1')
    },
    // save(){
    //   this.reqdate.name = this.text
    //   this.$http.post('categories',this.reqdate).then(res=>{
    //     console.log(res)
    //   })
    // }
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        debugger
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
</style>