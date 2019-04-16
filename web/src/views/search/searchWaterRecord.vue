<template>
    <div>
        <record :recordDatas='recordData' :table-label="tableLabel"></record>
    </div>
</template>
<script>
    import record from './record'
    export default {
        data () {
            return {
                recordData: [
                    {index: '0',buyTun: '10',restTun: '20',money:'30',restMoney:'60',paymentTime:'2018-10-10'},
                    {index: '1',buyTun: '20',restTun: '20',money:'60',restMoney:'60',paymentTime:'2019-03-01'},
                    {index: '0',buyTun: '10',restTun: '20',money:'30',restMoney:'60',paymentTime:'2018-10-10'},
                    {index: '1',buyTun: '20',restTun: '20',money:'60',restMoney:'60',paymentTime:'2019-03-01'},
                    {index: '0',buyTun: '10',restTun: '20',money:'30',restMoney:'60',paymentTime:'2018-10-10'},
                    {index: '1',buyTun: '20',restTun: '20',money:'60',restMoney:'60',paymentTime:'2019-03-01'},
                    {index: '0',buyTun: '10',restTun: '20',money:'30',restMoney:'60',paymentTime:'2018-10-10'},
                    {index: '1',buyTun: '20',restTun: '20',money:'60',restMoney:'60',paymentTime:'2019-03-01'},
                    {index: '0',buyTun: '10',restTun: '20',money:'30',restMoney:'60',paymentTime:'2018-10-10'},
                    {index: '1',buyTun: '20',restTun: '20',money:'60',restMoney:'60',paymentTime:'2019-03-01'},
                    {index: '0',buyTun: '10',restTun: '20',money:'30',restMoney:'60',paymentTime:'2018-10-10'},
                    {index: '1',buyTun: '20',restTun: '20',money:'60',restMoney:'60',paymentTime:'2019-03-01'},
                    {index: '0',buyTun: '10',restTun: '20',money:'30',restMoney:'60',paymentTime:'2018-10-10'},
                    {index: '1',buyTun: '20',restTun: '20',money:'60',restMoney:'60',paymentTime:'2019-03-01'},
                    {index: '0',buyTun: '10',restTun: '20',money:'30',restMoney:'60',paymentTime:'2018-10-10'},
                    {index: '1',buyTun: '20',restTun: '20',money:'60',restMoney:'60',paymentTime:'2019-03-01'}],
                tableLabel: [
                    {label:'序号', param: 'index',width:'6%'},
                    {label:'交易时间', param:'paymentTime',width:'14%'},
                    {label:'剩余金额（元）', param: 'restMoney',width:'15%'},
                    {label:'剩余吨数(吨）', param: 'restTun',width:'15%'},
                    {label:'充值金额（元）', param: 'money',width:'15%'},
                    {label:'充值吨数(吨）', param: 'buyTun',width:'15%'},
                    {label:'余额（元）', param: 'restMoney',width:'15%'},
                    {label:'可用吨数(吨）', param: 'restTun',width:'15%'}],
                total: 0,
                currentPage: 0,
                current: 0,
                pageSizes: 5,
                pageSize: 5
            }
        },
        components: {
            record
        },
        methods: {
            handleCurrentChange: function(val) {
                console.log('当前页：' + val);
            }
        }
    }
</script>
<style>
    .cell{
        text-align:center;
    }
</style>
