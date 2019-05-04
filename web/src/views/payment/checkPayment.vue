<template>
    <div>
        <h2 style="text-align: center;margin-bottom: 2rem;margin-top:4rem;">微信支付金額：50元</h2>
        <el-form>
            <el-form-item>
                <img src="../../assets/img/wxcode.png" alt="">
            </el-form-item>
            <el-form-item>
                <p class="tips">剩余操作时间：120s</p>
            </el-form-item>
            <el-form-item>
                <el-button class="btn-cancel" @click="onSubmit">取消</el-button>
            </el-form-item>
        </el-form></div>

</template>
<script>
    export default{
            data() {
                return {
                    test:'假装有二维码'
                }
            },
        methods:{
            onSubmit() {
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss">
    .btn-cancel{
        background: #7dafa7;
        color:#fff;
    }
    .tips{
        color:red;
    }
</style>
