<template>
    <div class="message">
        <h2 style="text-align: center;margin-bottom: 2rem;">发件箱</h2>
        <el-collapse accordion v-for="(item,index) in msgData">
            <el-collapse-item :title="item.msgHeader">
                <template slot="item.msgHeader">
                    {{item.msgHeader}}
                </template>
                <div>{{item.msgCount}}</div>
                <div>
                    <span>{{item.msgRule}}</span>
                    <span class="date">{{item.msgTime}}
                        <el-button @click="delMsg(index)">删除</el-button>
                    </span>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div class="pageination-oder">
            <el-pagination v-if="showPagination"
                           background
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           :current-page="currentPage"
                           :pager-count="5"
                           :page-sizes="[5, 10, 15]"
                           :page-size="pageSize"
                           layout="total, prev, pager, next, sizes,jumper"
                           :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                msgData:{
                    msgHeader:'',
                    msgCount:''
                },
                currentPage : 1,
                pageSize : 5,
                total : 0,
                showPagination : true,
            }
        },
        created(){
            this.getMessage()
        },
        methods:{
            getMessage(){
                axios.get(`/api/users/msgList?size=${this.pageSize}&page=${this.currentPage}`).then(res=>{
                    this.msgData=res.data.result.msgList
                    console.log(this.pageSize)
                    for(let i =0;i<res.data.result.msgList.length;i++){
                        this.msgData[i].msgCount=res.data.result.msgList[i].msgCount
                        this.msgData[i].msgTime=res.data.result.msgList[i].msgTime
                        if(res.data.result.msgList[i].msgRule === 1){
                            this.msgData[i].msgRule='权限：'+ res.data.result.msgList[i].msgRoom+' '+res.data.result.msgList[i].msgDepartment
                        }else{
                            this.msgData[i].msgRule = '权限：'+'全校学生'
                        }
                    }
                    this.total = Number.parseInt(res.data.result.total);
                    /*if(this.total <= this.pageSize){
                        this.showPagination = false
                    }*/
                    console.log(this.msgData)
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getMessage();
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.getMessage();
            },
            delMsg(index){
                axios.post('/api/users/deleteMsg',this.msgData[index]).then(res=>{
                    if(res.data.status==='0'){
                        this.$message({
                            message: '删除成功!',
                            type: 'success',
                            showClose:true
                        });
                        this.getMessage();
                    }else{
                        this.$message({
                            message: '删除失败! 请重试',
                            type: 'error',
                            showClose:true
                        });
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>
<style lang="scss">
    .message {
        margin:3rem 5rem;
        .el-button{
            position: relative;
            left:5px;
            padding:4px;
            font-size:2px
        }
        .el-collapse{
            border:1px solid #EBEEF5;
        }
        .el-collapse-item__header{
            padding:0 2rem;
        }
        .el-collapse-item__header.is-active{
            border-bottom:1px dashed #EBEEF5;
        }
        .el-collapse-item__content{
            padding-top:1rem;
        }
    }
    .date{
        display: block;
        color:#9c9d9c;
        position: relative;
        right:66px;
        text-align: right;
    }
    .el-collapse-item__content{
        padding-bottom: 5px;
    }

</style>

