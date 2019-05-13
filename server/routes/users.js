let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Worker = require('../models/worker');
let Fee = require('../models/fee');
let Sug = require('../models/suggest');
let WaterRecord = require('../models/waterRecord');
let AES = require('aes-js');
let request = require('request');
let xmlreader = require("xmlreader");
let fs = require("fs");
//var wxpay = require('../util');
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
        return Worker;
    }
}
router.post("/", function(req, res, next){
    console.log(111)
});
// 登录
router.post("/login", function(req, res, next){
    const Who = userGrade(req.body.userType);
    Who.find({userId:req.body.userId, userType:req.body.userType}, function(err, doc){
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
            req.session.departmentName= doc[0].departmentName;
            req.session.departmentId= doc[0].departmentId;
            req.session.masterName= doc[0].masterName;
            req.session.roomId= doc[0].roomId;
            req.session.roomName= doc[0].address;
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
    const Who = userGrade(req.session.userType);
    Who.find({userId: req.session.userId},function(err, doc) {
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
    const Who = userGrade(req.session.userType);
    let phone = req.query.userPhone
    console.log('phone',phone)
    console.log('userId',req.session.userId)
    Who.update({userId:req.session.userId},{userPhone:phone},{new: true},(err,doc)=>{
            if(err){
                console.log(res);
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
    const Who = userGrade(req.session.userType);
    let newAddress = req.query.newAddress;
    console.log('newAddress',newAddress);
    Who.update({userId:req.session.userId},{$set:{address:newAddress}},(err,doc)=>{
        if(err){
            console.log(res)
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
            console.log(res)
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
// 获取费用详情
router.get('/getFees',function(req,res,nest){
    Fee.find(function(err,doc){
        if(err){
            console.log(res)
            res.json({
                status:"1",
                msg:"获取详情失败！",
                result:''
            })
        }else{
            res.json({
                status:"0",
                msg:"成功",
                result:doc
            })
        }
    })
})
module.exports = router;
// 完善个人信息
router.post('/addInformation',function(req,res,next){
    const Who = userGrade(req.session.userType);
    let param = {
        userName:req.body.userName,
        userPhone:req.body.userPhone,
        gender:req.body.gender,
        address:req.body.address
      }
    Who.findOne({userId:req.session.userId},(err,doc)=>{
        if(err){
        console.log(res)
        }else{
            console.log('111', param)
            Object.assign(doc, param);
            doc.save((err1,doc1)=>{
                console.log(err1)
                if(err1){
                    console.log(res)
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
// 水费记录
router.get('/waterRecord', (req, res, next)=> {
    let water = {
        currentPage : Number.parseInt(req.query.page),
        pageSize : Number.parseInt(req.query.size)
     }
    User.findOne({userId:req.session.userId},(err,doc)=>{
         if(err){
             console.log(res)
         }else{
             if(!doc){
               errTip(res,'用户不存在!');
               return
             }
             let record = doc.waterRecord;
             let start = water.pageSize * (water.currentPage-1);
             let waterRecord = record.slice(start,start+water.pageSize);
             res.json({
               status:"0",
               msg:'',
               result:{
                    waterRecord : waterRecord,
                    total : record.length
               }
             });
         }
     });
 });
//按日期查找水费记录
router.post('/dateWater',(req,res,next)=>{

});
// 获取消息列表
router.get('/msgList',function(req,res,next){
    let msg = {
        currentPage : Number.parseInt(req.query.page),
        pageSize : Number.parseInt(req.query.size)
    }
    User.find({userId: req.session.userId},(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:'很抱歉，获取消息列表失败！',
                result : ''
            }) ;
        }else{
            let list = doc[0].message;
            let start = msg.pageSize * (msg.currentPage-1);
            let msgList = list.slice(start,start+msg.pageSize);
            res.json({
                status:"0",
                msg:'恭喜你，获取消息列表成功！',
                result : {
                    msgList:msgList,
                    total : list.length
                }
            }) ;
        }
    })
})
// user消息已读
router.get('/readMsg',(req,res,next)=>{
    let param={
        userId:req.body.userId,
        message:{_id:req.query.id}
    }
    User.updateOne({
        userId:req.session.userId,
        "message._id":req.query.id},{"message.$.isRead":true},(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:'失败！',
                result : ''
            }) ;
        }else{
            res.json({
                status:"0",
                msg:'成功！',
                result : ''
            }) ;
        }
    })
})
// 删除消息
router.post('/deleteMsg',function(req,res,next){
    User.update({userId:req.session.userId},{'$pull':{message:{msgHeader:req.body.msgHeader,msgCount:req.body.msgCount}}},(err,doc)=>{
        console.log(doc)
        if(err){
            console.log(res)
        }else{
            res.json({
                status:"0",
                msg:'删除成功',
                result:''
            })
        }
    })
})
// 提出建议// 在建议表存储
router.post('/addSuggest',function(req,res,next){
    let sug
    if (req.body.delivery){
        sug=new Sug({
            suggestText:req.body.suggestText,
            suggestTime:req.body.suggestTime,
            author:'匿名用户',
            userId:req.session.userId,
            isRead:false
        })
    }else{
        sug=new Sug({
            suggestText:req.body.suggestText,
            suggestTime:req.body.suggestTime,
            author:req.session.userName,
            userId:req.session.userId,
            isRead:false
        })
    }
    console.log(sug)
    // 在建议表存储
    sug.save((err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:'很抱歉，提交失败！',
                result : ''
            }) ;
        }else{
            res.json({
                status:"0",
                msg:'恭喜你，提交成功！',
                result : ''
            }) ;
        }
    })
})
// 提出建议// 在学生表存储
router.post('/addUserSuggest',function(req,res,next){
    let userSug
    if (req.body.delivery){
        userSug={
            suggestText: req.body.suggestText,
            suggestTime: req.body.suggestTime,
            author: '匿名用户',
            userId: req.session.userId,
            isRead: false
        }
    }else{
        userSug={
            suggestText:req.body.suggestText,
            suggestTime:req.body.suggestTime,
            author:req.session.userName,
            userId:req.session.userId,
            isRead:false
        }
    }
    User.updateOne({userId: req.session.userId},{'$push':{suggest:{
                suggestText:userSug.suggestText,
                suggestTime:userSug.suggestTime,
                author:userSug.author,
                userId:userSug.userId,
                isRead:userSug.isRead
            }}},function(err, doc){
        if (err) {
            console.log(err);
        } else {
            res.json({
                status: "0",
                msg: '发布成功',
                result: ''
            })
        }
    })
})
// 获取建议列表
router.get('/sugList',function(req,res,next){
    let sug = {
        currentPage : Number.parseInt(req.query.page),
        pageSize : Number.parseInt(req.query.size)
    }
    User.find({userId: req.session.userId},(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:'很抱歉，获取建议列表失败！',
                result : ''
            }) ;
        }else{
            let list = doc[0].suggest;
            let start = sug.pageSize * (sug.currentPage-1);
            let sugList = list.slice(start,start+sug.pageSize);
            res.json({
                status:"0",
                msg:'恭喜你，获取建议列表成功！',
                result : {
                    msgList:sugList,
                    total : list.length
                }
            }) ;
        }
    })
})
// 删除我的建议
router.post('/deleteUserSug',function(req,res,next){
    const Who = userGrade(req.session.userType);
    console.log('1',req.query.id)
    Who.update({userId:req.session.userId},{'$pull':{suggest:{_id:req.query.id}}},(err,doc)=>{
        if(err){
            console.log('?')
        }else{
            res.json({
                status:"0",
                msg:'删除成功',
                result:''
            })
        }
    })
})
// 缴纳水费
router.post('/payWater',(req,res,next)=> {
    User.updateOne({userId: req.session.userId}, {
        '$push': {
            waterRecord: {
                paymentTime: req.body.paymentTime,
                createTime: req.body.createTime,
                payment: req.body.amount,
                paymentMethod: req.body.type[0],
                paymentBody: req.body.body,
                outTradeId: req.body.outTradeId,
            }
        }
    }, (err, doc) => {
        if (err) {
            console.log('payWater', err)
        } else {
            console.log('payWater', 'success')
        }
    });
    let add = new WaterRecord({
        paymentTime: req.body.paymentTime,
        createTime: req.body.createTime,
        payment: req.body.amount,
        paymentMethod: req.body.type[0],
        paymentBody: req.body.body,
        outTradeId: req.body.outTradeId,
        roomId : req.session.roomId,
        roomName : req.session.roomName,
        departmentId : req.session.departmentId,
        departmentName : req.session.departmentName,
        userId: req.session.userId
    })
    console.log('assWater',req.session)
    add.save((err,doc)=>{
        if(err){
            console.log('payWater2', err)
        }else{
            console.log('payWater2', 'success')
        }
    })
});
// 按日期查找水费记录
router.post('/waterByDate',(req,res,next)=> {
    console.log(req.body)
    // const a7=ISODate(req.body.beginTime)
    // console.log('？',a7)
    WaterRecord.find({
        userId:req.session.userId,
        createTime:{$gte:req.body.beginTime,$lt:req.body.endTime}},(err,doc)=>{
        console.log(doc)
        if(err){
            console.log("err")
            res.json({
                status:"1",
                msg:'失败！',
                result : ''
            }) ;
        }else{
            res.json({
                status:"0",
                msg:'成功！',
                result : doc
            }) ;
        }
    })
    // User.find({userId: req.session.userId,"message._id":"77"},(err, doc) => {
    //     if(err){
    //         console.log("err")
    //     }else{
    //         if(doc[0].waterRecord){
    //             console.log('waterByDate',doc[0])
    //             res.json({
    //                 status: "0",
    //                 msg: "",
    //                 result: doc[0].waterRecord
    //             })
    //         }
    //     }
    // })
})
