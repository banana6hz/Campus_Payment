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
                defaultActive:'editPayment',
                leftMenuData:[
                    {
                        index:"1",
                        icon:'el-icon-location',
                        title:'费用修改',
                        menuItem:[
                            {route:'editPayment',listTitle:'修改热水费用'},
                            {route:'editE',listTitle:'修改电费'},
                            {route:'editS',listTitle:'修改学费'}
                        ]
                    },{
                        index:"2",
                        icon:'el-icon-location',
                        title:'费用增加',
                        menuItem:[
                            {route:'addPayment',listTitle:'增加收费'}
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
        margin: 0 auto;
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
