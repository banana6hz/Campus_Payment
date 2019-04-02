<template>
    <div class="person-user">
        <div class="person-user-body">
            <div class="user-left-menu">
                <leftMenu
                        :leftMenuData='leftMenuData'
                        @isCollapse='handleIsCollapse'>
                </leftMenu>
            </div>
            <div class="person-router-cont"
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
            <!--<div class="person-router-cont">
                <el-form :model="baseData" ref="baseData" label-width="100px">
                    <el-row :gutter="10">
                        <el-col :sm="6" :md="6">
                            <el-form-item label="宿舍">
                                <el-select class="select-input" v-model="address" clearable>
                                    <el-option
                                            v-for="(item,index) in baseData"
                                            :key="index"
                                            :label="item.address"
                                            :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" class="set-margin-top20" >
                        <el-col :sm="24" :md="24">
                            <el-button class="width85-btn" @click="search()">查询</el-button>
                            <el-button class="width85-btn" @click="reChooseFn('baseData')">重置</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>-->
        </div>
    </div>
</template>
<script>
    import leftMenu from '../users/leftMenu'
    export default {
        data () {
            return {
                leftMenuData:[
                    {
                        index:"1",
                        icon:'el-icon-location',
                        title:'缴费',
                        menuItem:[
                            {route:'waterPayment',listTitle:'热水费'},
                            {route:'energyPayment',listTitle:'电费'},
                            {route:'examPayment',listTitle:'等级考试费'},
                            {route:'schoolPayment',listTitle:'学费'},
                        ]
                    }
                ],
                isCollapse:false,
                baseData: [{
                    address: '22栋'
                },{
                    address:'15栋'
                }]
            }
        },
        components: {
            leftMenu
        },
        method: {
            // 查询
            search () {

            },
            // 重置
            reChooseFn (formName) {
                this.$refs[formName].resetFields()
            },
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
        padding-top: 2rem;
    }
    .person-user{
        position: relative;
        width: 100%;
        min-height: 100vh;
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
