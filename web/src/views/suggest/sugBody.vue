<template>
<transition name='moveY'>
    <div class="suggest-cont"
    ref="sugCont"
    :class="{'hiden-h':!sugcontshow}"
    v-if="contShow">
        <h2 style="text-align: center;margin:2rem auto;">发表建议</h2>
        <transition name='transX'>
            <div class="sug-cont-body" v-if="sugcontshow" v-model="sugcontForm">
                <div class="textarea">
                    <span style="display: inline-block;width:5rem;">内容 : </span>
                    <el-input name="suggestText" type="textarea"
                        id="suggestText"
                        v-model="sugcontForm.suggestText" :rows="10"></el-input>
                </div>
                <div style="text-align: left;margin-top:3rem;">
                    <span style="display: inline-block;width:5rem;">匿名发送</span>
                    <el-switch v-model="sugcontForm.delivery"></el-switch>
                </div>
                <div class="submit">
                    <input type="button"
                    @click="handleSubSuggest()" value="提交">
                    <input type="button"
                           @click="cancel()" value="返回">
                </div>
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
    import axios from 'axios'
export default {
    props:{
        sugcontshow:Boolean,
        contShow:Boolean
    },
    data(){
        return{
            sugcontForm:{
                delivery:null,
                suggestText:'',
                suggestTime:''
            }
        }
    },
    methods:{
        CurrentTime() {
            let now = new Date();

            let year = now.getFullYear();       //年
            let month = now.getMonth() + 1;     //月
            let day = now.getDate();            //日

            let hh = now.getHours();            //时
            let mm = now.getMinutes();          //分
            let ss = now.getSeconds();           //秒

            this.sugcontForm.suggestTime = year + "-";
            if(month < 10){
                this.sugcontForm.suggestTime += "0";
                this.sugcontForm.suggestTime += month + "-";
            }else{
                this.sugcontForm.suggestTime += month + "-";
            }
            if(day < 10){
                this.sugcontForm.suggestTime += "0";
                this.sugcontForm.suggestTime += day + " ";
            }else{
                this.sugcontForm.suggestTime += day + " ";
            }
            if(hh < 10){
                this.sugcontForm.suggestTime += "0";
                this.sugcontForm.suggestTime += hh + ":";
            }else{
                this.sugcontForm.suggestTime += hh + ":";
            }
            if (mm < 10) {
                this.sugcontForm.suggestTime += '0';
                this.sugcontForm.suggestTime += mm + ":";
            }else{
                this.sugcontForm.suggestTime += mm + ":";
            }
            if (ss < 10) {
                this.sugcontForm.suggestTime += '0';
                this.sugcontForm.suggestTime += ss;
            }else{
                this.sugcontForm.suggestTime += ss;
            }
        },
        handleSubSuggest(){
            this.CurrentTime()
            axios.post('/api/users/addSuggest',this.sugcontForm).then((res)=>{
                if(res.data.status==='0'){
                    this.$message({
                        message:res.data.msg,
                        type:'success'
                    })
                }else{
                    this.$message({
                        message:res.data.msg,
                        type:'error'
                    })
                }
            })
        },
        cancel(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang='scss'>
$text-color:#777;
.suggest-cont{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto 10rem;
    box-sizing: border-box;
    transition:.6s;
    min-height: 28.5rem;
    background-color: #fff;
    border-radius: 2rem;
}
.hiden-h{
    height: 2.5rem;
    margin-bottom: 10rem + 24.5rem - 2.5rem;
}
.sug-cont-body{
    padding: 0 3rem 3rem 1rem;
}
.sug-list{
    width: 100%;
    margin-bottom: 3rem;
    li{
        display: block;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-bottom: 2rem;
    }
    label{
        display: block;
        font-size: 1rem;
        color: $text-color;
        input{
            overflow: hidden;
            height: 1.5rem;
            width: 60%;
            margin-left: 0.2rem;
            border: 2px solid transparent;
            border-bottom: 2px solid #7dafa7;
            border-radius: 1rem;
            font-size: 0.9rem;
            letter-spacing: 0.1rem;
            text-align: center;
            outline: none;
            &:focus{
                border: 2px solid #7dafa7;
            }
        }
    }
}
.textarea{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    span{
        font-size: 1rem;
        color: $text-color;
    }
}
#suggestText{
    resize: none;
    width:60%;
    height: 5rem;
    margin-left: 0.3rem;
    outline: none;
    border: 1px solid #7dafa7;
    border-radius: 1rem;
    text-indent: 0.5rem;
    padding-top: 0.5rem;
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: #444;
}
.submit{
    width: 100%;
    margin-top: 3rem;
    text-align: right;
    input{
        width: 10%;
        height: 2rem;
        border: none;
        border-radius: 1rem;
        background-color:lighten(#7dafa7, 5%);
        background-image: linear-gradient(to bottom, #92d6cb 0%, #75d6c7 100%);
        outline: none;
        font-size: 1rem;
        color: #fff;
        margin-left: 2rem;
        &:hover{
            background-image: linear-gradient(to bottom, #91dfd2 0%, #7dafa7 100%);
        }
    }
}
@media only screen and (max-width:1200px){
     .suggest-cont{
        margin-bottom: 25rem;
    }
    .hiden-h{
        margin-bottom: 32rem + 15rem;
    }

}
</style>
