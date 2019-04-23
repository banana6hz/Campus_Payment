let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Worker = require('../models/worker');
let Fee = require('../models/fee');
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
    const Who = userGrade(req.session.userType);
    let newAddress = req.query.newAddress;
    console.log('newAddress',newAddress);
    Who.update({userId:req.session.userId},{$set:{address:newAddress}},(err,doc)=>{
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
// 获取费用详情
router.get('/getFees',function(req,res,nest){
    Fee.find(function(err,doc){
        if(err){
            errTip(err)
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
// 水费记录
router.get('/waterRecord', (req, res, next)=> {
    let water = {
        currentPage : Number.parseInt(req.query.page),
        pageSize : Number.parseInt(req.query.size)
     }
    User.findOne({userId:req.session.userId},(err,doc)=>{
         if(err){
           errTip(res);
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
// 删除消息
router.post('/deleteMsg',function(req,res,next){
    const Who = userGrade(req.session.userType);
    console.log('22',req.body)
    Who.update({userId:req.session.userId},{'$pull':{message:{msgHeader:req.body.msgHeader,msgCount:req.body.msgCount}}},(err,doc)=>{
        console.log(doc)
        if(err){
            errTip(res);
        }else{
            if(doc.nModified){ //修改数量不为0
                res.json({
                    status:"0",
                    msg:'',
                    result:''
                })
            }else{
                errTip(res,'删除失败,请重试!');
            }
        }
    })
})
// 缴纳水费
var appid     = 'wx28f86efd25cc3312';
var appsecret = 'b8687555bf947b1947b62767c448723';
var mchid     = '1499403456'
var mchkey    = '8r435jVd7yA0354nsvkxb4cN3x7Se4322';
var wxurl     = 'http://XXXXXXXXX/weixinNotify.action';
router.post('/payWater',(req,res,next)=>{
    if (req.body.type[0]==='微信'){
        console.log(req.body)
    }
    let money= req.body.payment;
    if(money){
        res.json({
            status:"0",
            msg:'创建成功',
            result:''
        })
    }else{
        res.json({
            status:"1",
            msg:'创建失败',
            result:''
        })
    }
    /*//首先生成签名sign
    appid
    let mch_id = mchid;
    let nonce_str = wxpay.createNonceStr();
    let timestamp = wxpay.createTimeStamp();
    let body = '测试微信支付';
    let out_trade_no = orderCode;
    let total_fee = wxpay.getmoney(money);
    let spbill_create_ip = req.connection.remoteAddress;
    let notify_url = wxurl;
    let trade_type = 'APP';

    let sign = wxpay.paysignjsapi(appid,body,mch_id,nonce_str,notify_url,out_trade_no,spbill_create_ip,total_fee,trade_type,mchkey);

    console.log('sign==',sign);

    //组装xml数据
    var formData  = "<xml>";
    formData  += "<appid>"+appid+"</appid>";  //appid
    formData  += "<body><![CDATA["+"测试微信支付"+"]]></body>";
    formData  += "<mch_id>"+mch_id+"</mch_id>";  //商户号
    formData  += "<nonce_str>"+nonce_str+"</nonce_str>"; //随机字符串，不长于32位。
    formData  += "<notify_url>"+notify_url+"</notify_url>";
    formData  += "<out_trade_no>"+out_trade_no+"</out_trade_no>";
    formData  += "<spbill_create_ip>"+spbill_create_ip+"</spbill_create_ip>";
    formData  += "<total_fee>"+total_fee+"</total_fee>";
    formData  += "<trade_type>"+trade_type+"</trade_type>";
    formData  += "<sign>"+sign+"</sign>";
    formData  += "</xml>";

    console.log('formData===',formData);

    var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

    request({url:url,method:'POST',body: formData},function(err,response,body){
        if(!err && response.statusCode === 200){
            console.log(body);

            xmlreader.read(body.toString("utf-8"), function (errors, response) {
                if (null !== errors) {
                    console.log(errors)
                    return;
                }
                console.log('长度===', response.xml.prepay_id.text().length);
                var prepay_id = response.xml.prepay_id.text();
                console.log('解析后的prepay_id==',prepay_id);


                //将预支付订单和其他信息一起签名后返回给前端
                let finalsign = wxpay.paysignjsapifinal(appid,mch_id,prepay_id,nonce_str,timestamp,mchkey);

                res.json({'appId':appid,'partnerId':mchid,'prepayId':prepay_id,'nonceStr':nonce_str,'timeStamp':timestamp,'package':'Sign=WXPay','sign':finalsign});

            });
        }
    })*/
})
