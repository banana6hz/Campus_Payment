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
            <div class="person-router-cont"
                 :class="{'isCollapse-w':isCollapse}">
                <transition name='opa-keep' mode="in-out">
                    <keep-alive>
                        <!-- 所有路径匹配到的视图组件都会被缓存！ -->
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
    export default {
        data () {
            return {
                defaultActive:'workerWaterSearch',
                leftMenuData:[
                    {
                        index:"1",
                        icon:'el-icon-location',
                        title:'水费',
                        menuItem:[
                            {route:'workerWaterSearch',listTitle:'水费记录'},
                        ]
                    },
                    {
                        index:"2",
                        icon:'el-icon-document',
                        title:'电费',
                        menuItem:[
                            {route:'workerEnergySearch',listTitle:'电费记录'},
                        ]
                    },
                    {
                        index:"3",
                        icon:'el-icon-edit',
                        title:'等级考试费',
                        menuItem:[
                            {route:'searchExam',listTitle:'未缴纳等级考试费'},
                            {route:'searchExamRecord',listTitle:'等级考试费缴纳记录'}
                        ]
                    },
                    {
                        index:"4",
                        icon:'el-icon-bell',
                        title:'学费',
                        menuItem:[
                            {route:'searchEducation',listTitle:'未缴纳学费'},
                            {route:'searchEducationRecord',listTitle:'学费缴纳记录'},
                        ]
                    }
                ],
                isCollapse:false
            }
        },
        components: {
            leftMenu
        },
        methods: {
            handleIsCollapse(newVal){
                this.isCollapse = newVal;
            }
        }
    }
</script>
<style>
    .person-user-body{
        position: relative;
        display: flex;
        width: 80%;
        margin: 2rem auto 0;
    }
    .person-user{
        position: relative;
        width: 100%;
        background-color: #f7f7f7;
    }
    .person-router-cont{
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
</style>
