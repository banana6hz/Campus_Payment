<template>
    <div class="notice-body">
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="feeName"
                    label="费用"
                    >
            </el-table-column>
            <el-table-column
                    prop="feeNum"
                    label="单价"
                    >
            </el-table-column>
            <el-table-column
                    prop="feeUnit"
                    label="单位">
            </el-table-column>
        </el-table>
        <div class="btn-back">
            <el-button @click="goBack">返回</el-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getFee(){
                axios.get('/api/users/getFees').then((res)=>{
                    console.log(res)
                    if(res.data.status==='0'){
                        this.tableData=res.data.result
                        console.log(res.data.result)
                    }else{
                        this.$message({
                            message:res.data.msg,
                            type:"error"
                        })
                    }
                })
            }
        },
        mounted(){
            this.getFee()
        }
    }
</script>
<style class="scss">
    .notice-body {
        margin: 3rem auto;
        width:60%;
        /*min-height:calc(100vh - 80px);*/
    }
    .el-table .cell{
        text-align:center;
    }
    .btn-back {
        text-align: right;
        margin:3rem;
    }
</style>
