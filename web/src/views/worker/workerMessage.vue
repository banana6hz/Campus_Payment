<template>
    <div class="message">
        <h2 style="text-align: center;margin-bottom: 2rem;">我的消息</h2>
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
                }
            }
        },
        created(){
            this.getMessage()
        },
        methods:{
            getMessage(){
                axios.get('/api/users/userInformation').then(res=>{
                    this.msgData=res.data.result.message
                    console.log(res.data.result.message)
                    for(let i =0;i<res.data.result.message.length;i++){
                        this.msgData[i].msgCount=res.data.result.message[i].msgCount
                        this.msgData[i].msgTime=res.data.result.message[i].msgTime
                        if(res.data.result.message[i].msgRule === 1){
                            this.msgData[i].msgRule='权限：'+ res.data.result.message[i].msgRoom+' '+res.data.result.message[i].msgDepartment
                        }else{
                            this.msgData[i].msgRule = '权限：'+'全校学生'
                        }
                    }
                    console.log(this.msgData)
                })
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

