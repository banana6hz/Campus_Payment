<template>
    <div>
        <div class="table-body">
            <el-table :data="recordData"
                      empty-text="暂无数据呢"
                      border>
                <el-table-column
                        v-for="(item,index) in tableLabel"
                        :key="index"
                        :label="item.label"
                        :prop="item.param"
                        :fixed="item.fixed"
                        :stripe="item.stripe">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    :layout="layout"
                    :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            // 表格数据源
            recordDatas:{
                type:Array
            },
            // 表格字段展示
            tableLabel:{
                type:Array,
                default:()=>{}
            },
            currentPage: {
                default() {
                    return 1;
                },
                type: Number
            },
            pageSizes: {
                default() {
                    return [5, 10, 20];
                },
                type: Array
            },
            pageSize: {
                default() {
                    return 10;
                },
                type: Number
            },
            layout: {
                default() {
                    return 'total, sizes, prev, pager, next, jumper';
                },
                type: String
            },
            total: {
                default() {
                    return 0;
                },
                type: Number
            }
        },
        data() {
            return {
                isCollapse: false,//默认展开
                recordData:this.recordDatas,
                // defaultActive:'userInformation'
            }
        },
        methods: {
            handleSizeChange(val) {
                this.$emit('size-change', val);
            },
            handleCurrentChange(val) {
                this.$emit('current-change', val);
            }
        }
    }
</script>
<style>
    .table-body {
        margin: 2rem;
    }
</style>
