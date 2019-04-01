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
                baseData: [{test: '电费记录'}]
            }
        },
        components: {
            record
        }
    }
</script>
<style>

</style>
