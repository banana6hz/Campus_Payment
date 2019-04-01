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
                baseData: [{test: '水费缴纳记录'}]
            }
        },
        components: {
            record
        }
    }
</script>
<style>

</style>
