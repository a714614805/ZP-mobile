<template>
    <div class="login-contain">
        <div class="show_fill">
          <div class="fill-head">
            <span class="little-icon" @click="jumphome()"></span>
            <span class="fill-return" @click="jumphome()">返回</span>
            <span class="fill-login">账户登录</span>
          </div>
          <div class="logo">
            <router-link to="/home">
              <img src="../img/V7_logo.png" alt="">
            </router-link>
          </div>
          <div class="login-title">
            <div class="lo-titlecontainer">
              <span class="pwd-login">密码登录</span>
              <router-link to="/home/phonelogin"><span>短信登录</span></router-link>
            </div>
          </div>
          <div class="inputs-contain">
            <input type="text" placeholder="手机号码/邮箱" v-model="uname">
            <input type="password" placeholder="登录密码" v-model="upwd">
            <button class="login-button" @click="loginRightNow()">立即登录</button>
          </div>
          <div class="inputs-bottom">
            <span @click="jumpregist()">立即注册</span>
            <span>忘记密码</span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){return{
      uname:"",
      upwd:"",
    }},
    methods:{
      //编程式跳转
      jumphome(){
        this.$router.push("/home");
      },
      jumpregist(){
        this.$router.push("/home/regist");
      },
      loginRightNow(){
        this.$http.post("http://localhost:3000/login",{
          uname:this.uname,upwd:this.upwd
        }).then(res=>{
          if(res.data.ok==1){
            this.$router.push("/home");
          }else{
            alert(res.data.msg);
          }
        })
      }
    }
}
</script>
<style>
.login-contain div.show-fill{
  position:fixed;
}
.fill-head{
  width:100%;
  background-color: #1b1b20;
  height:2.6rem;
}
.little-icon::after{
    position:absolute;
    top: 13px;
    left: 15px;
    content: "";
    height: 12px;
    width: 12px;
    border-top: 1px solid white;
    border-left: 1px solid white;
    transform: rotate(-45deg);
}
.fill-return{
  color:white;
  font-size: 14px;
  position:absolute;
  top:10px;
  left:28px;
}
.fill-phonelogin{
  color:white;
  font-size:20px;
  position:absolute;
  top:5%;
  left:38%;
}
.fill-login{
  color:white;
  font-size:20px;
  position:absolute;
  top:2%;
  left:38%;
}
.logo{
  margin:.8rem 0 .8rem;
  display: flex;
  justify-content: center;
}
.logo a{
  display:flex;
  justify-content: center;
}
.logo a img{
  width:56%;
  height:100%;
}
.login-title{
  padding:1rem 3rem 1rem 3rem;
}
.lo-titlecontainer{
  display: flex;
  justify-content:space-around;
}
.lo-titlecontainer span{
  line-height: 35px;
}
.pwd-login{
  border-bottom: 2px solid red;
}
.inputs-contain{
  padding: 0rem 1rem 2rem 1rem;
}
.login-button{
  width:100%;
  height:2.5rem;
}
.inputs-bottom{
  display: flex;
  justify-content: space-between;
  padding:0 1rem;
}
</style>