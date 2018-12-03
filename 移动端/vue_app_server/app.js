const express=require("express");
const pool = require("./pool");
var app = express();
// 服务器node.js 允许跨域访问配置项
//引入跨域模块
const cors= require("cors");
const bodyParser=require("body-parser");
//使用body-parser中间键
app.use(bodyParser.urlencoded({
	extended:false
}));
//配置允许哪个程序跨域访问 脚手架 
app.use(cors({
    origin:["http://127.0.0.1:2001","http://localhost:2001"],
    credentials:true
}))
app.use(express.static(__dirname+"/public"));
app.listen(3000);
//登录 成功返回ok=1  失败返回ok=0;
app.post("/login",(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var sql="select * from zp_user where uname=? and upwd=?";
    pool.query(sql,[uname,upwd],(err,result)=>{
      err&&console.log(err);
      if(result.length>0){
        res.write(JSON.stringify({ok:1}));
      }else{
        res.write(JSON.stringify({ok:0,msg:"用户名或密码错误!"}));
      }
      res.end();
    })
  })



//轮播图图片
app.get("/imagelist",(req,res)=>{
    var obj = [
        {id:1,img_url:"http://127.0.0.1:3000/img/1.jpg"},
        {id:2,img_url:"http://127.0.0.1:3000/img/2.jpg"},
        {id:3,img_url:"http://127.0.0.1:3000/img/3.jpg"},
        {id:4,img_url:"http://127.0.0.1:3000/img/4.jpg"},
        {id:5,img_url:"http://127.0.0.1:3000/img/5.jpg"},
    ];
    res.send(obj)
});
//注册 
app.post("/regist",(req,res)=>{
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    if(uname==""||upwd==""){
        res.send({code:400,msg:'用户名或者密码不能为空'});
        return;
    }
    var sql = "INSERT INTO zp_user VALUES(null,?,?)";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err)console.log(err);
        if(result.affectedRows > 0){
            res.send({code:200,msg:'注册成功'})
        }else{
            res.send({code:300,msg:'注册失败'})
        }
    });
});
//首页的拖动图片列表
app.get("/img1list",(req,res)=>{
    var sql = "SELECT * FROM zp_product WHERE kind_id = 1";
    pool.query(sql,(err,result)=>{
        console.log(result);
        res.send(result);
    })
})












