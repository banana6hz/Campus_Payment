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
                leftMenuData: [{
                    test: "查找水费"
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
