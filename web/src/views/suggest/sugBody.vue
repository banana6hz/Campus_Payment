<template>
<transition name='moveY'>
    <div class="suggest-cont"
    ref="sugCont"
    :class="{'hiden-h':!sugcontshow}"
    v-if="contShow">
        <transition name='transX'>
            <div class="sug-cont-body" v-if="sugcontshow">
                    <ul class="sug-list">
                        <li>
                            <label>姓名 : <input type="text"
                            v-model.trim="sugcontForm.userName"></label>
                        </li>
                        <li>
                            <label>电话 : <input type="text"
                             v-model.trim="sugcontForm.phoneNum"></label>
                        </li>
                    </ul>
                <div class="textarea">
                    <span>内容 : </span>
                    <textarea name="suggestText"
                        id="suggestText"
                        v-model.trim="sugcontForm.suggestText"></textarea>
                </div>
                <div class="submit">
                    <input type="button"
                    @click="$emit('handleSubSuggest',sugcontForm)" value="提交">
                </div>
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
export default {
    props:{
        sugcontshow:Boolean,
        contShow:Boolean
    },
    data(){
        return{
            sugcontForm:{
                userName:'',
                phoneNum:'',
                suggestText:''
            }
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
    border:0.4rem solid #7dafa7;
    box-sizing: border-box;
    box-shadow: 1rem 1rem 1rem #888;
    transition:.6s;
    height: 28.5rem;
    background-color: #fff;
    border-radius: 2rem;
}
.hiden-h{
    height: 2.5rem;
    margin-bottom: 10rem + 24.5rem - 2.5rem;
}
.sug-cont-body{
    padding: 3rem 1rem;
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
    input{
        width: 40%;
        height: 2rem;
        border: none;
        border-radius: 1rem;
        background-color:lighten(#7dafa7, 5%);
        background-image: linear-gradient(to bottom, #92d6cb 0%, #75d6c7 100%);
        outline: none;
        font-size: 1rem;
        color: #fff;
        letter-spacing: 10px;
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
