<template>
    <div class="myMessage">
        <h2 style="text-align: center;margin-bottom: 2rem;">收件箱</h2>
        <div class="myMessage-cont">
            <el-collapse
                    @change="handleReadMsg"
                    v-model="activeName" accordion>
                <el-collapse-item
                        v-for='item in userMessage'
                        :key='item._id'
                        :class="{'messageIsRead':item.isRead}"
                        :title="item._id"
                        :name="item._id">
                    <template slot="title">
                        <i class="el-icon-message"></i>
                        {{item.author}}
                        ( {{item.isRead ? '已读' : '未读'}} )
                    </template>
                    <p class="msg-body">
                        {{item.suggestText}} <br>
                        <span>(发送时间 : {{item.suggestTime}})</span>
                        <el-button type="danger" size='mini'
                                   @click="handleDeleteMessage(item._id)"
                                   icon="el-icon-delete" circle></el-button>
                    </p>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="pageination-oder">
            <el-pagination v-if="showPagination"
                           background
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           :current-page="currentPage"
                           :pager-count="5"
                           :page-size="pageSize"
                           layout="total, prev, pager, sizes, next, jumper"
                           :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    //借助兄弟通信, 之前是为了跳转菜单,
    //这里借助一下 用来更新消息红点数量,名字就懒得改了
    import {gotoNewOrder} from './../../assets/js/gotoNewOrder'
    export default {
        data(){
            return{
                activeName: '',
                userMessage:[],
                loading:null ,
                currentPage : 1,
                pageSize : 10,
                total : 0,
                showPagination : true,
            }
        },
        mounted() {
            this.getMessage();
        },
        methods:{
            getMessage(){
                axios.get(`/api/worker/suggestList?size=${this.pageSize}&page=${this.currentPage}`).then(response=>{
                    let res = response.data;
                    if(res.status==='0'){
                        this.userMessage = res.result.msgList;
                        this.total = Number.parseInt(res.result.total);
                        if(this.total <= this.pageSize){
                            this.showPagination = false
                        }
                        let notReadMsg= this.userMessage.filter(it=>!it.isRead);
                        // 红点点
                        if(!notReadMsg.length){
                            this.$store.commit("saveUserInfo",{msgLen:notReadMsg .length});
                        }
                    }else{
                        this.$message({
                            type: 'error',
                            message:res.msg
                        });
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            handleReadMsg(data){
                console.log(data)
                let flag = this.userMessage.filter(it=>!it.isRead && it._id===data);
                if(data !=='' && flag.length){
                    axios.get(`/api/worker/readSuggest?id=${flag[0]._id}`).then(response=>{
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
            handleDeleteMessage(id){
                this.$confirm('此操作将永久删除该消息, 是否继续?',
                    '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                    axios.post(`/api/worker/deleteMessage?id=${id}`).then(response=>{
                        let res = response.data;
                        if(res.status==='0'){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            let mode = this.total % this.pageSize;
                            if(mode ===1){ //判断是否当页最后一条
                                this.currentPage --;
                            }
                            this.getMessage();
                        }else{
                            this.$message({
                                type: 'error',
                                message:res.msg
                            });
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getMessage();
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.getMessage();
            },
        }
    }
</script>

<style lang='scss'>
    .myMessage{
        margin:3rem 5rem;
        .el-collapse{
            border:1px solid #EBEEF5;
        }
    }
    .myMessage-cont{
        text-align: left;
        // 展开的框框 ,下划线
        .el-collapse-item__header.is-active{
            border-bottom-color: #ebeef5;
        }
        //下划线
        .el-collapse-item__header{
            border-bottom: 1px solid #e2e2e2;
        }
        // 标题框
        .el-collapse-item__header{
            font-size: 0.8rem;
            padding-left: 2rem;
            color: rgb(85, 192, 211); //未读消息标题颜色
        }
        .messageIsRead .el-collapse-item__header{
            color: #999; //已读消息标题颜色
        }
        // 内容框
        .el-collapse-item__content{
            padding-left: 2rem;
            padding-top: 0.5rem;
        }
        .msg-body{
            letter-spacing: 0.1rem;
            padding-right: 2rem;
            color: #666;
        }
    }
</style>
