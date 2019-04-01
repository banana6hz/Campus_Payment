<template>
    <div>
        <arrearage :arrearageData='arrearageData'></arrearage>
    </div>
</template>
<script>
    import arrearage from './arrearage'
    export default {
        data () {
            return {
                arrearageData: [{
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
