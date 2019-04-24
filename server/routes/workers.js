let express = require('express');
let router = express.Router();
let Excel = require('exceljs')
let app = express()
let Worker = require('../models/worker');
let User = require('../models/user');
let Department = require('../models/department');
let Room = require('../models/room');
let Fee = require('../models/fee');
let Sug = require('../models/suggest');
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
    Worker.update({userId:req.session.userId},
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
            return errTip(res);
        }else{
            res.json({
                status:"0",
                msg:'发布成功',
                result : ''
            }) ;
        }
    })
})
router.post('/addUserMessage',function(req,res,next){
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
                    roomName:req.body.msgRoom,
                    departmentName:req.body.msgDepartment
                }
            }else{
                param={
                    room:req.body.room
                }
            }
        }
    }else{
        param={}
    }
    User.update(param,{'$push':{message:{
                msgHeader:message.header,
                msgCount:message.header,
                msgTime: message.msgTime,
                isRead:false}}},(err,doc)=>{
        if(err){
            return errTip(res);
        }else{
            res.json({
                status:"0",
                msg:'发布成功',
                result : ''
            })
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
// 获取建议列表
router.get('/messageList',function(req,res,next){
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
// 删除建议
router.post('/deleteMessage',(req,res,next)=>{
    console.log(req.query)
    Sug.remove({_id:req.query.id},(err,doc)=>{
        console.log(doc)
        if(err){
            errTip(res);
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
router.get('/excel', function (req, res, next) {
    res.set('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    res.setHeader("Content-Disposition","attachment;filename=2017.12.26.xlsx")
    res.set('Set-Cookie', 'fileDownload=true; path=/')
    let data = [
        {
            "province": "山西",
            "city": "大同，太原"
        },
        {
            "province": "黑龙江",
            "city": "佳木斯，哈尔滨"
        },
        {
            "province": "安徽",
            "city": "合肥，安庆"
        }
    ];
    let options = {
        stream: res,
        useStyles: true,
        useSharedStrings: true
    }

    let start_time = Date.now();
    let workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    let worksheet = workbook.addWorksheet('Sheet');
    worksheet.columns = [
        { header: '去过的省', key: 'province' },
        { header: '具体的市', key: 'city' }
    ];

    for (let i = 0; i < data.length; i ++) {
        worksheet.addRow(data[i]).commit();
    }
    // worksheet.commit()
    workbook.commit()
        .then(function() {
            // the stream has been written
            let end_time = new Date();
            let duration = end_time - start_time;

            console.log("创建excel程序执行完毕，用时：", duration);
        });
})
module.exports = router;
