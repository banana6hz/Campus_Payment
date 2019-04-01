<template>
    <div>
        <arrearage></arrearage>
    </div>
</template>
<script>
    import arrearage from './arrearage'
    export default {
        data () {
            return {
                baseData: [{
                    test: '查询电费'
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
