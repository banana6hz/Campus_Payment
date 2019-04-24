<template>
    <div class="userInformation">
        <person-title>当前位置 :: 个人中心 >> <em>我的信息</em></person-title>
        <div class="information-cont">
            <div class="userinfo-body">
                <h3 class="title">我的信息</h3>
                <div class="userinfo-cont">
                    <div class="userinfo-cont-left">
                        <div class="cont-left-hedaer">
                            <div class="header-name">
                                <div class="circle" :class="{'woman':userInformation.gender==='女'}">
                                    <!--<span>{{userInformation.userName}}</span>-->
                                </div>
                                <div class="gender">
                                    <span>{{userInformation.gender}}</span>
                                </div>
                            </div>
                            <ul class="left-info-list">
                                <li class="info-item">
                                    <i class="el-icon-mobile-phone" style='color:#7dafa7;'></i>
                                    <span class="title">用户账号 :</span>
                                    {{userInformation.userId}}
                                </li>
                                <li class="info-item">
                                    <i class="el-icon-star-on" style='color:#7dafa7;'></i>
                                    <span class="title">用户等级 :</span>
                                    {{userInformation.userType===0?'学生用户':'工作人员'}}
                                </li>
                                <li class="info-item">
                                    <i class="el-icon-phone" style='color:#7dafa7;'></i>
                                    <span class="title">联系电话 :</span>
                                    {{userInformation.userPhone}}
                                    <i class="el-icon-edit changeinfo"
                                       @click="PhoneFormVisible = true"></i>
                                </li>
                                <li class="info-item">
                                    <i class="el-icon-time" style='color:#7dafa7;'></i>
                                    <span class="title">入学时间 :</span>
                                    {{userInformation.entrance}}
                                </li>
                            </ul>
                        </div>
                        <div class="cont-left-footer">
                            <div class="address">
                                <span class="cont">地址:{{userInformation.address}}</span>
                                <i class="el-icon-edit changeinfo"
                                   @click="addressFormVisible = true"></i>
                            </div>
                            <div class="lastLoginTime">
                                <!--<em class="title">上次登录 :</em>-->
                                <span class="time">{{userInformation.lastLoginTime}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="userinfo-cont-right">
                        <template v-if='userInformation.grade==1'>
                            <h4 class="title" >账号余额</h4>
                            <span class="balance">{{userInformation.balance | priceInit}}</span>
                        </template>
                        <template v-else>
                            <h4 class="title">缴费总数</h4>
                            <span class="orderNum">{{userInformation.orderNum }} 笔</span>
                        </template>
                        <i class="line"></i>
                    </div>
                </div>
            </div>
            <div class="changePhone">
                <el-dialog title="修改联系号码" :visible.sync="PhoneFormVisible">
                    <el-form :model="changeForm"
                             ref="phoneNum"
                             @submit.native.prevent
                             :rules="rules">
                        <el-form-item label="联系电话 :" prop='newPhone'>
                            <el-input v-model="changeForm.newPhone"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="PhoneFormVisible = false">取 消</el-button>
                        <el-button type="primary"
                                   @click="handleChangePhone('phoneNum')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <div class="changeAddress">
                <el-dialog title="修改联系地址" :visible.sync="addressFormVisible">
                    <el-form :model="changeForm"
                             ref="newAddress"
                             @submit.native.prevent
                             :rules="rules">
                        <el-form-item label="联系地址 :" prop='newAddress'>
                            <el-cascader
                            placeholder="输入您的宿舍地址"
                            :options="options"
                            v-model="changeForm.newAddress"
                            ></el-cascader>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addressFormVisible = false">取 消</el-button>
                        <el-button type="primary"
                                   @click="handleChangeAddress('newAddress')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapState } from 'vuex'
    export default {
        data(){
            return{
                options:[{
                    value: '22栋',
                    label: '22栋',
                    children:[{
                        value:'A',
                        label: 'A',
                        children:[{
                            value:132,
                            label: 132,
                        },{
                            value:232,
                            label: 232,
                        }]
                    },{
                        value:'B',
                        label: 'B',
                        children:[{
                            value:332,
                            label: 332,
                        },{
                            value:432,
                            label: 432,
                        }]
                    }]
                }],
                userInformation:{},
                PhoneFormVisible:false,
                addressFormVisible:false,
                changeForm: {
                    newPhone:'',
                    newAddress:[]
                },
                newAddress:'',
                rules: {
                    newPhone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern:/^1[3-8][0-9]{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
            ...mapState({
                userId:state=>state.user.userInfo.userId
             })
        },
        mounted(){
            this.getUserInfo();
        },
        methods:{
            getUserInfo(){
                // let loading = this.$loading({lock:true,text:'玩命加载中...'});
                axios.get(`/api/users/userInformation`).then(response=>{
                    let res = response.data;
                    // loading.close();
                    if(res.status==='0'){
                        this.userInformation = res.result;
                        this.userInformation.newPhone = res.result.userPhone;
                        console.log('userInformation', this.userInformation)
                    }else{
                        console.log(res.msg);
                    }
                }).catch(err=>{
                    console.log(err);

                })
            },
            handleChangePhone(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.PhoneFormVisible = false;
                        axios.get(`/api/users/userInformation/ChangePhone?userPhone=${this.changeForm.newPhone}`)
                            .then(response=>{
                                let res = response.data;
                                if(res.status==='0'){
                                    this.$message({
                                        message: res.msg,
                                        type: 'success',
                                        showClose:true
                                    });
                                    this.getUserInfo();
                                }else{
                                    console.log(res.msg);
                                    this.$message({
                                        message: '修改失败! 请重试',
                                        type: 'error',
                                        showClose:true
                                    });
                                }
                            }).catch(err=>{
                            console.log(err);
                        })
                    } else {
                        return false;
                    }
                });

            },
            handleChangeAddress(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addressFormVisible = false;
                        this.newAddress = this.changeForm.newAddress[0] + this.changeForm.newAddress[1] + this.changeForm.newAddress[2]
                        axios.get(`/api/users/userInformation/ChangeAddress?newAddress=${this.newAddress}`)
                            .then(response=>{
                                let res = response.data;
                                if(res.status==='0'){
                                    this.$message({
                                        message: '恭喜你，修改成功!',
                                        type: 'success',
                                        showClose:true
                                    });
                                    this.getUserInfo();
                                }else{
                                    console.log(res.msg);
                                    this.$message({
                                        message: '修改失败! 请重试',
                                        type: 'error',
                                        showClose:true
                                    });
                                }
                            }).catch(err=>{
                            console.log(err);
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style>
    /* // 修改手机弹框 */
    .information-cont .el-dialog{
        width: 20rem;
    }
</style>

<style scoped  lang='scss'>
    .userInformation{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .information-cont{
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        color: #666;
        background-color: #fff;
        .userinfo-body{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            padding-top: 3rem;
            padding-left: 2rem;
            box-sizing: border-box;
            h3.title{
                display: block;
                line-height: 2rem;
                font-size: 1rem;
                text-align: left;
                color: #666;
            }
        }
        $userinfo-cont-w:45rem;
        .userinfo-cont{
            width: $userinfo-cont-w;
            min-height: 15rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: stretch;
            background-color: #fff;
            box-shadow: 0 0 0.9rem 0.3rem #ecf2f7;
        }
        .userinfo-cont-left{
            width: 60%;
            height: 100%;
            .changeinfo{
                width: 1rem;
                height: 1rem;
                line-height: 1rem;
                margin-left: 0.2rem;
                color: #7dafa7;
            }
        }
        .cont-left-hedaer{
            display: flex;
            $header-w:7rem;
            $circle-h:5.5rem;
            .header-name{
                width: $header-w;
                height: $header-w;
                margin: 1rem 0 0 1rem;
                .circle{
                    width: $circle-h;
                    height: $circle-h;
                    line-height: $circle-h;
                    margin: 0 auto;
                    border-radius: 100%;
                    // border: 3px solid #409EFF;
                    background-image: url('./../../assets/img/userInfo-header-pic-man.jpg');
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    span{
                        color: #666;
                        letter-spacing: 0.1rem;
                    }
                }
                .woman.circle{
                    background-image: url('./../../assets/img/userInfo-header-pic-woman.jpg');
                }
                .gender{
                    line-height: $header-w - $circle-h;
                }
            }
            .left-info-list{
                border-left: 1px solid #ccc;
                text-align: left;
                padding: 0 2rem;
                margin: 2rem 0 0 1rem;
                border-right: 1px solid #ccc;
                .info-item{
                    line-height: 1.5rem;
                    span.title{
                        color: #777;
                    }
                }
            }
        }
        .cont-left-footer{
            margin-top: 2rem;
            margin-left: 2rem;
            text-align: left;
            .address{
                display: flex;
                align-items: center;
                span.cont{
                    line-height: 1rem;
                    padding: 0 0.5rem;
                    border-radius: 0.5rem;
                    letter-spacing: 0.05rem;
                    background-color: #7dafa7;
                    color: #fff;
                }
            }
            .lastLoginTime{
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                .title{
                    color: #409EFF;
                    letter-spacing: 0.05rem;
                    font-size: 0.8rem;
                }
                .time{
                    text-align: center;
                }
            }
        }
        .userinfo-cont-right{
            position: relative;
            width: 30%;
            height: 100%;
            min-height: 15rem;
            padding: 0 1rem;
            h4.title{
                padding-top: 2rem;
                text-align: left;
                font-size: 1rem;
                letter-spacing: 0.1rem;
                color: #7dafa7;
            }
            span.balance,
            span.orderNum{
                display: block;
                margin-top: 3rem;
                font-size: 2rem;
                color: #7dafa7;
            }
            span.orderNum{
                font-size: 1.5rem;
            }
            i.line{
                display: block;
                position: absolute;
                bottom: 4rem;
                height: 0.1rem;
                width: calc(100% - 2rem);
                background-image: linear-gradient(to left, #4facfe 0%, #cacaca 100%);
                background-color: #ccc;
            }
        }
    }
    @media only screen and (max-width:1200px){
        .information-cont .userinfo-cont{
            width: 50rem;
        }
    }
    @media only screen and (max-width:768px){
        .information-cont{
            .userinfo-cont{
                width: 90%;
            }
            .userinfo-cont-left{
                width: 100%;
            }
            .cont-left-hedaer .left-info-list{
                border-right: none;
            }
            .userinfo-cont-right{
                display: none;
            }
        }
    }
</style>
