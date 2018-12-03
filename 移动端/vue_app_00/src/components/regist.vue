<template>
    <div class="regist-contain">
        <div class="fill-head">
            <span class="little-icon" @click="jumphome()"></span>
            <span class="fill-return" @click="jumphome()">返回</span>
            <span class="fill-login">用户注册</span>
        </div>
        <div class="regist-give">
            <img src="../img/regist.png" alt="">
            <span class="jifen">注册即送<span class="five-han">500</span>醉品茶城积分</span>
        </div>
        <div class="regist-inputs">
            <input type="text" placeholder="手机号码" v-model="uname">
            <input type="text" placeholder="短信验证码" class="regist-message">
            <button class="regist-getmessage">获取短信验证码</button>
            <input type="password" placeholder="请设置1-16位登录密码" v-model="upwd" class="regist-setpassword">
            <button class="regist-now" @click="regist()">立即注册</button>
        </div>
        <div class="regist-after">
            <span class="ra-text">点击
                <a href="" class="ra-registnow">立即注册</a>即表示您同意醉品
                <a class="ra-registtext">用户协议</a>和
                <a class="ra-registtext">隐私政策</a>
            </span>
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
        jumphome(){
            this.$router.push("/home");
        },
        regist(){
            this.$http.post("http://localhost:3000/regist",{
            uname:this.uname,upwd:this.upwd
            }).then(res=>{
                this.$toast(res.data.msg);
            })
        },
    },
}
</script>
<style>
    .regist-give img{
        height:1.5rem;
        margin:1rem;
    }
    .jifen{
        position:relative;
        top:-19px;
        color:#999;
    }
    .five-han{
        color:orangered;
    }
    .regist-inputs{
        padding:0px 20px 20px 20px;
    }
    div.regist-inputs .regist-message{
        width:51%;
    }
    button.regist-getmessage{
        width:39%;
        height:40px;
        margin-left:26px;
    }
    button.regist-now{
        width:100%;
        height:38px;
    }
    span.ra-text{
        color:#999;
        font-size:12px;
    }
    div.regist-after{
        padding-left:20px;
    }
    span.ra-text a.ra-registnow{
        color:#999;
        margin:0 1px;
    }
    span.ra-text a.ra-registtext{
        color:red;
        margin:0 1px;
    }
    .regist-setpassword{
      border:1px solid #e0e0e0 !important;
      color:#adadad !important;
      height:47px !important;
    }
</style>
