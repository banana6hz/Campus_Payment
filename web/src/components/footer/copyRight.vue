<template>
    <div class="copyRight">
        <h5 class="owner">
            所有方 : <em>banana工作室</em> |
             <el-tooltip class="item" effect="dark"
             content="香蕉你个不拿拿.com" placement="top">
                 <a href="javascript:void(0)">营业执照</a>
             </el-tooltip>
        </h5>
        <h6>
            <a href="http://www.miibeian.gov.cn" target="_black">地址：广东惠州市演达大道 </a>
            | 惠州学院
        </h6>
        <h6>
           邮政编码：516007
        </h6>
        <h6>
            Copyright @2016-{{new Date().getFullYear()}}
            校园缴费 All Rights Reserved
        </h6>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.copyRight{
    position: relative;
    width: 100%;
    padding-top:3rem;
    padding-bottom: 3rem;
    h6{
        color: #666;
        font-size: 0.7rem;
        line-height:1.5rem;
        a{
            color: #666;
            &:hover{
                color: #000;
                text-decoration: underline;
            }
        }
    }
}
.owner{
    display: block;
    margin-bottom: 0.6rem;
    a{
        color: #000;
        &:hover{
            color: red;
        }
    }
}
</style>
