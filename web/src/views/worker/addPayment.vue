<template>
    <div class="suggest">
        <h2 style="text-align: center;margin-bottom: 2rem;">费用修改</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="费用名称">
                <el-input v-model="form.feeName"></el-input>
            </el-form-item>
            <el-form-item label="费用单位">
                <el-input v-model="form.feeUnit"></el-input>
            </el-form-item>
            <el-form-item label="费用金额">
                <el-input v-model="form.feeNum"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                form: {
                    feeNum:null,
                    feeId:3,
                    feeName: '',
                    desc: '',
                    feeUnit:''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log(this.form)
                axios.post('/api/worker/addPayment',this.form).then((res)=>{
                    if(res.data.status==='0'){
                        this.$message({
                            message:res.data.msg,
                            type:'success'
                        })
                    }else{
                        this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .suggest{
        width:80%;
        margin:2rem auto;
        text-algin:left;
        .el-form{
            text-align: left;
        }
    }
</style>