//功能2： 分页
app.get("/newslist",(req,res)=>{
    //1:参数  当前页码  页大小(一页显示几行数据)
    var pno = req.query.pno;            //2
    var pageSize = req.query.pageSize;  //5
    //2:sql
    //2.1:查找总记录数->转换总页数  15->3
    var sql = "SELECT count(id) as c FROM xz_news";
    var obj = {};      //保存发送客户端数据
    var progress = 0;  //进度
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        var c = Math.ceil(result[0].c/pageSize);
        obj.pageCount = c;
        progress+=50;
        if(progress==100){
          res.send(obj);
        }
    });
    //2.2:查找当前页内容           中间5行
    var sql = " SELECT id,title,img_url,ctime,point";
       sql += " FROM xz_news";
       sql += " LIMIT ?,?";
    var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
    pageSize = parseInt(pageSize)
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err)throw err;
        //console.log(result);
        obj.data = result;
        progress+=50;
        if(progress==100){
          res.send(obj);
        }
    })
    //3:结果格式
    //res.send({code:"ok"})
  }) ;

  //功能三 发送脚手架新闻详细信息
  app.get("/newsinfo",(req,res)=>{
      var obj = {
          title:"御坂美琴",
          content:"白井黑子",
    };
    res.send(obj);
  })
  //在新闻详细组件发送ajax请求获取新闻信息，并且显示指定位置

  //功能四：用户发表评论       
  const qs = require("querystring");
  app.post("/postcomment",(req,res)=>{
      //为req对象绑定事件data 客户数据发送成功
      //触发事件
      req.on("data",(buf)=>{
          var str = buf.toString();    //将参数转换成字符串
          var obj = JSON.parse(str);    //将字符串转成js对象
          var msg = obj.msg;           //msg 评论内容
          var nid = parseInt(obj.nid);           //nid 新闻编号
          var sql = "INSERT INTO xz_comment(content,user_name,ctime,nid) VALUES(?,'匿名',now(),?)";
          pool.query(sql,[msg,nid],(err,result)=>{
              if(err) throw err;
              res.send({code:1,msg:"棒棒哒o(*￣︶￣*)o"});
          })
      })
  })

  //功能五 用户获取指定新闻编号所有评论 
  app.get("/getComment",(req,res)=>{
      //获取指定新闻编号
      var nid = parseInt(req.query.id);
        //1:参数  当前页码  页大小(一页显示几行数据)
        var pno = req.query.pno;            //2
        var pageSize = req.query.pageSize;  //5
        //2:sql
        var sql = " SELECT count(id) as c FROM xz_comment";
        sql += " WHERE nid = ?";
        var obj = {};      //保存发送客户端数据
        var progress = 0;  //进度
        pool.query(sql,[nid],(err,result)=>{
            if(err)throw err;
            var c = Math.ceil(result[0].c/pageSize);
            obj.pageCount = c;
            progress+=50;
            if(progress==100){
              res.send(obj);
            }
        });
        //2.2:查找当前页内容           中间5行
        var sql = " SELECT id,content,ctime,user_name";
            sql += " FROM xz_comment";
            sql += " WHERE nid= ?"
            sql += " ORDER BY id DESC"
            sql += " LIMIT ?,?";
        var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
        pageSize = parseInt(pageSize)
        pool.query(sql,[nid,offset,pageSize],(err,result)=>{
            if(err)throw err;
            //console.log(result);
            obj.data = result;
            progress+=50;
            if(progress==100){
              res.send(obj);
            }
        })
        //3:结果格式
        //res.send({code:"ok"})
      });
      app.get("/goodsinfo",(req,res)=>{
        var id=req.query.id;
        var obj={id:id,title:"华为2000",now:9999,old:99999,pid:"9527"};
        res.send(obj);
    });







    
    //功能七：购物车数据列表
     app.get("/shoplist", (req, res) => {
        var obj = [{ id: 1, title: "小可爱", price: "66.00", num: 1, img_url: 'http://127.0.0.1:3000/img/banner3.png' },
        { id: 2, title: "王源源", price: "88.88", num: 1, img_url: 'http://127.0.0.1:3000/img/banner1.png' },
        { id: 3, title: "源", price: "68.98", num: 1, img_url: 'http://127.0.0.1:3000/img/banner2.png' }]
        res.send(obj);
    });
    //功能八  将商品信息添加到购物车 insert into xz_cary values();
    app.get("/addCart",(req,res)=>{
        var pid= req.query.pid;
        var count = req.query.count;
        //所有用户参数都需要进行验证  js  nodejs  两次验证  程序安全   
        var reg = /^[0-9]{1,}$/;     //创建正则表达式
        if(!reg.test(pid)){         //如果验证失败了
            res.send({code:-1,msg:"商品编号参数有误"});     //输出错误信息
            return;              //返回
        }
        if(!reg.test(count)){
            res.send({code:-2,msg:"商品数量参数有误"});
            return;                                     //输出错误信息并停止
        }
        res.send({code:1,msg:"添加成功"});
    })

 /*   app.get("/login",(req,res)=>{
        var uname = req.query.uname;
        var upwd = req.query.upwd;
        var sql = "SELECT count(id) as c FROM xz_user2";
        sql +=" WHERE uname=? AND upwd = md5(?)";
        pool.query(sql,[uname,upwd],(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })*/
    app.get("/navlist",(req,res)=>{
	var  nav = [{ img: "http://127.0.0.1:3000/img/icons/grid-01.png", title: "装修" },
    { img: "http://127.0.0.1:3000/img/icons/grid-02.png", title: "美食" },
    { img: "http://127.0.0.1:3000/img/icons/grid-03.png", title: "洗浴" },
    { img: "http://127.0.0.1:3000/img/icons/grid-04.png", title: "结婚" },
    { img: "http://127.0.0.1:3000/img/icons/grid-05.png", title: "娱乐" },
    { img: "http://127.0.0.1:3000/img/icons/grid-06.png", title: "工作" },
    { img: "http://127.0.0.1:3000/img/icons/grid-07.png", title: "学习" },
    { img: "http://127.0.0.1:3000/img/icons/grid-08.png", title: "洗车" },
    { img: "http://127.0.0.1:3000/img/icons/grid-09.png", title: "租房" }]
		res.send(nav);
    })
    app.get("/shoplist", (req, res) => {
    var obj = [{ id: 1, title: "小可爱", price: "66.00", num: 1, img_url: 'http://127.0.0.1:3000/img/bzhan.jpg' },
    { id: 2, title: "王源源", price: "88.88", num: 1, img_url: 'http://127.0.0.1:3000/img/banner1.png' },
    { id: 3, title: "源", price: "68.98", num: 1, img_url: 'http://127.0.0.1:3000/img/banner2.png' }]
    res.send(obj);
    });
    app.get("/profile",(req,res)=>{
	var img=[{img:"http://127.0.0.1:3000/img/images/avatar.png"}]
		res.send(img);
    });
	app.post("/postProduct",(req,res)=>{
	  req.on("data",(buff)=>{
	    var obj = qs.parse(buff.toString());
		var pno = obj.pno;
		var price = obj.price;
		res.send({code:1,msg:":"+pno+":"+price});
	  });
	});