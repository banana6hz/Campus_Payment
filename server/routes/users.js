let express = require('express');
let router = express.Router();
let User = require('../models/user');
let AES = require('aes-js');
function errTip(res,errmsg=err.message){
    res.json({
      status:"1",
      msg:errmsg,
      result:''
    });
}
//判断级别 grade只能为 0 或者 1
function userGrade(userType){
    if(Number.parseInt(userType)===0){
        return User;
    }else if(Number.parseInt(userType)===1){
        return Woker;
    }
}
router.post("/", function(req, res, next){
    console.log(111)
});
// 登录
router.post("/login", function(req, res, next){
    User.find({userId:req.body.userId, userType:req.body.userType}, function(err, doc){
        if(doc.length === 0) {
            res.json({
                status: '1',
                msg: "该用户不存在！",
            });
        } else if (doc[0].pwd !== req.body.pwd) {
            console.log(doc[0].pwd, req.body.pwd)
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
            req.session.userPhone=doc[0].userPhone;
            req.session.userType=Number.parseInt(doc[0].userType);
            req.session.userName=doc[0].userName ||'';
            res.json({
                status:'0',
                msg: '登录成功!',
                result: {
                    userId:req.session.userId,
                    userType:req.session.userType,
                    userName: req.session.userName,
                    list: req.session
                }
            })
        }
        else {
            res.json({
                status:'0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
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
                userType:req.session.userType,
                userName: req.session.userName,
                list: req.session
                // grade:Number.parseInt(req.session.grade)
            }
        });
    }else{
        res.json({
            status:'1',
            msg:'未登录',
            result:{
                list: req.session
            }
        });
    }
});

// 退出
router.post("/logout", function (req,res,next) {
    User.find({userId: req.body.userId, userType: req.body.userType}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '退出失败',
                result: req.session
            });
        } else {
            req.session.destroy(() => {
                res.json({
                    status: '0',
                    msg: '退出成功',
                    result: {
                        // userName:req.session.userName==='undefined'?'':req.session.userName,
                        userId: req.session
                        // grade:Number.parseInt(req.session.grade)
                    }
                });
            });
        }
        //console.log('退出', req.session)

    })
})

// 获取用户信息
router.get('/userInformation', function(req, res, next){
    User.find({userId: req.session.userId},function(err, doc) {
        if (doc.length !==0 ) {
            res.json({
                status: '0',
                msg: '查找成功',
                result: doc[0]
            })
        } else {
            res.json({
                status: '1',
                msg: '长时间未登录，请重新登录！',
                result: req.session
            })
        }
    })
});

// 修改联系电话
router.get('/userInformation/changePhone', function(req,res,next){
    let phone = req.query.userPhone
    console.log('phone',phone)
    console.log('userId',req.session.userId)
    User.update({userId:req.session.userId},{userPhone:phone},{new: true},(err,doc)=>{
            if(err){
                errTip(res);
            }else{
                res.json({
                    status:"0",
                    msg:'修改成功877',
                    result:doc
                })
            }
        });
    /*User.remove({userId: 1505120102177},(err,doc)=>{
        if(err){
            errTip(res);
        }else{
            res.json({
                status:"0",
                msg:'修改成功888',
                result:doc
            })
        }
    })*/
    User.find({userId:req.session.userId},function(err, doc){
        console.log('doc', doc)
    })
});
// 修改联系地址
router.get('/userInformation/changeAddress',function(req, res, next){
    let newAddress = req.query.newAddress;
    console.log('newAddress',newAddress);
    User.update({userId:req.session.userId},{$set:{address:newAddress}},(err,doc)=>{
        if(err){
            errTip(res);
        }else{
            res.json({
                status:"0",
                msg:'',
                result:doc
            }) 
        }              
    });
})
// 修改密码
router.post('/changePassword',function(req,res,next){
    let param = {
        oldPassword : req.body.oldPassword,
        newPassword : req.body.newPassword
    }
    const Who = userGrade(req.session.userType);
    const key = [4, 9, 16, 14, 3, 6, 2, 8, 4, 5, 8, 2, 7, 9, 4, 5];
    const encryptedBytes = AES.utils.hex.toBytes(param.newPassword);
    const aesCtr = new AES.ModeOfOperation.ctr(key, new AES.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const passWord = AES.utils.utf8.fromBytes(decryptedBytes);
    Who.findOne({userId:req.session.userId, pwd:param.oldPassword},(err,doc)=>{
        if(err){
            return errTip(res);
        }
        if(!doc){
            return errTip(res,'账号不存在,或原密码不正确!');
        }
        doc.pwd = passWord;
        doc.save((err1,doc1)=>{
            if(err1){
            errTip(res,'储存密码时错误! 请重试');
            }else{
            res.json({
                status:"0",
                msg:'',
                result : ''
            }) ;
            }
        })
    });
})
module.exports = router;
// 完善个人信息
router.post('/addInformation',function(req,res,next){
    let param = {
        userName:req.body.userName,
        userPhone:req.body.userPhone,
        gender:req.body.gender,
        address:req.body.address
      }
    User.findOne({userId:req.session.userId},(err,doc)=>{
        if(err){
        errTip(res);
        }else{
            console.log('111', param)
            Object.assign(doc, param);
            doc.save((err1,doc1)=>{
                console.log(err1)
                if(err1){
                errTip(res);
                }else{        
                res.json({
                    status:"0",
                    msg:'',
                    result:''
                })
                }              
            })
        }
    });
})
