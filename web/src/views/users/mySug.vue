<template>
    <div class="message">
        <h2 style="text-align: center;margin-bottom: 2rem;">我的建议</h2>
        <el-collapse accordion v-for="(item,index) in msgData">
            <el-collapse-item :title="item.suggestTime">
                <template slot="item.msgHeader">
                    {{item.suggestTime}}
                </template>
                <div>{{item.suggestText}}</div>
                <div>
                    <span class="date">{{item.author}} {{item.suggestTime}}
                        <el-button @click="delSug(index)">删除</el-button>
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
                    suggestText:'',
                    suggestTime:''
                }
            }
        },
        created(){
            this.getMessage()
        },
        methods:{
            getMessage(){
                axios.get('/api/users/messageList').then(res=>{
                    this.msgData=res.data.result.msgList
                    for(let i =0;i<res.data.result.msgList.length;i++){
                        this.msgData[i].author=res.data.result.msgList[i].author
                        this.msgData[i].suggestTime=res.data.result.msgList[i].suggestTime
                        this.msgData[i].suggestText=res.data.result.msgList[i].suggestText
                        if(this.msgData[i].author==="匿名用户"){
                            this.msgData[i].author='匿名'
                        }else{
                            this.msgData[i].author='实名'
                        }
                    }
                    console.log(this.msgData)
                })
            },
            delSug(index){
                axios.post('/api/users/deleteSug',this.msgData[index]).then(res=>{
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

