<template>
    <div>
        <h2 style="text-align: center;margin-bottom: 2rem;margin-top:4rem;">微信支付金額：50元</h2>
        <el-form>
            <el-form-item>
                <img src="../../assets/img/wxcode.png" alt="">
            </el-form-item>
            <el-form-item>
                <p class="tips">{{content}}</p>
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
                    test:'假装有二维码',
                    content:'',
                    totalTime: 120
                }
            },
        methods:{
            onSubmit() {
                this.$router.go(-1);
            },
            countDown() {
                let clock = window.setInterval(() => {
                    this.totalTime--
                    this.content = '剩余操作时间：' + this.totalTime + 's后重新发送'
                    if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
                        window.clearInterval(clock)
                        this.$router.go(-1)
                    }
                },1000)
            }
        },
        created() {
            this.countDown()
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
