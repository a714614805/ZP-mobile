<template>
    <div class="shop-container">
        <div class="fill-head">
            <span class="little-icon" @click="jumphome()"></span>
            <span class="fill-return" @click="jumphome()">返回</span>
            <span class="fill-login">购物车</span>
        </div>
        <div class="goods-top">
            <span>已满足满59元包邮</span>
            <a>编辑</a>
        </div>
        <div class="goods-list">
            <div class="good-list clearfix" v-for="(item,i) in productlist" :key="item.id">
                <div class="left-checkbox">
                    <p @click="active(i)" :class="{'active':item.show===true}"></p>
                </div>
                <div class="right-info" >
                    <div class="pro-img">
                        <a href="">
                            <img :src="item.src">
                        </a>
                    </div>
                    <div class="pro-detail">
                        <a href="">
                            <span>{{item.title}}</span>
                        </a>
                        <div class="pro-group">
                            <span class="pro-deprice">￥ <span>{{item.price}}</span></span>
                            <span class="pro-number clearfix">
                                <span class="pro-reduce" @click="reduce(i)">-</span>
                                <input type="tel" v-model="item.num">
                                <span class="pro-increase" @click="increase(i)">+</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shop-bottom">
            <div class="left-checkbox">
                <p @click="activeAll()" :class="{'active':selectedAll}"></p>
            </div>
            <span class="chocken">已选(<span>{{getCount}}</span>)</span>
            <span class="chocken-price">￥ <span>{{getSum}}</span></span>
            <button class="gocount">去结算</button>
        </div>
        <nav-bottom></nav-bottom>
    </div>
</template>
<script>
import bottom from "../tabbar/bottom.vue"
export default {
    data(){return{
        productlist:[],
        pricesum:0
    }},
    methods:{
        getList(){
             this.productlist=[{id:"1",src:"http://127.0.0.1:3000/img/cq1.jpg",title:"玻璃茶具 盖碗",price:72,show:true,num:2},
             {id:"2",src:"http://127.0.0.1:3000/img/cq2.jpg",title:"玻璃茶具 盖碗",price:100,show:false,num:1}];
        },
        jumphome(){
            this.$router.push("/home");
        },
        active(i){
            this.productlist[i].show = !this.productlist[i].show;
        },
        reduce(i){
            if(this.productlist[i].num>1)
            this.productlist[i].num--;
        },
        increase(i){
            this.productlist[i].num++;
        },
        activeAll(){
            var isSelectedAll=this.selectedAll;
            for(var p of this.productlist){
                p.show=!isSelectedAll;
            }
        }
    },
    created(){
        this.getList();
    },
    components:{
    "nav-bottom" : bottom
    },
    computed:{
        getSum(){
            var sum=0;
            for(var p of this.productlist){
                if(p.show){
                    sum+=p.price*p.num;
                }
            }
            return sum;
        },
        getCount(){
             var sum=0;
            for(var p of this.productlist){
                if(p.show){
                    sum+=p.num;
                }
            }
            return sum;
        },
        getSelectedNum(){
             var sum=0;
            for(var p of this.productlist){
                if(p.show){
                    sum++;
                }
            }
            return sum;
        },
        
        selectedAll(){
            return this.getSelectedNum == this.productlist.length;
        }
    }
}
</script>
<style>
    .goods-top{
        width:100%;
        padding:.8rem;
    }
    div.shop-container div.goods-top:nth-child(2) span{
        color:#999999;
        font-size:10px;
    }
    div.shop-container div.goods-top:nth-child(2) a{
        color:black;
        font-size: 16px;
        float:right;
    }
    div.shop-container div.goods-list div.good-list{
        display:flex;
        align-items: center;
    }
    div.right-info div.pro-img{
        display: inline-block;
        margin-left:26px;
    }
    div.right-info div.pro-img a img{
        width:80px;
        height:80px;
    }
    .left-checkbox p{
        background: url(../../public/cart-check.png) no-repeat;
        background-size: 100%;
        height:20px;
        width:20px;
    }
    .left-checkbox p.active{
        background:url(../../public/cart-checked.png) no-repeat;
        background-size: 100%;
    }
    .left-checkbox{
        display: inline-block;
        margin-left:18px;
    }
    .right-info{
        display: inline-block;
    }
    div.pro-group span.pro-number input{
        height:30px;
        width:35px;
        padding:0 0 0 10px;
    }
    div.right-info div.pro-detail{
        float:right;
        margin-left:14px;
    }
    div.right-info div.pro-detail>a>span{
        font-size:15px;
        color:#333;
    }
    div.right-info div.pro-detail div.pro-group{
        margin-top:20px;
    }
    div.right-info div.pro-detail div.pro-group span.pro-deprice{
        color:#666;
        font-size:12px;
    }
    div.right-info div.pro-detail div.pro-group span.pro-number{
        display: inline;
        margin-left:90px;
    }
    div.pro-group span.pro-number span.pro-reduce,div.pro-group span.pro-number span.pro-increase{
    display: inline-block;
    width: 25px;
    border: 1px solid #999;
    text-align: center;
    height: 30px;
    padding: 3px;
    }
    div.shop-bottom{
        width:100%;
        height:50px;
        position: fixed;
        bottom:51px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .chocken{
        display: inline;
        font-size:15px;
    }
    button.gocount{
    width: 140px;
    height:50px;
    background-color: #ff3600;
    color: white;
    }
    span.chocken-price,span.chocken-price span{
        color:#c00000;
    }
</style>