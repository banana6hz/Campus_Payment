var express = require('express');
var router = express.Router();
//
var path = require('path');
var Alipay = require('../lib/alipay');
var utl = require('../lib/utl');

var outTradeId = Date.now().toString();



var ali = new Alipay({
  appId: '2016100100638599',
  notify_url: 'http://127.0.0.1:3000/notify_url',
  rsaPrivate: path.resolve('./routes/pem/app_private_key.pem'),
  rsaPublic: path.resolve('./routes/pem/app_public_key.pem'),
  sandbox: false,
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
router.get('/pay', function(req, res, next) {
  var url=  ali.webPay({
    body: "ttt",
    subject: "ttt1",
    outTradeId: outTradeId,
    timeout: '90m',
    amount: "0.01",
    sellerId: '',
    product_code: 'QUICK_MSECURITY_PAY',
    goods_type: "1",
    return_url:"http://127.0.0.1:3000/return_url"
  })

  var url_API = 'https://openapi.alipay.com/gateway.do?'+url;
  //res.send(url);
  res.redirect(url_API);
});
//
module.exports = router;
