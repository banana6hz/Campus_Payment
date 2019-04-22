<template>
    <div>
         <div class="table-body">
            <el-table :data="recordData"
                      empty-text="暂无数据呢"
                      border>
                <el-table-column
                        v-for="(item,index) in tableLabel"
                        :min-width="item.width"
                        :key="index"
                        :label="item.label"
                        :prop="item.param"
                        :fixed="item.fixed"
                        :stripe="item.stripe">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    :total="total"
                    layout='total, sizes, prev, pager, next, jumper'
            ></el-pagination>
        </div>
    </div>
</template>
<script>
    import record from './record'
    import axios from 'axios'
    export default {
        data () {
            return {
                pageSizes:[5,10,15],
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
            currentChange(val) {
                this.currentPage = val;
                this.getWaterRecord()
            },
            sizeChange(val) {
                this.pageSize=val;
                this.getWaterRecord()
            },
            // 获取水费记录
            getWaterRecord(){
                this.recordData = []
                console.log(this.currentPage)
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
.table-body {
        margin: 2rem;
    }
    .cell{
        text-align:center;
    }
</style>
