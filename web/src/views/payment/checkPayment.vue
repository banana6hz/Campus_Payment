<template>
    <div>
        <h2 style="text-align: center;margin-bottom: 2rem;margin-top:4rem;">支付成功</h2>
        <el-form class="payForm">
            <el-form-item>
                <p class="left">交易方式:</p>
                <p class="right">{{this.$route.query.type}}</p>
            </el-form-item>
            <el-form-item>
                <p class="left">订单号:</p>
                <p class="right">{{this.$route.query.outTradeId}}</p>
            </el-form-item>
            <el-form-item>
                <p class="left">交易时间:</p>
                <p class="right">{{this.$route.query.paymentTime}}</p>
            </el-form-item>
            <el-form-item>
                <p class="left">交易金额:</p>
                <p class="right">{{this.$route.query.amount}}元</p>
            </el-form-item>
            <el-form-item>
                <el-button class="btn-cancel" @click="back">返回主页</el-button>
            </el-form-item>
        </el-form></div>

</template>
<script>
    export default{
            data() {
                return {
                    totalTime: 120,
                    paymentMethod: 0,
                    payment: 0
                }
            },
        methods:{
            back() {
                this.$router.push('/homePage');
            },
            countDown() {
                // let clock = window.setInterval(() => {
                //     this.totalTime--
                //     this.content = '剩余操作时间：' + this.totalTime + 's后重新发送'
                //     if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
                //         window.clearInterval(clock)
                //         this.$router.go(-1)
                //     }
                // },1000)
            }
        },
        created() {
            this.countDown()
            this.$route.query.type = this.$route.query.type[0]
            console.log(this.$route.query)
        }
    }
</script>
<style lang="scss">
    .btn-cancel{
        background: #7dafa7;
        color:#fff;
    }
    .payForm {
        margin: 0 auto;
        width: 500px;
    }
    .tips{
        color:red;
    }
    .left{
        float:left;
        font-weight: bold;
        text-align: right;
        min-width: 40%;
    }
    .right {
        float: left;
        text-align: left;
        padding-left: 85px;
    }
</style>
