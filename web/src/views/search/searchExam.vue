<template>
    <div>
        <arrearage :arrearageDatas="arrearageData"></arrearage>
    </div>
</template>
<script>
    import arrearage from './arrearage'
    export default {
        data () {
            return {
                arrearageData: [{
                    test: '查询等级考试费用'
                },{
                    test: 222
                }]
            }
        },
        components: {
            arrearage
        }
    }
</script>
<style>

</style>
