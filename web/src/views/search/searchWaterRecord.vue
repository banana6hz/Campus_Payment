<template>
    <div class="table-body">
        <div class="select-group-wrap">
            <el-form :model="baseData" ref="baseData">
                <el-row :gutter="10">
                    <el-col :sm="12" :md="12">
                        <el-form-item label="时间">
                            <el-date-picker
                                    v-model="value7"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions2">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="7" :md="7">
                        <el-button class="btn-color" @click="search()">查询</el-button>
                        <el-button class="btn-color" @click="reChooseFn()">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
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
                {label:'序号', param: 'index',width:'10%'},
                {label:'交易时间', param:'paymentTime',width:'20%'},
                {label:'交易方式', param:'paymentMethod',width:'15%'},
                {label:'剩余金额（元）', param: 'restMoney',width:'20%'},
                {label:'剩余吨数(吨）', param: 'restTun',width:'20%'},
                {label:'充值金额（元）', param: 'payment',width:'20%'},
                {label:'充值吨数(吨）', param: 'buyTun',width:'20%'},
                {label:'余额（元）', param: 'restMoney',width:'20%'},
                {label:'可用吨数(吨）', param: 'tun',width:'20%'}],
                total: 0,
                currentPage: 1,
                current: 0,
                pageSize: 10,
                showPagination: true,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value6: '',
                value7: ''
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
            // 查找
            search(){
                let beginTime = new Date(this.value7[0]).getTime() / 1000
                let endTime = new Date(this.value7[1]).getTime() / 1000
                console.log(beginTime)
                console.log(endTime)
            },
            reChooseFn () {
                this.value7 = ''
                /*console.log(this.baseData)
                this.$refs[formName].resetFields()
                this.getWaterRecord()*/
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
<style lang="scss">
.table-body {
        margin: 2rem;
    }
    .btn-color{
        background: #7dafa7;
        color:#fff;
    }
    .cell{
        text-align:center;
    }
    .el-pagination{
        margin-top:2rem;
    }
</style>
