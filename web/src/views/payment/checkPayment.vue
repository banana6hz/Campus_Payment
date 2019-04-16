<template>
    <div>
        <el-form>
            <el-form-item>{{test}}</el-form-item>
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
