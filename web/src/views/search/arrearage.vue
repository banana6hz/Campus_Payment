<template>
    <div>
        <div class="routerBody">
            <div class="imgBox" v-for="item in arrearageData">
                <img :src="item.src" :alt="item.alt">
                <div class="ImgText">
                    <h2>{{item.title}}</h2>
                    <p>{{item.test}}<span>{{item.unit}}</span></p>
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            arrearageData:Array
        },
        data() {
            return {
                isCollapse: false,//默认展开
                arrearageData:this.arrearageData,
                // defaultActive:'userInformation'
            };
        },
    }
</script>
<style lang="scss">
    .routerBody {
        height: 100%;
        // border:1px solid red;
        padding: 5rem;
        .imgBox {
            box-sizing: border-box;
            border: 1px solid #77aca4;
            width: 39%;
            margin: 0 2rem;
            height: 12em;
            float: left;
            padding: 1rem;
            box-shadow: 5px 5px 3px #77aca4;
        }
        img {
            float: left;
            display: inline-block;
        }
        .ImgText {
            margin-top: 1rem;
            margin-left: 3rem;
            float: left;
            display: inline-block;
            h2 {
                text-align: left;
            }
            p {
                display: inline-block;
                padding:3rem 0 0 5rem;
                font-size: 2rem;
                color: #7dafa7;
                span {
                    color: #2c3e50;
                }
            }
        }
    }
</style>
