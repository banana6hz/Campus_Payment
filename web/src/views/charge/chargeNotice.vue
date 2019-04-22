<template>
    <div class="notice-body">
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="费用"
                    >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="单价"
                    >
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="单位">
            </el-table-column>
        </el-table>
        <div class="btn-back">
            <el-button @click="goBack">返回</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '热水费',
                    name: '10',
                    address: '/吨'
                }, {
                    date: '电费',
                    name: '0.69',
                    address: '/度'
                }, {
                    date: '网费',
                    name: '5',
                    address: '/月'
                }, {
                    date: '学费',
                    name: '5800',
                    address: '/学年'
                }]
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            }
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
