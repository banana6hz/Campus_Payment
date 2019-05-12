<template>
    <div class="paymentForm">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="充值类型">
                <p>热水充值</p>
            </el-form-item>
            <el-form-item label="账户余额">
                <p>二五八万</p>
            </el-form-item>
            <el-form-item label="水卡账号">
                <p>19900420</p>
            </el-form-item>
            <el-form-item label="交易方式">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="支付宝" name="type"></el-checkbox>
                    <el-checkbox label="微信" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="缴费金额">
                <el-radio-group v-model="form.amount">
                    <el-radio label="20"></el-radio>
                    <el-radio label="50"></el-radio>
                    <el-radio label="80"></el-radio>
                    <el-radio label="100元"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即支付</el-button>
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
                form: {
                    subject: '热水支付',// 订单标题
                    body: '订单描述',// 订单描述
                    outTradeId: '',// 订单号
                    amount: 0.1,// 金额
                    type: [],
                    note: '',
                    createTime:'',
                    paymentTime:'',
                    buyTun:0
                },
                totalTime: 120
            }
        },
        methods: {
            CurrentTime() {
                let now = new Date();
                let year = now.getFullYear();       //年
                let month = now.getMonth() + 1;     //月
                let day = now.getDate();            //日
                let hh = now.getHours();            //时
                let mm = now.getMinutes();          //分
                let ss = now.getSeconds();           //秒
                this.form.paymentTime = year + "-";
                if(month < 10){
                    this.form.paymentTime += "0";
                    this.form.paymentTime += month + "-";
                }else{
                    this.form.paymentTime += month + "-";
                }
                if(day < 10){
                    this.form.paymentTime += "0";
                    this.form.paymentTime += day;
                }else{
                    this.form.paymentTime += day;
                }
            },
            onSubmit() {
                this.CurrentTime()
                this.form.createTime = Math.round(new Date()/1000);
                this.form.outTradeId = this.form.createTime.toString() + Math.round(Math.random()*23 + 10000).toString();
                let winHandler = window.open('', '_blank')
                axios.post('/api/pay',this.form).then(res=>{
                    console.log('back',res.data.result)
                    winHandler.location.href = res.data.result
                    // if(res.data.status === '0'){
                    //     this.$router.push({path: '/checkPayment'})
                    //     this.$message({
                    //         message: res.data.msg,
                    //         type: 'success'
                    //     });
                    // }else{
                    //     this.$message({
                    //         message: res.data.msg,
                    //         type: 'error'
                    //     });
                    // }
                })
                /*axios.get('/api/pay',this.form).then(res=>{

                    if(res.data.status === '0'){
                        /!*this.$router.push({path: '/checkPayment'})*!/
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })*/
            },
            cancel(){
                this.$router.push('/homePage')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .paymentForm {
        padding: 4rem 8rem;
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
