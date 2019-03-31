<template>
<div class="personLeftMenu">
    <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    :router='true'
    ref="leftMenu"
    menu-trigger='click'
    :collapse="isCollapse">
        <el-submenu
        v-for="item in menuData"
        :key='item.index'
        :index='item.index'>
             <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </template>
            <el-badge  slot="title" :max="9"
                v-if="item.title==='我的消息'"
                class="message-badeg"></el-badge>
            <el-menu-item-group>
                <el-menu-item
                v-for="it in item.menuItem"
                :key='it.route'
                :index="it.route" >{{it.listTitle}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</div>
</template>

<script>
  export default {
    props:{
        leftMenuData:Array
    },
    data() {
      return {
        isCollapse: false,//默认展开
        menuData:this.leftMenuData,
        defaultActive:'userInformation'
      };
    },
  }
</script>

<style lang='scss'>
.personLeftMenu{
    position: relative;
    text-align: right;
    height: 100%;
    border-left: 0.05rem solid rgb(236, 236, 236);
    border-bottom: 0.05rem solid rgb(236, 236, 236);
    z-index: 99;
    .menu-btn{
        position: absolute;
        right: -1.5rem;
        top: 0;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.8rem;
        color: #409EFF;
        z-index: 99;
    }
    .message-badeg{
        position: absolute;
        top: -0.6rem;
        right: 1.5rem;
    }
    /* 菜单 */
    .el-menu-vertical-demo,
    .el-menu{
        background-color: transparent;
        text-align: center;
        border-right: none;
    }
    .el-submenu__title,
    .el-submenu__title i{
        color: #888;
    }
    // 展开后的子菜单
    .el-menu-item{
        min-width:100px;
        padding:0;
        background-color: #fff;
        color: #777;
        border-bottom: 0.05rem solid rgb(238, 236, 236);
        &:hover{
        background-color: #ecf5ff;
        }
    }
    .el-menu-item.is-active{
        color: #7dafa7;
    }
    // 一级菜单
    .el-submenu__title{
        border-bottom: 0.05rem solid rgb(236, 236, 236);
    }
    // 当前打开的菜单
    .el-submenu.is-active{
        .el-submenu__title{
            background-color: #7dafa7;
            color: #fff;
        }
        .el-submenu__title i{
            color: #fff;
        }
    }
    /* 菜单收起宽度 */
    .el-menu--collapse{
        width: 3.2rem;
    }
    /* 菜单展开宽度 */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 11rem;
    min-height: 20rem;
    }
}
@media only screen and (max-width:992px){
    .personLeftMenu{
        .message-badeg{
            right: 1rem;
            top: -0.8rem;
        }
    }
}
</style>
