<template>
    <div class="app-nav">
    <nav class="mui-bar mui-bar-tab">
       <router-link class="mui-tab-item" to="/home">
          <a id="icon-home"><span class="mui-icon mui-icon-home"></span></a>
          <div class="mui-tab-label">首页</div>
       </router-link>
       <a class="mui-tab-item">
          <span class="mui-icon-extra mui-icon mui-icon-extra-class"></span>
          <div class="mui-tab-label">分类</div>
       </a>
       <router-link class="mui-tab-item" to="/home/shopcart">
          <span class="mui-icon-extra mui-icon-extra-cart mui-icon"></span>
          <div class="mui-tab-label">购物车</div>
       </router-link>
       <router-link class="mui-tab-item" to="/home/login">
          <a id="icon-person"><span class="mui-icon mui-icon-person"></span></a>
          <div class="mui-tab-label">我的</div>
       </router-link>
    </nav>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.app-nav{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
}

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
span{
   color:black;
}
nav .mui-tab-label{
   font-size:0.2667rem;
}
</style>
