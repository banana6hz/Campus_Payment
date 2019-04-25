<template>
    <div class="app-footer">
        <copyRight></copyRight>
    </div>
</template>

<script>
    //import homeFooter from '../../components/footer/footer'
    import copyRight from '../../components/footer/copyRight'
    export default {
        components:{
            //homeFooter,
            copyRight
        }
    }
</script>

<style scoped lang='scss'>
    .app-footer{
        position: relative;
        width: 100%;
        bottom: 0;
        left: 0;
        border-top:1px solid #7dafa7;
        background-color:darken(#fff,1%);
    }
    @media only screen and (max-width:1200px){
        .app-footer{
            margin-top: 15rem;
        }
    }
</style>
