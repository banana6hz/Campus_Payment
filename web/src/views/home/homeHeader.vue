<template>
    <div>
        <div class="header-menu header">
            <div class="logo ">
                <a href="javascript:void(0);">
                    <img src="../../assets/logo.jpg" alt="logo图标">
                    <h1>校园缴费</h1>
                </a>
            </div>
            <div class="welcome">
                <p >{{userName}}<span v-if="user">同学，</span>欢迎你！</p>
            </div>
            <div class="header-menu">
                <router-link :class="{'link-active':currentPage==='home'}"
                             to="/homePage"><span>主页</span></router-link>
                <router-link :class="{'link-active':currentPage===gotoPage}"
                             :to="'/'+gotoPage">
                    <el-badge is-dot
                              class="item"><span>个人中心</span></el-badge>
                </router-link>
            </div>
            <div class="login-and-exit">
                <a v-if="!loginState"
                   @click.prevent="handleUserLogin">登录</a>
                <a v-else
                   @click.prevent="logout">退出</a>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import { mapState } from 'vuex'
    export default{
        data() {
            return {
                loginState: true,
                // userType: 1,
                user:true
            }
        },
        computed:{
            ...mapState({
                userId:state=>state.user.userInfo.userId,
                userType:state=>state.user.userInfo.userType,
                userPhone:state=>state.user.userInfo.userPhone,
                userName:state=>state.user.userInfo.userName
                // vuexUserName:state=>state.user.userInfo.userName,
                // msgLen:state=>state.user.userInfo.msgLen
            }),
            currentPage(){
                return this.$route.path.split('/')[1];
            },
            gotoPage(){
                if(this.userType===1){
                    this.user=false
                    return 'workerPerson'
                }else{
                    this.user=true
                    return 'userPerson'
                }
            }
        },
        created(){
            this.checkLogin()
        },
        methods:{
            // 检验是否登录
            checkLogin(){
                axios.get("/api/users/checkLogin").then((res)=>{
                    console.log('checkLogin', res.data)
                    if(res.data.status==="0"){
                        this.loginState=true;
                        this.$store.commit("saveUserInfo",res.data.result);
                    }else{
                        console.log('loginStatus', res.data.status)
                        this.$router.push({path: '/'});
                    }
                }).catch(err=>{
                    console.log(err);

                })
            },
            // 退出
            logout(){
                axios.post("/api/users/logout").then((response)=>{
                    let res = response.data;
                    if(res.status==="0"){
                        // this.loginState=false;
                        this.$store.commit("saveUserInfo",{userId:'',userName:''});
                        this.$router.push({path: '/'});
                        this.$notify({
                            title: '退出成功',
                            message: '恭喜你! 退出成功!',
                            duration: 2000,
                            type: 'success'
                        })
                    }else{
                        console.log(res.msg);
                    }
                    console.log('退出', res.result);
                }).catch(err=>{
                    console.log(err);

                })
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../style/_mixin.css";
    .homeBackground{
        height: 100%;
        width: 100%;
        background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);
    }
    .homeHeader{
        height: 100%;
        width: 100%;
        // background-image: linear-gradient(-225deg, #7c8c88 0%, #3963a0 48%, #74bd50 100%);
    }
    .appHome{
        position: relative;
        width: 60%;
        margin:0 auto;
        overflow: hidden;
    }
    @import "../../style/_mixin.css";
    $color:#34495e;
    a{
        color: $color;
    }
    .link-active{
        background-color: #eff3f5;
        color: #7dafa7;
    }
    $header-height:3rem;
    .header{
        padding:6px 0;
        position: relative;
        display: flex;
        justify-content:flex-end;
        align-items: center;
        width: 100%;
        background-color: #fff;
        border-bottom: 0.05rem solid rgb(243, 240, 240);
        color: $color;
        // @include transition(.3s);
        cursor: pointer;
        z-index: 999;
    }
    .logo{
        flex-grow: 2;
        margin-left: 30px;
        a{
            display: flex;
            align-items: center;
            width: 100%;
            img{
                display: block;
                max-width: 2.5rem;
                height: auto;
                margin-right: 0.5rem;
            }
            h1{
                color: $color;
                font-size: 1rem;
                letter-spacing: 2px;
            }
        }

    }
    .header-menu{
        display: flex;
        justify-content:center;
        //width: 60%;
        min-width: 25rem + 2rem;
        a{
            display: flex;
            align-items: center;
            // justify-content: center;
            width: 5rem;
            height:$header-height;
            font-size: 0.8rem;
            // @include transition(.4s);
            &:hover{
                background-color: #eff3f5;
            }
            .span{
                display:inline-block;
                text-align: center;
                margin:0 auto;
            }
        }
    }
    .usercont{
        display: flex;
        align-items: center;
        margin-left: 0.5rem;
        img{
            display: block;
            max-width: 1.5rem;
            margin-right: 5px;
            height: auto;
        }
        .username em{
            color: #777;
            font-family: '微软雅黑';
        }
    }

    .login-and-exit{
        margin:0 2rem 0 .5rem;
        a{
            // @include set-inline-block;
            line-height: $header-height;
            margin: 0 .5rem;
            font-size: 0.7rem;
            &:hover{
                color: #F56C6C;
            }
        }
    }
    @media only screen and (max-width:992px){
        .login-and-exit a{
            line-height: 4rem;
        }
        .header-menu a{
            height: 4rem;
            width: 5rem;
        }
    }
    @media only screen and (max-width:768px){
        .header .logo{
            display: none;
        }
    }
    .logo{
        flex-grow: 2;
        margin-left: 30px;
        a{
            display: flex;
            align-items: center;
            width: 100%;
            img{
                display: block;
                max-width: 2.5rem;
                height: auto;
                margin-right: 0.5rem;
            }
            h1{
                color: $color;
                font-size: 1rem;
                letter-spacing: 2px;
            }
        }

    }
    $header-height:3rem;
    .header{
        position: relative;
        display: flex;
        justify-content:flex-end;
        align-items: center;
        width: 100%;
        background-color: #fff;
        border-bottom: 0.05rem solid rgb(243, 240, 240);
        color: $color;
        // @include transition(.3s);
        cursor: pointer;
        z-index: 999;
    }
</style>
<style lang="scss">
    .header-menu{
        a{
            span{
                display:inline-block;
                text-align: center;
                margin:0 auto;
            }
        }
    }
</style>
