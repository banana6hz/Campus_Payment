<template>
    <div class="message">
        <h2 style="text-align: center;margin-bottom: 2rem;">我的消息</h2>
        <el-collapse @change="handleReadMsg" v-model="activeName" accordion>
            <el-collapse-item  v-for="(item,index) in msgData"
                               :title="item.msgHeader"
                               :key='item._id'
                               :class="{'messageIsRead':item.isRead}"
                               :name="item._id"
            >
                <template slot="title">
                    <i class="el-icon-message"></i>
                    ( {{item.isRead ? '已读' : '未读'}} )
                </template>
                <div>{{item.msgCount}}</div>
                <div>
                    <span class="date">{{item.rules}}{{item.msgTime}}
                        <el-button @click="delMsg(index)" style="background: #7dafa7;color:#fff;">删除</el-button>
                    </span>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div class="pageination-oder">
            <el-pagination v-if="showPagination"
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           :current-page="currentPage"
                           :pager-count="5"
                           :page-sizes="[7, 15, 20]"
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
                activeName:'',
                msgData:{
                    msgHeader:'',
                    msgCount:''
                },
                currentPage : 1,
                pageSize : 7,
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
                    for(let i =0;i<res.data.result.msgList.length;i++){
                        let j = res.data.result.msgList.length - 1
                        this.msgData[i].msgCount=res.data.result.msgList[i].msgCount
                        this.msgData[i].time=res.data.result.msgList[i].time
                    }
                    this.total=res.data.result.total
                    console.log(this.msgData)
                })
            },
            delMsg(index){
                axios.post('/api/users/deleteMsg',this.msgData[index]).then(res=>{
                    console.log(this.msgData[index])
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
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getMessage();
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.getMessage();
            },
            handleReadMsg(data){
                let flag = this.msgData.filter(it=>!it.isRead && it._id===data);
                if(data !=='' && flag.length){
                    axios.get(`/api/users/readMsg?id=${flag[0]._id}`).then(response=>{
                        let res = response.data;
                        if(res.status==='0'){
                            this.getMessage();
                            gotoNewOrder.$emit('readMessage');
                        }else{
                            console.log(res.msg);
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            },
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
    .messageIsRead .el-collapse-item__header{
        color: #999; //已读消息标题颜色
    }
</style>
