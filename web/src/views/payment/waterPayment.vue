<template>
    <div class="paymentForm">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="充值类型">
                <p>热水卡充值</p>
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
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="缴费金额">
                <el-radio-group v-model="form.payment">
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
                <el-button class="btn-cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    payment: 0,
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.$router.push('/checkPayment')
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
