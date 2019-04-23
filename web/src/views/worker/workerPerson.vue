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
    import leftMenu from '../users/leftMenu'
    import axios from 'axios'
    export default {
        components:{
            leftMenu
        },
        data(){
            return{
                defaultActive:'workerInformation',
                leftMenuData:[
                    {
                        index:"1",
                        icon:'el-icon-location',
                        title:'个人中心',
                        menuItem:[
                            {route:'workerInformation',listTitle:'我的信息'},
                            {route:'changePassword',listTitle:'修改密码'},
                            {route:'addInformation',listTitle:'完善个人信息'}
                        ]
                    }
                ],
                isCollapse:false
            }
        },
        methods:{
            checkLogin(){
                // let loading = this.$loading({lock:true,text:'正在加载...'});
                /* axios.get("/users/checkLogin").then((response)=>{
                     let res = response.data;
                     loading.close();
                     if(res.status==="0"){

                     }else{
                         this.$message({
                             message: '当前未登录!',
                             type: 'error',
                             showClose:true
                         });
                         this.$router.push({ path: '/login' });
                     }
                 }).catch(err=>{
                     loading.close();
                     console.log(err);
                 })*/
            },
            handleIsCollapse(newVal){
                this.isCollapse = newVal;
            }
        },
        created() {
            this.checkLogin();
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
        background-color: #fff ;
        padding-bottom: 3rem;
    }
    .isCollapse-w{
        width:  calc(100% - 3.3rem);
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
