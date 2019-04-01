<template>
    <div>
        <div :router='true' v-for="item in arrearageData">
            {{item.test}}
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            arrearageData:Array
        },
        data() {
            return {
                isCollapse: false,//默认展开
                arrearageData:this.arrearageData,
                // defaultActive:'userInformation'
            };
        },
    }
</script>
