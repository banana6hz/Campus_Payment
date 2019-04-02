<template>
    <div>
        <arrearage :arrearageData="arrearageData"></arrearage>
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
                    src: require('../../assets/img/chargeMoney.png'),
                    alt: '电'
                },{
                    title: '可用电量',
                    test: 222,
                    unit: '度',
                    src: require('../../assets/img/charge.png'),
                    alt: '电'
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
