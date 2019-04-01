<template>
    <div>
        <record :recordData="recordData"></record>
    </div>
</template>
<script>
    import record from './record'
    export default {
        data () {
            return {
                recordData: [{test: '电费记录'}]
            }
        },
        components: {
            record
        }
    }
</script>
<style>

</style>
