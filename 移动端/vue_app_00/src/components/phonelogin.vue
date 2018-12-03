<template>
    <div class="phone-contain">
        <div class="show-fill">
            <div class="fill-head">
            <span class="little-icon" @click="jumphome()"></span>
            <span class="fill-return" @click="jumphome()">返回</span>
            <span class="fill-phonelogin">账户登录</span>
          </div>
          <div class="logo">
            <router-link to="/home">
              <img src="../img/V7_logo.png" alt="">
            </router-link>
          </div>
          <div class="login-title">
            <div class="lo-titlecontainer">
              <router-link to="/home/login"><span>密码登录</span></router-link>
              <span class="message-login">短信登录</span>
            </div>
          </div>
          <div class="inputs-main">
              <input type="text" placeholder="手机号码/邮箱" class="uname">
              <input type="text" placeholder="短信验证码" class="msg-reg">
              <button class="gettxt">获取短信验证码</button>
              <button class="login-button">登录</button>
          </div>
          <div class="regist-rightnow" @click="jumpregist()">立即注册</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){return{}},
    methods:{
        jumphome(){
            this.$router.push("/home");
        },
        jumpregist(){
            this.$router.push("/home/regist");
        }
    }
}
</script>
<style>
    .message-login{
        border-bottom: 2px solid red;
    }
    .gettxt{
        width:40%;
        height:2.5rem;
        margin-left:2rem;
    }
    .inputs-main input.msg-reg{
        width:50%;
    }
    .inputs-main{
        padding:0 1rem;
    }
    .regist-rightnow{
        margin-left:2rem;
        margin-top:1rem;
    }
</style>