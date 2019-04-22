<template>
    <div class="message">
        <el-collapse accordion v-for="(item,index) in msgData">
            <el-collapse-item :title="item.msgHeader">
                <template slot="item.msgHeader">
                    {{item.msgHeader}}
                </template>
                <div>{{item.msgCount}}
                    <span class="date">{{item.time}}<el-button @click="delMsg(index)">删除</el-button></span>
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
                    for(let i =0;i<res.data.result.message.length;i++){
                        this.msgData[i].msgCount=res.data.result.message[i].msgCount
                        this.msgData[i].time=res.data.result.message[i].time
                    }
                    console.log(this.msgData)
                })
            },
            delMsg(index){
                axios.post('/api/users/deleteMsg',index).then(res=>{
                    if(res.status==='0'){
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
        margin:5rem;
        .el-button{
            position: relative;
            left:5px;
            padding:4px;
            font-size:2px
        }
    }
    .date{
        display: block;
        color:#d5d5d5;
        position: relative;
        right:66px;
        text-align: right;
    }
    .el-collapse-item__content{
        padding-bottom: 5px;
    }
</style>
