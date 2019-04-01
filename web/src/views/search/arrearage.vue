<template>
    <div>
        <div  ref="leftMenu" v-for="(obj) in menuData">
            <p>{{obj.test}}</p>
            <p>test</p>
        </div>
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
                // defaultActive:'userInformation'
            };
        },
    }
</script>
