<template>
    <div class="app">
			<header class="mui-bar mui-bar-nav">
        <div class="show_fill" v-show="ww">
          <div class="fill-head">
            <span class="little-icon" @click="showfill"></span>
            <span class="fill-return" @click="showfill">返回</span>
            <span class="fill-search">搜索</span>
          </div>
          <div class="fill-input">
            <span class="fillinput-before" @click="showfill">X</span>
            <input type="text" placeholder="搜索您想要的产品" class="input-main">
            <span class="mui-icon mui-icon-search fillinput-after"></span>
          </div>
          <div class="fill-hotsearch">
            <div class="hot-search-top">热门搜索</div>
            <a>白茶</a>
            <a>2018明前茶</a>
            <a>单枞</a>
            <a>龙井</a>
            <a>2018春茶</a>
            <a>大红袍</a>
            <a>普洱</a>
            <a>金骏眉</a>
          </div>
        </div>
				<img src="../img/zp_logo.png" alt="" v-show="!ww">
				<div class="mui-input-row" v-show="!ww">
					<a><span class="mui-icon mui-icon-search"></span></a>
					<input type="text" placeholder="金骏眉" @click="showfill()">
				</div>
			</header>
			<div class="contain" v-show="!ww">
          <mt-swipe  :auto="4000">
            <mt-swipe-item v-for="item in imagelist" :key="item.id">
              <img :src="item.img_url" />
            </mt-swipe-item>
          </mt-swipe>
          <div class="fousp">
            <img src="../img/index-services.png" alt="">
          </div>
          <div class="zp-tt nwwest-roll">
            <span>醉品</span><span class="ps">头条</span>
            <ul id="roll-ul" class="clearfix">
              <li v-for="item in list" :key="item.id" ref="rollul" :class="{anim:animate==true}" class="clearfix">
                <span class="name">{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="after-title clearfix">
            <a href="" class="at-item clearfix">
              <div class="at-item-icon"><img src="../img/cbt_ic_pp.png" alt=""></div>
              <div class="at-item-text">品牌集成</div>
            </a>
            <a href="" class="at-item clearfix">
              <div class="at-item-icon"><img src="../img/cbt_ic_ds.png" alt=""></div>
              <div class="at-item-text">大师名匠</div>
            </a>
            <a href="" class="at-item clearfix">
              <div class="at-item-icon"><img src="../img/cbt_ic_cl.png" alt=""></div>
              <div class="at-item-text">茶礼定制</div>
            </a>
            <a href="" class="at-item clearfix">
              <div class="at-item-icon"><img src="../img/cbt_ic_zp.png" alt=""></div>
              <div class="at-item-text">醉品茶集</div>
            </a>
            <a href="" class="at-item clearfix">
              <div class="at-item-icon"><img src="../img/cbt_ic_jf.png" alt=""></div>
              <div class="at-item-text">积分商城</div>
            </a>
          </div>
          <div class="on-time-special">
            <img src="../img/special.png" alt="">
            <span class="clearfix on-time">限时</span>
            <span class="on-time-price">特价</span>
            <div class="end-time-count clearfix">
              <span class="end-left">距结束:</span>
              <span class="end-time">{{time}}</span>
            </div>
          </div>
          <div class="on-time-swipe">
            <ul class="on-ts-ul">
              <li v-for="item in img1list" :key="item.id" class="on-ts-li">
                <img :src="item.iurl" alt="" class="on-ts-img">
                <p class="on-ts-p">{{item.title}}</p>
                <span class="on-ts-span">￥ <span>{{item.price}}</span></span>
              </li>
            </ul>
          </div>
          <div class="find-channel">
            <div class="worry"></div>
            <a class="find-good-tea">
              <img src="../img/zp_ziyin_n.jpg" alt=""></a>
            <a href="" class="tea-channel">
              <img src="../img/zp_songli_n.jpg" alt="">
            </a>
          </div>
			</div>
      <nav-bottom></nav-bottom>
    </div>
</template>
<script>
import bottom from "../tabbar/bottom.vue"
export default {
  data() {
    return {
    end: new Date("2019/11/11 11:11:11"),
	  now: new Date(),
    timer:null,
    list:[{name:"为了更深入探讨茶业新零售未来的发展态势，醉品茶集开展了为期两天的“茶业新零售圆桌会议暨茶商游学之旅”，邀请醉品茶集优秀合作伙伴共同参与"},{name:"为大力推广安化黑茶，醉品茶集线下免费饮，醉品茶城线上优惠购"},{name:"中国是茶的故乡,《茶经》有云：“茶之为饮，发乎神农氏，文娱鲁周公.”茶叶深深融入中国人生活，成为传承中华文化的重要载体。从古代丝绸之路、茶马古道、茶船古道，到今天丝绸之路经济带、21世纪海上丝绸之路."}],
    animate:null,
    ww:false,
    imagelist:[],
    timer2:null,
    timer3:null,
    img1list:[],
    }
  },
  methods: {
    getTime(val) {
      var s=parseInt(val/1000);
        if (s>0){
          var d=parseInt(s/3600/24);
          if(d<10) d="0"+d;
          var h=parseInt(s%(3600*24)/3600);
          if(h<10) h="0"+h;
          var m=parseInt(s%3600/60);
          if(m<10) m="0"+m;
          s%=60;
          if(s<10) s="0"+s;
          return d+"天"+h+"小时"+m+"分"+s+"秒";
        }else{
          clearInterval(this.timer);
          return "秒杀结束！";
        }
    },
    scroll(){
        var con1 = this.$refs.rollul;
        con1[0].style.marginTop='30px';
        this.animate=!this.animate;
        var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
        this.timer3 = setTimeout(function(){
            that.list.push(that.list[0]);
            that.list.shift();
            con1[0].style.marginTop='0px';
            that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        },300)
    },
    showfill(){
      this.ww = !this.ww;
    },
    getimagelist(){
      var url = "http://127.0.0.1:3000/imagelist";
      this.$http.get(url).then(result=>{
        this.imagelist = result.body;
      })
    },
    getimg1list(){
      var url = "http://127.0.0.1:3000/img1list";
      this.$http.get(url).then(result=>{
        this.img1list = result.body.slice(0,5);
      })
    }
  },
  computed: {
    time() {
      if(this.end - this.now<=0){
        clearInterval(this.timer);
        return "结束";
      }
      return this.getTime(this.end - this.now);
    }
  },
  created(){
    this.timer2 = setInterval(this.scroll,2500);
    this.getimagelist();
    this.getimg1list();
  },
  mounted: function() {
    this.timer=setInterval(() => {
      this.now = new Date();
    }, 1000);
  },
  components:{
    "nav-bottom" : bottom
  },
  beforeDestroy(){
    clearInterval(this.timer2);
    clearInterval(this.timer3);
     this.timer2 =  null;
     this.timer3 = null;
  },
};
</script>
<style>
.app {
  background-color: #f4f4f4;
}
header {
   padding:0 !important;
   position: relative;
}
.app header > img {
  height: 95%;
}
header.mui-bar .mui-input-row {
  width: 60%;
  margin-left: 10px;
  position: absolute;
  right: 6px;
  top: 6px;
  background-color: #ccc;
  height: 30px;
}
header.mui-bar .mui-input-row input {
  border: 0;
  height: 35px;
  position: absolute;
  top: 0px;
  background-color: #ccc;
}
.mui-input-row a {
  position: relative;
  left: 6px;
  bottom: 6px;
}
div.mint-swipe {
  height: 200px;
}
.mint-swipe img {
  width: 100%;
}
.fousp img {
  height: 40px;
  width: 100%;
}
.contain {
  background-color: white;
}
/*醉品头条下方四个选择*/
div.after-title {
  margin-top: 5px;
  background-color: white;
}
.at-item {
  float: left;
  width: 20%;
  height: 75px;
  padding-left: 10px;
}
.at-item-text {
  font-size: 12px;
  color: #666;
}
.at-item-icon img {
  width: 3rem;
  height: 3rem;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
/*限时特价*/
.on-time-special {
  width: 100%;
  height: 25px;
  margin-top: 10px;
}
.on-time-special img {
  float: left;
}
.on-time {
  float: left;
  font-style: italic;
}
.on-time-price {
  font-style: italic;
  color: orangered;
}
.end-time-count{
	float:right;
	font-size: 13px;
	margin-right:20px;
}
.on-ts-ul{
    overflow-x: auto;
    height:216px;
    overflow-y: hidden;
    white-space: nowrap;
    padding-left: 14px;
}
.on-ts-li{
  width:130px;
  height:181px;
  display: inline-block;
  margin-right:14px;
  text-align: center;
}
.on-ts-img{
  width:120px;
  height:120px;
}
.on-ts-p{
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size:10px;
  color:#333;
  overflow: hidden;
}
.on-ts-span,.on-ts-span span{
  color:#c00000;
  font-size: 16px;
}
/*醉品头条*/
.nwwest-roll {
     padding-left:15px;
     height:22px;
     overflow-y:hidden;
     transition: all 0.5s;
}
#roll-ul{
    margin:0;
    width: 290px;
    float: right;
    padding-left: 20px;
    overflow-x: hidden;
}
div.nwwest-roll #roll-ul li{
    height: 35px;
    line-height: 25px;
    text-overflow: ellipsis;
    width:270px;
}
.nwwest-roll li span{
  color:#666;
  font-size: 11px;
  white-space: nowrap;
}
.anim{
    transition: all 0.5s;
}
li{
    list-style: none;
}
.ps::after{
content: '';
    width: 0;
    height: 0;
    border-top: 4px solid #ff3700;
    border-left: 2px solid transparent;
    position: absolute;
    top: 0;
    left: -2px;
}
.ps{
    background-color: #ff3700;
    line-height: .36rem;
    color: #fff;
    font-size:16px;
}
/******************************点击input框出现的界面*******************************/
.show-fill{
  position:fixed;
  width:100%;
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
.fill-search{
  color:white;
  font-size:20px;
  position:absolute;
  top:28%;
  left:44%;
}
.fill-input{
  height:42px;
  border-bottom: 1px solid #ccc;
}
div.show_fill{
  transition: all 03s;
}
div.show_fill .fill-input .input-main{
  height:1.8rem;
  width:72%;
  margin-top:.4rem;
  border-radius:6px;
  margin-left: 44px;
  font-size: 13px;
}
.fillinput-before{
  position: absolute;
  left:16px;
  top:50px;
  color:#999;
}
div.show_fill .fill-input .fillinput-after{
  position:absolute;
  right:72px;
  top:49px;
  border-left: 1px solid #ccc;
  padding:2px 10px 2px 10px;
}
.fill-hotsearch{
  height:583px;
  padding:10px 10px 0px 10px;
  background-color: white;
}
.hot-search-top{
  padding:10px 20px 20px 20px;
  color:#666;
  border-bottom: #666;
}
.show_fill .fill-hotsearch a{
  display: block;
  float:left;
  background-color: #f5f5f5;
  color:#333;
  padding:7px;
  font-size:11px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right:16px;
  line-height:15px;
  margin-bottom:15px;
} 
.find-channel{
  display: flex;
  justify-content: space-between;
  padding: 9px;
  position:relative;
  margin-top:-28px;
}
.worry{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 38px;
    top: -21px;
    z-index: 999;
    left: 0;
    background-color: white;
}
.find-good-tea img,.tea-channel img{
  width:100%;
  display: block;
}
.find-good-tea{
  margin-right:10px;
}
</style>