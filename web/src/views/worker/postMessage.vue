<template>
    <div class="paymentForm">
        <h2 style="text-align: center;line-height:5rem;">信息发布</h2>
        <el-form :model="baseData" ref="baseData" label-width="80px">
            <el-form-item label="标题">
                <el-input type="test" v-model="baseData.msgHeader"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type="textarea" :rows="10" v-model="baseData.msgCount"></el-input>
            </el-form-item>
            <el-form-item label="接收人">
                <el-form>
                    <el-row :gutter="10">
                        <el-radio-group v-model="baseData.type" @change="chooseRadio">
                            <el-radio label="全部学生"></el-radio>
                            <el-radio label="筛选学生"></el-radio>
                        </el-radio-group>
                    </el-row>
                    <el-row :gutter="10" v-if="choose">
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
                </el-form>
            </el-form-item>
            <el-form-item style="text-align: right;">
                <el-button type="primary" @click="onSubmit">立即发布</el-button>
                <el-button class="btn-cancel" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                choose:false,
                roomList:[],
                // 查询条件
                baseData: {
                    msgTime:'',
                    msgHeader:'',
                    msgCount:'',
                    msgRule:0,
                    msgRoom:'',
                    msgDepartment:'',
                    type:"全部学生"
                },
                room:'',
                department:'',
                departmentList:[],
            }
        },
        mounted () {
            this.getDepartmentList()// 学院列表
            this.getRoomList()// 宿舍列表
        },
        methods: {
            chooseRadio(val){
                if(val==='筛选学生'){
                    this.choose=true
                    this.baseData.msgRule=1
                }else{
                    this.choose=false
                    this.baseData.msgRule=0
                }
                console.log(this.choose)
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
            // 改变选中table的数据
            selectRoom (val) {
                this.room = val.roomName
                this.baseData.msgRoom = val.roomName
            },
            selectDepartment(val){
                this.department = val.departmentName
                this.baseData.msgDepartment = val.departmentName
            },
            CurrentTime() {
                let now = new Date();

                let year = now.getFullYear();       //年
                let month = now.getMonth() + 1;     //月
                let day = now.getDate();            //日

                let hh = now.getHours();            //时
                let mm = now.getMinutes();          //分
                let ss = now.getSeconds();           //秒

                this.baseData.msgTime = year + "-";
                if(month < 10){
                    this.baseData.msgTime += "0";
                    this.baseData.msgTime += month + "-";
                }else{
                    this.baseData.msgTime += month + "-";
                }
                if(day < 10){
                    this.baseData.msgTime += "0";
                    this.baseData.msgTime += day + " ";
                }else{
                    this.baseData.msgTime += day + " ";
                }
                if(hh < 10){
                    this.baseData.msgTime += "0";
                    this.baseData.msgTime += hh + ":";
                }else{
                    this.baseData.msgTime += hh + ":";
                }
                if (mm < 10) {
                    this.baseData.msgTime += '0';
                    this.baseData.msgTime += mm + ":";
                }else{
                    this.baseData.msgTime += mm + ":";
                }
                if (ss < 10) {
                    this.baseData.msgTime += '0';
                    this.baseData.msgTime += ss;
                }else{
                    this.baseData.msgTime += ss;
                }
            },
            onSubmit() {
                this.CurrentTime()
                console.log(this.baseData)
                axios.post('/api/worker/addMessage', this.baseData).then(res=>{
                    if(res.data.status === '0'){
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }else{
                        console.log(res.data.status)
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
                axios.post('/api/worker/addUserMessage', this.baseData).then(res=>{
                    if(res.data.status === '0'){
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }else{
                        console.log(res.data.status)
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
            },
            cancel() {
                this.$router.go(-1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .paymentForm {
        width:80%;
        margin:0 auto;
        text-align: left;
    }
</style>
<style lang="scss">
    .el-radio__input.is-checked .el-radio__inner {
        background-color: #7dafa7;
        border-color: #7dafa7;
    }
    .el-radio__inner:hover {
        border-color: #7dafa7;
    }
    .el-radio__input.is-checked+.el-radio__label, .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #7dafa7;
    }
    .btn-cancel:hover{
        border-color: #7dafa7;
        color: #7dafa7;
        background-color:#edf7f5;
    }
    .el-button--primary{
        background-color: #7dafa7;
        border-color: #7dafa7;
        &:hover {
            background-color: #7dafa7;
            border-color: #7dafa7;
        }
    }
    .el-select .el-input__inner:focus  {
        border-color: #7dafa7;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border-color: #7dafa7;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #7dafa7;
        border-color: #7dafa7;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner{
        border-color: #7dafa7;
    }
</style>
