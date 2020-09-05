<template>
    <div class="main">
        <img src="../../assets/img/404.jpg"/>
        <el-button icon="el-icon-right" @click="backHome">home</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    methods:{
        backHome(){
            this.$router.push({
                name: 'dashboard'
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.main{
    display: flex;
    padding:0 20% 0 20%;
    width: 100%;
    box-sizing: border-box;
    img{
        width: 80%;
    }
}
</style>