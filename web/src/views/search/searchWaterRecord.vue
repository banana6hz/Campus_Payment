<template>
    <div>
        <record :recordDatas="recordData" :table-label="tableLabel" :total="total"></record>
    </div>
</template>
<script>
    import record from './record'
    import axios from 'axios'
    export default {
        data () {
            return {
                recordData: [],
                tableLabel: [
                {label:'序号', param: 'index',width:'6%'},
                {label:'交易时间', param:'paymentTime',width:'14%'},
                {label:'剩余金额（元）', param: 'restMoney',width:'15%'},
                {label:'剩余吨数(吨）', param: 'restTun',width:'15%'},
                {label:'充值金额（元）', param: 'money',width:'15%'},
                {label:'充值吨数(吨）', param: 'buyTun',width:'15%'},
                {label:'余额（元）', param: 'restMoney',width:'15%'},
                {label:'可用吨数(吨）', param: 'tun',width:'15%'}],
                total: 0,
                currentPage: 1,
                current: 0,
                pageSizes: 5,
                pageSize: 5,
                showPagination: true
            }
        },
        components: {
            record
        },
        mounted() {
            this.getWaterRecord()
        },
        methods: {
            handleCurrentChange: function(val) {
                console.log('当前页：' + val);
                this.getWaterRecord()
            },
            // 获取水费记录
            getWaterRecord(){
                axios.get(`/api/users/waterRecord?size=${this.pageSize}&page=${this.currentPage}`).then(response=>{
                let res = response.data;
                if(res.status==='0'){
                    this.recordData = res.result.waterRecord;
                    console.log(this.recordData)
                    this.total = Number.parseInt(res.result.total);
                    if(this.total <= this.pageSize){
                        this.showPagination = false
                    }
                }else{
                    console.log(res.msg);    
                }
                }).catch(err=>{
                    console.log(err);
                    
                })
            }
        }
    }
</script>
<style>
    .cell{
        text-align:center;
    }
</style>
