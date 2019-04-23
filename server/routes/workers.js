let express = require('express');
let router = express.Router();
let Worker = require('../models/worker');
let User = require('../models/user');
let Department = require('../models/department');
let Room = require('../models/room');
let WaterRecord = require('../models/waterRecord');
// 登录
/*router.post("/login", function(req, res, next){
    Worker.find({userId:req.body.userId, userType:req.body.userType}, function(err, doc){
        if(doc.length === 0) {
            res.json({
                status: '1',
                msg: "该用户不存在！",
            });
        } else if (doc[0].pwd !== req.body.pwd) {
            console.log(doc[0].pwd)
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
});*/
//获取学院信息
router.get('/getDepartment',function(req,res,next){
    Department.find(function(err,doc){
        if(err){
            errTip(res)
        }else{
            res.json({
                status:'0',
                msg:"查找成功",
                result:doc
            })
        }
    })
})
// 获取宿舍信息
router.get('/getRoomList',function(req,res,next){
    Room.find(function(err,doc){
        if(err){
            errTip(res)
        }else{
            res.json({
                status:'0',
                msg:"查找成功",
                result:doc
            })
        }
    })
})
//获取水费列表
router.post('/getWaterRecord',function(req,res,next){
    let param={
        currentPage : Number.parseInt(req.body.page),
        pageSize : Number.parseInt(req.body.size),
    }
    let water;
    if(req.body.roomId&&!req.body.departmentId){
        water={
            roomId:req.body.roomId
        }
    }else if(req.body.departmentId&&!req.body.roomId){
        water={
            departmentId:req.body.departmentId
        }
    }else if(req.body.departmentId&&req.body.roomId){
        water={
            roomId:req.body.roomId,
            departmentId:req.body.departmentId
        }
    }else{
        water={}
    }
    console.log(water)
    WaterRecord.find(water,function(err,doc){
        console.log(doc)
        if(err){
            errTip(res);
        }else{
            if(!doc){
                errTip(res,'未知错误!');
                return
            }
            let record = doc;
            let start = param.pageSize * (param.currentPage-1);
            let waterRecord = record.slice(start,start+param.pageSize);
            res.json({
                status:"0",
                msg:'roomId',
                result:{
                    waterRecord : waterRecord,
                    total : record.length
                }
            });
        }
    })
})
//发布消息
router.post('/addMessage',function(req,res,next){
    let message = {
        header: req.body.msgHeader,
        count:req.body.msgCount,
        msgTime: req.body.msgTime,
        msgRule:req.body.msgRule,
        msgRoom:req.body.msgRoom,
        msgDepartment:req.body.msgDepartment
    }
    console.log(req.body)
    let param;
    if(req.body.msgRule===1){
        if(req.body.room){
            if(req.body.msgDepartment){
                param={
                    userId:req.session.userId,
                    roomName:req.body.msgRoom,
                    departmentName:req.body.msgDepartment
                }
            }else{
                param={
                    userId:req.session.userId,
                    room:req.body.room
                }
            }
        }
    }else{
        param={
            userId:req.session.userId
        }
    }
    User.update(param,{'$push':{message:{
                msgHeader:message.header,
                msgCount:message.header,
                msgTime: message.msgTime,}}},(err,doc)=>{

    })
    Worker.update({userId:req.session.userId},
        {'$push':{message:{
                    msgHeader:message.header,
                    msgCount:message.header,
                    msgTime: message.msgTime,
                    msgDepartment:message.msgDepartment,
                    msgRoom:message.msgRoom,
                    msgRule:message.msgRule}}},(err,doc)=>{
        console.log('a',doc)
        if(err){
            console.log('发布失败');
            return errTip(res);
        }else{
            console.log('a',doc)
            res.json({
                status:"0",
                msg:'发布成功',
                result : ''
            }) ;
        }
    })
})
//获取个人信息
module.exports = router;
