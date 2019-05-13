var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var open = require("open");
var router = express.Router();
//
var Alipay = require('../lib/alipay');
var utl = require('../lib/utl');

var outTradeId = Date.now().toString();



var ali = new Alipay({
  appId: '2016100100638599',
  notify_url: 'http://127.0.0.1:3000/notify_url',
  rsaPrivate: path.resolve('./lib/pem/pre.pem'),
  rsaPublic: path.resolve('./lib/pem/pub.pem'),
  sandbox: true,
  signType: 'RSA2'
});
//
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//
router.get('/return_url',function(req,res){
  console.log('-----------');
  res.send('success')
})
router.get('/notify_url', function (req, res) {
  console.log('+++++++++++++++');
  res.send('success')
})
router.post('/pay', function(req, res, next) {
    var param = {};
    param.subject = req.body.subject;// 订单标题
    param.outTradeId = req.body.outTradeId;
    param.amount = req.body.amount;// 金额
    param.body = req.body.body;// 订单描述
    param.timeout = '3m';// 关闭时间
    param.charset = "utf-8";
    param.method = "alipay.trade.page.pay"
    param.product_code = "FAST_INSTANT_TRADE_PAY"
    var urlparm = ali.webPay(
        param
    );
    var url_API = ('https://openapi.alipaydev.com/gateway.do?'+ urlparm)
    res.json({
      status: "0",
      msg: '成功！',
      result: url_API
    })
});
//
module.exports = router;
