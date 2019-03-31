let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Notices = require('../models/notices');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/Campus_Payment',{ useNewUrlParser: true });
// mongoose.connect('mongodb://root:123456@127.0.0.1:27017/park');

mongoose.connection.on('connected', function() {
    console.log('MongoDB connected success.');
});

mongoose.connection.on('error', function() {
    console.log('MongoDB connected fail.');
});

mongoose.connection.on('disconnected', function() {
    console.log('MongoDB connected disconnected.');
});

//判断级别 grade只能为 0 或者 1
function userGrade(grade){
    if(Number.parseInt(grade)==0){
        return User;
    }else if(Number.parseInt(grade)==1){
        return Woker;
    }
}
router.post("/", function(req, res, next){
    // res.send('Hello, notices list.');
    Notices.find({userId:req.body.userId, userType:req.body.userType}, function(err, doc){
        if(doc.length === 0) {
            console.log(Notices.find())
            res.json({
                status: '1',
                msg: "该用户不存在！",
            });
        } else if (doc[0].pwd !== req.body.pwd) {
            console.log(typeof req.body.pwd)
            console.log(typeof doc[0].pwd)
            res.json({
                status:'1',
                msg: '密码错误！',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        } else if(doc[0].pwd === req.body.pwd){
            req.session.userId=doc[0].userId;
            req.session.userType=Number.parseInt(doc[0].userType);
            req.session.userName=doc[0].userName ||'';
            console.log(req.session)
            res.json({
                status:'0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
        /*else {
            res.json({
                status:'0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }*/
    });
});
//检测是否登录
router.get("/checkLogin", function (req,res,next) {
    if(req.session.userId){
        res.json({
            status:'0',
            msg:'已登录',
            result:{
                // userName:req.session.userName==='undefined'?'':req.session.userName,
                userId:req.session.userId,
                userType:req.session.userType
                // grade:Number.parseInt(req.session.grade)
            }
        });
    }else{
        res.json({
            status:'1',
            msg:'未登录',
            result:''
        });
        res.send('未登录');
    }
});

// 退出
router.post("/logout", function (req,res,next) {
    console.log(req)
    Notices.find({userId: req.body.userId, userType: req.body.userType}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '退出失败',
                result: ''
            });
        } else {
            req.session.userId = null;
            req.session.grade = null;
            req.session.userName = null;
            res.json({
                status: '0',
                msg: '退出成功',
                result: {
                    // userName:req.session.userName==='undefined'?'':req.session.userName,
                    userId: req.session.userId,
                    // grade:Number.parseInt(req.session.grade)
                }
            });
        }

    })
})
//退出
/*router.post("/logout", function (req,res,next) {
    res.send('未登录');
    /!*if(req.session.userId){
        res.json({
            status:'0',
            msg:'',
            result:{
                // userName:req.session.userName==='undefined'?'':req.session.userName,
                userId:req.session.userId,
                // grade:Number.parseInt(req.session.grade)
            }
        });
    }else{
        res.json({
            status:'1',
            msg:'未登录',
            result:''
        });
        res.send('未登录');
    }*!/
});*/
/*router.post("/logout", function (req,res,next) {
    res.send('退出');
    // let Who = userGrade(req.session.userType);
    /!*let Who = userGrade(req.session.userType);
    Who.findOne({userId:req.session.userId},(err,doc)=>{
        if(err){
            errTip(res);
        }else{
            // doc.lastLoginTime=doc.loginTime; //退出时把本次登录时间赋值上次登录时间
            doc.save((err1, res1)=> {
                if (err1) {
                    errTip(res);
                }
                else {
                    req.session.userId=null;
                    req.session.grade=null;
                    req.session.userName=null;
                    res.json({
                        status:"0",
                        msg:'',
                        result:''
                    })
                }
            });
        }
    });*!/
});*/
module.exports = router;
