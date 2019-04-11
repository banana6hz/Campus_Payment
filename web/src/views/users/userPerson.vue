<template>
    <div class="person-user">
        <div class="person-user-body">
            <div class="user-left-menu">
                <leftMenu
                        :default-active="defaultActive"
                        :leftMenuData='leftMenuData'
                        @isCollapse='handleIsCollapse'>
                </leftMenu>
            </div>
            <div class="pserson-router-cont"
                 :class="{'isCollapse-w':isCollapse}">
                <transition name='opa-keep' mode="in-out">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                </transition>
                <transition name='opa-mini' mode="out-in">
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import leftMenu from './leftMenu'
    import axios from 'axios'
    export default {
        components:{
            leftMenu
        },
        data(){
            return{
                defaultActive:'userInformation',
                leftMenuData:[
                    {
                        index:"1",
                        icon:'el-icon-location',
                        title:'个人中心',
                        menuItem:[
                            {route:'userInformation',listTitle:'我的信息'},
                            {route:'changePassword',listTitle:'修改密码'},
                            {route:'addInformation',listTitle:'完善个人信息'}
                        ]
                    },
                    {
                        index:"2",
                        icon:'el-icon-tickets',
                        title:'我的缴费记录',
                        menuItem:[
                            {route:'energyRecord',listTitle:'电费记录'},
                            {route:'newOrder',listTitle:'水费记录'},
                            {route:'historyOrder',listTitle:'等级考试缴费记录'},
                            {route:'userFindOrder',listTitle:'学费记录'}
                        ]
                    },
                    {
                        index:"3",
                        icon:'el-icon-message',
                        title:'我的消息',
                        menuItem:[
                            {route:'myMessage',listTitle:'消息'}
                        ]
                    },
                    {
                        index:"4",
                        icon:'el-icon-edit-outline',
                        title:'加入我们',
                        menuItem:[
                            {route:'joinUs',listTitle:'申请'}
                        ]
                    }
                ],
                isCollapse:false
            }
        },
        methods:{
            getUserInfo(){
                // let loading = this.$loading({lock:true,text:'正在加载...'});
                axios.post("/notices/userInformation").then((response)=>{
                    let res = response.data;
                    if(res.status==="0"){
                        console.log(res)
                    }else{
                        console.log(res)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            handleIsCollapse(newVal){
                this.isCollapse = newVal;
            }
        },
        created() {
            //this.getUserInfo();
        }

    }
</script>

<style lang='scss'>
    .person-user{
        position: relative;
        width: 100%;
        min-height: 100vh;
        background-color: #f7f7f7;
    }
    .person-user-body{
        position: relative;
        display: flex;
        width: 80%;
        margin: 0 auto;
    }
    .user-left-menu{
        background-color: #fff;
    }
    .pserson-router-cont{
        position: relative;
        width: 100%;
        width:  calc(100% - 10.1rem);
        min-height: 35rem;
        background-color: #fff;
        border: 1px solid rgb(228, 225, 225);
        border-top: none;
        transition: all .5s;
        background-color: darken(#f4f9fd, 0%) ;
        padding-bottom: 3rem;
    }
    .isCollapse-w{
        width:  calc(100% - 3.3rem);
    }
    .pageination-oder{  //订单页中的分页样式
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 2rem;
    }
    @media only screen and (max-width:1200px){
        .person-user-body{
            width: 90%;
        }
        .pserson-router-cont{
            min-height: 45rem;
        }
    }
    @media only screen and (max-width:992px){
        .person-user-body{
            width: 100%;
        }
    }
</style>
