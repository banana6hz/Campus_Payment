<template>
    <div class="home-news">
        <div class="news-title">
             <h3>操作中心</h3>
             <div class="circle"></div>
        </div>
        <div class="news-body">
            <div class="news-item-cont"
            v-for='(obj) in newsSoure' :key=obj.id>
                <div class="ns-item">
                    <router-link :to="{path:obj.path}">
                        <div class="out-border"></div>
                        <transition name='opa'>
                            <img :src="obj.imgSrc" v-if="isCmptShow" alt="精彩瞬间">
                        </transition>
                        <div class="item-body" >
                            <h4>{{obj.title}}</h4>
                            <p>{{obj.article}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import newsBanner from './banner'
export default {
    data(){
        return{
            isCmptShow:true
        }
    },
    props:{
        newsSoure:Array
    },
    components:{
        newsBanner
    }
}
</script>

<style scoped lang='scss'>
@import "../style/_mixin.scss";
.home-news{
    position: relative;
    width: 100%;
    margin-bottom: 10rem;
}
.news-title{
    position: relative;
    background-color: #fff;
    width: 77%;
    margin: 0 auto;
    z-index: 99;
    h3{
        $lateValue:-3rem;
        overflow: hidden;
        position: relative;
        display: block;
        font-size: 1rem;
        letter-spacing: 0.1rem;
        color: #666;
        z-index: 66;
        &:after,
        &:before{
            content: '';
            display: block;
            position: absolute;
            right: $lateValue;
            top: 50%;
            width: 50%;
            height: 0.2rem;
            background-color: #FFCCCC;
            background-image: linear-gradient(to right, #97d9e1 0%, #fff 50%);
        }
        &:before{
            left: $lateValue;
            background-image: linear-gradient(to left, #97d9e1 0%, #fff 50%);
        }
    }
}
.circle{
    $circle-w:6rem;
    $circle-h:3rem;
    position: absolute;
    left: 50%;
    top: 0;
    margin-top: -$circle-h +0.7rem;
    margin-left: -$circle-h;
    @include circle($circle-w,#fff);
    &::after{
        $moveValue:0.5rem;
        content:'';
        display: block;
        position: absolute;
        @include circle($circle-w +$moveValue,#97d9e1);
        margin-left: -$moveValue /2;
        margin-top: -$moveValue /2;
        z-index: -1;
    }
}
.news-body{
    // background: #95A5A6;
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 77%;
    margin: 0.05rem auto 0;
    padding-bottom: 2rem;
      @include box-shadow(0 0 0.3rem 0.3rem #ccc);
    cursor: pointer;
}
.news-item-cont{
    display: flex;
    justify-content: center;
}
.out-border{
    position: absolute;
    top: 1rem;
    left: -2rem;
    width: 50%;
    height: 1rem;
    background-color: #a8dfe6;
    @include rotate(-45deg);
    @include box-shadow(0 0 3px 1px #a8dfe6);
    z-index: 99;
}
.ns-item{
    position: relative;
    display: flex;
    overflow: hidden;
    margin-top: 4rem;
    border: 3px solid #a8dfe6;
    border-radius: 13px;
    @include box-shadow(0.4rem 0.4rem 2px  #cbcccb);
    img{
        display: block;
        width: 10rem;
        height: 10rem;
        @include transition(.5s);
    }
    &:hover img{
        @include set-opacity(0.5);
        @include scale(1.1);
    }
}
.item-body{
    width:100%;
    $title-h:1.2rem;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    background-color: rgba(255,255,255,.6);
    height: $title-h;
    @include transition(.5s);
    h4{
        display: block;
        line-height: $title-h;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: #333;
        background-color: #c2e9fb;
        @include set-opacity(0.7);
    }
    p{
        width: 90%;
        margin: 0 auto;
        line-height: 1.5rem;
        font-size: 0.8rem;
        text-indent: 1.4rem;
        letter-spacing: 0.1rem;
        text-align:justify;
        text-justify:inter-ideograph;
        color: #333;
        &::selection{
            background-color:#93C;
            color:#FCF;
        }
    }
}
.ns-item:hover  .item-body{
    height:70%;
}
@media only screen and (max-width:768px){
    .news-item-cont{
        width: 40%;
    }
}
</style>

