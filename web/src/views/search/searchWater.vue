<template>
    <div>
        <arrearage :arrearageDatas='arrearageData'></arrearage>
    </div>
</template>
<script>
    import arrearage from './arrearage'
    export default {
        data () {
            return {
                arrearageData: [{
                    title: '余额',
                    test: 88,
                    unit: '元',
                    src: require('../../assets/img/waterCard.png'),
                    alt: '热水卡'
                },{
                    title: '可用立方数',
                    test: 222,
                    unit: '立方',
                    src: require('../../assets/img/water.png'),
                    alt: '热水'
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
