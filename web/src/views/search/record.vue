<template>
    <div>
        <div :router='true' v-for="item in recordData">
            <p>{{item.test}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            recordData:Array
        },
        data() {
            return {
                isCollapse: false,//默认展开
                recordData:this.recordData,
                // defaultActive:'userInformation'
            };
        },
    }
</script>
