<template>
    <div class="table-body">
        <div class="select-group-wrap">
            <el-form :model="baseData" ref="baseData">
                <el-row :gutter="10">
                    <el-col :sm="6" :md="6">
                        <el-form-item label="宿舍">
                            <el-select class="select-input" v-model="room" clearable @change="selectRoom">
                            <el-option
                                    v-for="(item,index) in roomList"
                                    :key="index"
                                    :label="item.roomName"
                                    :value="item"
                            ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="6" :md="6">
                        <el-form-item label="学院">
                            <el-select class="select-input" v-model="department" clearable @change="selectDepartment">
                                <el-option
                                        v-for="(item,index) in departmentList"
                                        :key="index"
                                        :label="item.departmentName"
                                        :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="text-align: right;">
                    <el-col :sm="24" :md="24">
                        <el-button class="width85-btn" @click="search()">查询</el-button>
                        <el-button class="width85-btn" @click="reChooseFn('baseData')">重置</el-button>
                        <el-button class="width150-btn"  @click="Excel()">打印</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table-group-wrap">
            <el-table
                    :data="tableData"
                    max-height="500"
                    border
                    style="width: 100%"
                    @selection-change="changeSelectFun"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="roomName" label="宿舍" min-width="70"></el-table-column>
                <el-table-column prop="departmentName" label="学院" min-width="80"></el-table-column>
                <el-table-column prop="waterTime" label="交易时间" min-width="80"></el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes=[5,10,15]
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                roomList:[],
                // 查询条件
                baseData: {
                    date: this.formatDate(), // 默认为当前日期
                    room: null, // 宿舍Id
                    department: null, // 学院Id
                },
                room:'',
                department:'',
                departmentList:[],
                currentPage: 1,
                pageSize: 5,
                total: 0,
                loading: false,
                tableData:[]
            }
        },
        methods: {
            // 默认日期
            formatDate () {
                let date = new Date()
                let y = date.getFullYear()
                let m = date.getMonth() + 1
                m = m < 10 ? ('0' + m) : m
                let d = date.getDate()
                d = d < 10 ? ('0' + d) : d
                return y + '-' + m + '-' + d + ' '
            },
            // 学院列表
            getDepartmentList () {
                axios.get('/api/worker/getDepartment').then((res)=>{
                    if(res.data.status === "0"){
                        this.departmentList = res.data.result
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type:"error"
                        })
                    }
                })

            },
            // 获取宿舍列表
            getRoomList () {
                axios.get('/api/worker/getRoomList').then((res)=>{
                    if(res.data.status === "0"){
                        this.roomList = res.data.result
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type:"error"
                        })
                    }
                })
            },
            // 获取数据列表
            getData() {
                let param={
                    size:this.pageSize,
                    page:this.currentPage,
                    roomId:this.baseData.room,
                    departmentId:this.baseData.department
                }
                console.log(this.baseData.room)
                console.log('m',param)
                axios.post('/api/worker/getWaterRecord',param).then((res)=>{
                    if(res.data.status === "0"){
                        this.tableData = res.data.result.waterRecord
                        this.total=res.data.result.total
                    }else {
                        this.$message({
                            message:res.data.msg,
                            type:"error"
                        })
                    }
                    console.log('?',res)
                })
            },
            search(){
                this.getData()
            },
            // 重置
            reChooseFn (formName) {
                this.room = ''
                this.department = ''
                this.baseData.room = null
                this.baseData.department = null
                this.$refs[formName].resetFields()
                this.getData()
            },
            // 改变选中table的数据
            selectRoom (val) {
                this.room = val.roomName
                this.baseData.room = val.roomId
                this.currentPage = 1
                console.log(this.baseData.room)
            },
            selectDepartment(val){
                this.department = val.departmentName
                this.baseData.department = val.departmentId
                this.currentPage = 1
            },
            Excel() {

            },
            changeSelectFun() {

            },
            // 改变页数
            handleCurrentChange (current) {
                this.currentPage = current
                this.getData()
            },
            // 改变每页个数
            handleSizeChange (size) {
                this.pageSize = size
                this.getData()
            },
            // 报备表车位表
            /*gotoPage (name) {
                if (this.tableSelection.length === 1) {
                    if (name === 'report') {
                        this.$router.push({ name: 'reportSheet', query: { flightId: this.tableSelection[0].id } })
                        return
                    }
                    if (name === 'parking') {
                        this.$router.push({ name: 'parkingSheet', query: { flightId: this.tableSelection[0].id } })
                        return
                    }
                    this.$router.push({ name: name })
                } else {
                    this.$alert('请选择一张运输单')
                }
            },*/

        },
        mounted () {
            this.getData()// 数据信息
            this.getDepartmentList()// 学院列表
            this.getRoomList()// 宿舍列表
        }
    }
</script>

<style lang="scss">
    .table-body{
        margin:1rem 2rem;
        padding: 0;
    }
    .el-form-item {
        margin-bottom: 0px;
    }
    .order-btn {
        color: rgb(64, 158, 255);
        cursor: pointer;
    }
    .table-group-wrap{
        margin-top:5px;
    }
</style>
