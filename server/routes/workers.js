let express = require('express');
let router = express.Router();
let Excel = require('node-excel-export')
let app = express()
let Worker = require('../models/worker');
let User = require('../models/user');
let Department = require('../models/department');
let Room = require('../models/room');
let Fee = require('../models/fee');
let Sug = require('../models/suggest');
let Msg = require('../models/message');
let WaterRecord = require('../models/waterRecord');
function errTip(res,errmsg=err.message){
    res.json({
        status:"1",
        msg:errmsg,
        result:''
    });
}
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
//一级费用修改
router.post('/editWater',function(req,res,next){
    let param = {
        feeId:req.body.feeId,
    }
    Fee.update(param,{$set:{feeUnit:req.body.feeUnit,feeNum:req.body.feeNum,feeDesc:req.body.feeDesc}},(err,doc)=>{
        if(err){
            errTip(res);
            res.json({
                status:"1",
                msg:'很抱歉，修改失败！',
                result:''
            })
        }else{
            res.json({
                status:"0",
                msg:'恭喜你，修改成功！',
                result:''
            })
        }
    })
})
//增加费用
router.post('/addPayment',function(req,res,next){
    console.log(req.body)
    let add = new Fee({
        feeName:req.body.feeName,
        feeUnit:req.body.feeUnit,
        feeNum:req.body.feeNum,
        feeDesc: req.body.feeDesc
    })
    add.save((err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:'很抱歉，添加失败！',
                result : ''
            }) ;
        }else{
            res.json({
                status:"0",
                msg:'恭喜你，添加成功！',
                result : ''
            }) ;
        }
    })
})
//发布消息//存储在消息表
router.post('/addMessage',function(req,res,next){
    let message = new Msg({
        msgHeader: req.body.msgHeader,
        msgCount:req.body.msgCount,
        msgTime: req.body.msgTime,
        msgRule:req.body.msgRule,
        msgRoom:req.body.msgRoom,
        msgDepartment:req.body.msgDepartment
    })
    message.save((err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:'很抱歉，发布失败！',
                result : ''
            }) ;
        }else{
            res.json({
                status:"0",
                msg:'恭喜你，发布成功！',
                result : ''
            }) ;
        }
    })
})
//发布消息//存储在user表
router.post('/addUserMessage',function(req,res,next){
    let message ={
        header: req.body.msgHeader,
        count:req.body.msgCount,
        msgTime: req.body.msgTime,
        msgRule:req.body.msgRule,
        msgRoom:req.body.msgRoom,
        msgDepartment:req.body.msgDepartment
    }
    let param
    console.log(req.body.msgRule)
    if(req.body.msgRule === 0){
        param={}
        console.log(param)
    }else{
        if(req.body.room!==''&&req.body.department===''){
            param={
                roomName:req.body.msgRoom
            }
        }else if(req.body.department!==''&&req.body.room===''){
            param={
                departmentName:req.body.msgDepartment
            }
        }else if(req.body.department!==''&&req.body.room!==''){
            param={
                roomName:req.body.msgRoom,
                departmentName:req.body.msgDepartment
            }
        }else{
            param={}
            console.log(111)
        }
    }
    console.log(param)
    User.updateOne(param,
        {'$push':{message:{
                    msgHeader:message.header,
                    msgCount:message.header,
                    msgTime: message.msgTime,
                    msgDepartment:message.msgDepartment,
                    msgRoom:message.msgRoom,
                    msgRule:message.msgRule,
                    isRead:false
                }}},(err,doc)=>{
            if(err){
                res.json({
                    status:"1",
                    msg:'很抱歉，发布失败！',
                    result : ''
                }) ;
            }else{
                res.json({
                    status:"0",
                    msg:'发布成功',
                    result : ''
                }) ;
            }
        })
})
// worker获取消息列表
router.get('/msgList', function(req, res, next){
    let msg = {
        currentPage : Number.parseInt(req.query.page),
        pageSize : Number.parseInt(req.query.size)
    }
    Msg.find({},function(err, doc) {
        if (err ) {
            res.json({
                status: '0',
                msg: '查找失败',
                result: ''
            })
        } else {
            let list = doc;
            let start = msg.pageSize * (msg.currentPage-1);
            let msgList = list.slice(start,start+msg.pageSize);
            res.json({
                status: '0',
                msg: '查找成功',
                result: {
                    msgList:msgList,
                    total : list.length
                }
            })
        }
    })
});
// 删除消息（发件箱）
router.post('/deleteMsg',function(req,res,next){
    Msg.deleteOne({_id:req.query.id},(err,doc)=>{
        console.log(doc)
        if(err){
            console.log(res);
        }else{
            if(doc.deletedCount){ //修改数量不为0
                res.json({
                    status:"0",
                    msg:'恭喜你，删除成功！',
                    result:''
                })
            }else{
                errTip(res,'删除失败,请重试!');
            }
        }
    })
})
// 获取建议列表
router.get('/suggestList',function(req,res,next){
    let msg = {
        currentPage : Number.parseInt(req.query.page),
        pageSize : Number.parseInt(req.query.size)
    }
    Sug.find((err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:'很抱歉，获取建议列表失败！',
                result : ''
            }) ;
        }else{
            let list = doc;
            let start = msg.pageSize * (msg.currentPage-1);
            let msgList = list.slice(start,start+msg.pageSize);
            res.json({
                status:"0",
                msg:'恭喜你，获取建议列表成功！',
                result : {
                    msgList:msgList,
                    total : list.length
                }
            }) ;
        }
    })
})
// 删除建议（收件箱）
router.post('/deleteMessage',(req,res,next)=>{
    console.log(req.query)
    Sug.deleteOne({_id:req.query.id},(err,doc)=>{
        console.log(doc)
        if(err){
            console.log(res);
        }else{
            if(doc.deletedCount){ //修改数量不为0
                res.json({
                    status:"0",
                    msg:'恭喜你，删除成功！',
                    result:''
                })
            }else{
                errTip(res,'删除失败,请重试!');
            }
        }
    })

})
// 建议已读
router.get('/readSuggest',(req,res,next)=>{
    Sug.update({_id:req.query.id},{$set:{isRead:true}},(err,doc)=>{
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
//excel
router.post('/excel', function (req, res, next) {
    const styles = {
        header: {
            font: {
                sz: 18,
                bold: true,
            }
        },
        headerTitle: {
            font: {
                sz: 12,
                bold: true,
            }
        },
    };
    // 标题
    const heading = [
        [{value:'report标题', style: styles.header}],
    ];
    // 合并
    const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 3 } },
    ]
    // 列结构
    const specification = {
        school: {
            displayName: '学校',
            headerStyle: styles.headerTitle,
            width: 100,
        },
        academe: {
            displayName: '院系',
            headerStyle: styles.headerTitle,
            width: 160
        },
        grade: {
            displayName: '年级',
            headerStyle: styles.headerTitle,
            width: 80
        },
    }
    // 数据
    var  dataset = [{
        school: "a",
        academe: "b",
        grade: "c",

    }]
    //生成excel文件的二进制流
    const report = Excel.buildExport(
        [
            {
                name: 'report',
                heading: heading,
                merges: merges,
                specification: specification,
                data: dataset
            }
        ]
    );
    res.attachment('report.xlsx');
    res.end(report);
})
module.exports = router;
