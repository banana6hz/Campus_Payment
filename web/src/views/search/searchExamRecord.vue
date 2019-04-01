<template>
    <div>
        <record></record>
    </div>
</template>
<script>
    import record from './record'
    export default {
        data () {
            return {
                baseData: [{test: '等级考试缴纳记录'}]
            }
        },
        components: {
            record
        }
    }
</script>
<style>

</style>
