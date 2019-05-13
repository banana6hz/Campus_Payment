<template>
    <div class="homeHeader">
        <div class="homeBackground">
            <div class="appHome">
                <div class="header_banner">
                    <homeBanner
                            :bannerImg='bannerImg'></homeBanner>
                </div>
            </div>
            <news :newsSoure='newsSoure' v-if="gotoPage"></news>
            <news :newsSoure='newsSoure1' v-if="!gotoPage"></news>
        </div>
    </div>
</template>
<script>
    import homeBanner from '../../components/banner'
    import news from '../../components/news'
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                loginState:true,
                worker:null,
                bannerImg: [
                    {id: 1, imgSrc:require( '../../../static/img/banner1.jpg')},
                    {id: 2, imgSrc: require('../../../static/img/banner2.jpg')},
                    {id: 3, imgSrc: require('../../../static/img/banner3.jpg')},
                    {id: 4, imgSrc: require('../../../static/img/banner4.jpg')},
                    {id: 5, imgSrc: require('../../../static/img/banner5.jpg')}
                ],
                newsSoure:[
                    {id:1,title:'查询',imgSrc:require('../../../static/img/home-news-pic1.jpg'),
                        article:``,path:'/search'
                    },
                    {id:2,title:'缴费',imgSrc:require('../../../static/img/home-news-pic5.jpg'),
                        article:``,path:'/payment'
                    },
                    {id:3,title:'收费公示',imgSrc:require('../../../static/img/home-news-pic3.jpg'),
                        article:``,path:'/chargeNotice'
                    },
                    {id:4,title:'投诉建议',imgSrc:require('../../../static/img/home-news-pic6.jpg'),
                        article:``,path:'/suggest'
                    }
                ],
                newsSoure1:[
                    {id:1,title:'查询',imgSrc:require('../../../static/img/home-news-pic1.jpg'),
                        article:``,
                        path:'/workerSearch',
                    },
                    {id:2,title:'费用管理',imgSrc:require('../../../static/img/home-news-pic3.jpg'),
                        article:``,path:'/changePayment'
                    },
                    {id:3,title:'查看费用',imgSrc:require('../../../static/img/home-news-pic4.jpg'),
                        article:``,path:'/waiting'
                    },
                    {id:4,title:'消息中心',imgSrc:require('../../../static/img/home-news-pic2.jpg'),
                        article:``,path:'/message'
                    }
                ]
            }
        },
        components:{
            homeBanner,
            news
        },
        computed:{
            ...mapState({
                userId:state=>state.user.userInfo.userId
            }),
            currentPage(){
                return this.$route.path.split('/')[1];
            },
            gotoPage(){
                if(this.$store.state.user.userInfo.userType === 0){
                    return true
                } else {
                    return false
                }
                if(this.grade===1){
                    return 'wokerPerson'
                }else{
                    return 'userPerson'
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../style/_mixin.css";
    .homeBackground{
        // height: 100%;
        margin: 0 auto;
        width: 80%;
        border-left:1px solid #7dafa7;
        border-right:1px solid #7dafa7;
        border-bottom:1px solid #fff;
        // background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);
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
        color: #3498db;
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
