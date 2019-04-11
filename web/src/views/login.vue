<template>
  <div class="userLogin">
    <div class="user-login-cont">
      <div class="left-log-cont">
        <div class="log-body">
          <h2 class="log-title">校园缴费系统</h2>
          <span class="log-en">Campus Payment</span>
        </div>
        <div class="footTip">
                    <span class="f-tip">
                        一一一 不排队、不费事，让生活更简单一些 !
                    </span>
        </div>
      </div>
      <div class="the-right-cont">
        <i class="goto-homePage"
           @click="goToHomePage"></i>
        <transition name='transX-fast'
                    mode="out-in">
          <div class="right-login-body">
            <div class="top-header-cont">
              <div class="head-pic">
                <img src="../assets/logo.jpg" alt="头像框">
              </div>
            </div>
            <div class="form-cont">
              <el-form :model="loginForm" :rules="loginRules"
                       ref="loginForm" label-width="7rem"

                       class="user-loginForm">
                <el-form-item  label="账号" prop="userId">
                  <el-input v-model="loginForm.userId"
                            placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                  <el-input :type='inputType'
                            v-model="loginForm.passWord"
                            placeholder="请输入密码"></el-input>
                  <i class="toggle el-icon-view"
                     :class="{'color':loginForm.passWord==''}"
                     @click="changeInputType"></i>
                </el-form-item>
                <el-form-item  label="验证码"
                               class="code" prop="validateCode">
                  <label>
                    <el-input :disabled='disabled'
                              v-model.trim="loginForm.validateCode">
                    </el-input>
                    <ul class="ul-code" @click="handleEditCode">
                      <li class="square"></li>  <li class="square"></li>
                      <li class="square"></li>  <li class="square"></li>
                      <li class="square"></li>  <li class="square"></li>
                    </ul>
                  </label>
                </el-form-item>
                <div class="rightCode">
                  <div class="rightCode-cont" @click="handlechangeImg">
                    <img :src="codeImg"
                         class="Code-bg"
                         alt="验证码图片">
                    <!--<img src="../../static/img/login-Verification-1.png"
                         class="Code-bg"
                         alt="验证码图片">-->
                    <span class="randomCode">{{randomCode}}</span>
                  </div>
                </div>
                <el-form-item label="级别 : " class="grade" prop="userType">
                  <el-radio-group v-model.number="loginForm.userType">
                    <el-radio :label="0">学生用户</el-radio>
                    <el-radio :label="1">工作人员</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-cont-btn">
              <el-button type="primary"
                         @click="submitForm('loginForm')">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </div>
            <div class="footer">
              <router-link class="link footer-left" to="/register">注册</router-link>
              <router-link class="link footer-right" to="/forgotPassword">忘记密码?</router-link>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name='transX'>
      <div class="login-help-tip"
           @click="handleShowAccount"
           v-if="showTips">
        <div class="crile-tip">
          <p class="tips">测试账号</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'
  import AES from 'aes-js'
  export default {
    data(){
      let validateCode =(rule, value, callback) => {
        if (this.randomCode!==this.$data.loginForm.validateCode) {
          callback(new Error('验证码不正确 !'));
        }else{
          callback();
        }
      };
      return{
        showTips : false,
        disabled : false,
        inputType:'password',
        randomCode:'',
        codeImg:'',
        loginForm:{
          userId:'',
          passWord:'',
          validateCode:'',
          userType:0
        },
        loginRules:{
          userId:[
            { required: true, message: '请输入账号', trigger: 'blur' },
            { pattern:/^1[3-8][0-9]{11}$/ , message:'账号格式不正确', trigger: 'blur'}
          ],
          passWord:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          validateCode:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: validateCode , trigger: 'blur'},
            { validator: validateCode , trigger: 'change'}
          ]
        },
        validateCodeImg:[
          require('../../static/img/login-Verification-1.png'),
          require('../../static/img/login-Verification-2.png'),
          require('../../static/img/login-Verification-3.png'),
          require('../../static/img/login-Verification-4.png')
        ]
      }
    },
    watch: {
      'loginForm.validateCode': function (newVal) {
        if (newVal.length >= 6) {
          this.disabled = true
        }
      }
    },
    methods:{
      goToHomePage(){
        this.$router.push({path:'/home'});

      },
      handleShowAccount(){
        this.$notify({
          message : '普通用户: 15279778477 </br> 工作人员: 15279778478 </br> 密码都是: 814233583 </br>请不要更改密码,非常感谢!',
          dangerouslyUseHTMLString : true,
          showClose : true,
          type : "success",
          duration : 0
        })
      },
      handleEditCode () {
        let code = this.loginForm.validateCode
        if (this.disabled) {
          this.loginForm.validateCode = code.slice(0, -1)
        }
        this.disabled = false
      },
      randomNum () {
        return Math.random().toString(16).slice(-6)
      },
      randomCodeimg () {
        return this.validateCodeImg[Math.floor(Math.random() * 4)]
      },
      changeInputType () {
        this.inputType = (this.inputType === 'password') ? 'text' : 'password'
      },
      handlechangeImg () {
        this.codeImg = this.randomCodeimg()
        this.randomCode = this.randomNum()
      },
      userLogin (router, data) {
        axios.post(router, data).then(response => {
          let res = response.data
          if (res.status === '0') {
            this.$notify({
              title: '登录成功',
              message: '恭喜你! 登录成功!',
              duration: 2000,
              type: 'success'
            })
            console.log('登录成功', res.result.list)
            this.checkLogin()
            this.$router.push({path: '/HomePage'})
          } else {
            this.$notify({
              title: '登录失败',
              message: res.msg,
              duration: 2000,
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err);
        })
      },
      submitForm (formName) {
        this.$router.push({path: '/HomePage'})
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const key = [6, 9, 16, 11, 3, 6, 2, 3, 4, 2, 8, 2, 5, 9, 8, 2],
                    pwd = this.loginForm.passWord,
                    pwdBytes = AES.utils.utf8.toBytes(pwd),
                    aesCtr = new AES.ModeOfOperation.ctr(key, new AES.Counter(5)),
                    encryptedBytes = aesCtr.encrypt(pwdBytes),
                    encryptPwd = AES.utils.hex.fromBytes(encryptedBytes)
            const userPost = {
              userId: this.loginForm.userId,
              pwd: this.loginForm.passWord,
              userType: this.loginForm.userType
            }
            this.userLogin('/notices/login', userPost)
          } else {
            console.log('登录失败');
            return false
          }
        })
      },
      // 检验是否登录
      checkLogin(){
        axios.get("/notices/checkLogin").then((res)=>{
          console.log('跳转前', res.data.result.list)
          if(res.data.status==="0"){
            this.loginState=true;
            this.$store.commit("saveUserInfo",res.data.result);
            // console.log(res.data.result.userName)
          }else{
            console.log('loginStatuslogin', res.data.status)
            this.$router.push({path: '/'});
          }
        }).catch(err=>{
          console.log(err);

        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    mounted() {
      setTimeout(()=>{
        this.showTips = true;
      },500)
      this.randomCode = this.randomNum()
      this.codeImg = this.randomCodeimg()
      window.onkeydown = (e) => {
        let key = window.event.keyCode
        if (key === 13) {
          this.submitForm('loginForm')
        }
      }
    }
  }
</script>

<style lang='scss'>
  .userLogin{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-image: url("../assets/img/background.jpg");
  }
  .user-login-cont{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    min-width: 40rem;
    height: 32rem;
  }
  .left-log-cont{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 55%;
    height: 100%;
    background-color: rgba(165, 167, 172, 0.2);
    .log-body{
      margin-top: -5rem;
    }
    .log-title{
      font-size: 2.5rem;
      color:#555;
    }
    .log-en{
      font-size: 1.5rem;
      color: #777;
    }
    .footTip{
      position: absolute;
      bottom: 2rem;
      right: 3rem;
      .f-tip{
        color: #777;
        letter-spacing: 0.05rem;
      }
    }
  }
  .the-right-cont{
    position: relative;
    overflow: hidden;
    width: 45%;
    min-width: 17rem;
    height: 100%;
    background-color: #fff;
    .right-cont-btn{
      margin-top: 2rem;
      .el-button{
        margin: 0 1rem;
      }
    }
    .goto-homePage{
      position: absolute;
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      background-image: url('../assets/img/loginPage.png');
      background-repeat: no-repeat;
      background-size:1.6rem 1.6rem;
      background-position: right bottom;
      opacity: .3;
      z-index:99;
    }
    .footer{
      position: absolute;
      display: flex;
      justify-content:space-between;
      width: 100%;
      bottom: 0.8rem;
      .link{
        display: block;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.8rem;
        color: #888;
        &:hover{
          color: rgb(238, 138, 138);
        }
      }
      .footer-left{
        margin-left: 1.5rem;
      }
      .footer-right{
        margin-right: 1.5rem;
      }
    }
  }
  .login-help-tip{
    $tip-width : 5rem;
    position: absolute;
    top: 10%;
    right: 5%;
    width: $tip-width;
    height: $tip-width /2;
    cursor: pointer;
    .crile-tip{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0,0,0,.1);
      &:hover{
        background-color: rgba(0,0,0,.2);
      }
      .tips{
        font-size: 0.7rem;
        letter-spacing: 0.1rem;
        color: #d8d8d8;
      }
    }
  }
  .qq-call-me{
    $qq-cont-width : 2rem;
    position: absolute;
    right: 1.5rem;
    .qq-link{
      display: block;
      width: $qq-cont-width;
      height: $qq-cont-width;
      .qq{
        width: 100%;
        height: 100%;
      }
    }

  }
  @media only screen and (max-width:992px){
    .user-login-cont{
      width: 70%;
    }
    .left-log-cont{
      width: 50%;
    }
    .the-right-cont{
      width: 50%;
    }
  }
  @media only screen and (max-width:768px){
    .user-login-cont{
      width: 100%;
      height: 100%;
    }
    .left-log-cont{
      display: none;
    }
    .the-right-cont{
      width: 80%;
      height: 70%;
      min-height: 40rem;
    }
  }
  .right-login-body{
    position: relative;
    width: 100%;
    height: 100%;
    .top-header-cont{
      padding-top: 1rem;
      .head-pic{
        overflow: hidden;
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
        margin: 0 auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .form-cont{
      width: 90%;
      margin-top: 1rem;
      .el-form-item{
        margin-bottom: 1.5rem;
        &.grade{
          margin-bottom: 0.3rem;
        }
      }
      .code{
        .el-input__inner{
          outline: none;
          border: none;
          letter-spacing: 2.4rem;
          text-indent: 0.3rem;
        }
        .ul-code{
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          .square{
            width: 14%;
            border: 1px solid #ccc;
          }
        }
      }
      .rightCode{
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: flex-end;
        text-align: right;
        width: 100%;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        cursor: pointer;
      }
      .rightCode-cont{
        position: relative;
        height: 2rem;
        width: 6.5rem;
        .Code-bg{
          width: 100%;
          height: 100%;
        }
      }
      .randomCode{
        position: absolute;
        display: block;
        height: 100%;
        line-height: 1.5rem;
        right: 10%;
        top: 60%;
        font-size: 1.1rem;
        letter-spacing: 0.1rem;
        color: #555;
        transform:translate(-20%,-45%) rotate(random()*15deg);
        transform-origin:center;
      }
      .toggle.el-icon-view{
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        top: 50%;
        transform: translate(0,-50%);
        right: 0.2rem;
      }
      .toggle.color{
        color: #ccc;
      }
      // 登录按钮
      .el-button--primary{
        margin-right: 0.5rem;
      }
    }
  }
  @media only screen and (max-width:1500px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 2.35rem;
    }
  }
  @media only screen and (max-width:1400px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 2.25rem;
    }
  }
  @media only screen and (max-width:1200px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 1.90rem;
    }
  }
  @media only screen and (max-width:1100px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 1.70rem;
    }
  }
  @media only screen and (max-width:990px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 2.20rem;
    }
  }
  @media only screen and (max-width:900px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 1.70rem;
    }
  }
  @media only screen and (max-width:768px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 5.50rem;
      font-size: 2rem;
    }
    .right-login-body .form-cont .rightCode{
      margin-top: 1rem;
      margin-bottom: 1rem;
      .rightCode-cont{
        height: 3rem;
        width: 9rem;
        .randomCode{
          line-height: 3rem;
          font-size: 3rem;
        }
      }
    }
  }
  @media only screen and (max-width:700px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 5.00rem;
    }
  }
  @media only screen and (max-width:650px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 4.50rem;
    }
  }
  @media only screen and (max-width:600px){
    .right-login-body .form-cont .code .el-input__inner{
      letter-spacing: 3.50rem;
    }
  }
</style>

