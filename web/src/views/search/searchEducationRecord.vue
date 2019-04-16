<template>
    <div>
        <record :recordDatas="recordData"></record>
    </div>
</template>
<script>
    import record from './record'
    export default {
        data () {
            return {
                recordData: [{test: '学费记录'}]
            }
        },
        components: {
            record
        }
    }
</script>
<style>

</style>
