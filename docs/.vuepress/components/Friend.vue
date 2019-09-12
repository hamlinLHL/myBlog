<template>
    <div class="container">
        <div class="friendLink">
            <h1>欢迎交换友链 ꉂ(ˊᗜˋ)</h1>
            <div class="title-method">
                <p>请留言告诉我你的：</p>
                <p>1. 名字</p>
                <p>2. 头像地址</p>
                <p>3. 网页地址</p>
                <p>4. 一句话介绍</p>
            </div>
            <div class="title-method">
                <p>比如：</p>
                <p>名字： 小城旧事</p>
                <p>头像地址： http://honglinliu.com/picture/lufei1.jpg</p>
                <p>网页地址： http://honglinliu.com/myBlog/</p>
                <p>一句话介绍： 不会弹吉他的前端不是好全栈</p>
            </div>
        </div>
        <div class="box">
            <div class="my">小伙伴们,有空常来玩啊</div>
            <div class="content" v-for="link in links" @click="open(link.src)">
                <img :src=link.avatar alt="">
                <div class="header-right">
                    <div class="name">{{link.name}}</div>
                    <div class="introduce">{{link.introduce}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default  {
        name: 'Friend',
        data() {
            return {
               links: [{
                   name: '小城旧事',
                   introduce: '不会弹吉他的前端不是好全栈',
                   avatar: 'http://honglinliu.com/picture/lufei1.jpg',
                   src: 'http://honglinliu.com/myBlog/'
               },
                   {
                       name: '麋鹿鲁哟',
                       introduce: '大道至简，知易行难',
                       avatar: 'https://miluluyo.github.io/union/o_my.jpg',
                       src: 'https://www.cnblogs.com/miluluyo/'
                   }],
            }
        },
        mounted() {
        },
        methods: {
            open(src) {
                window.open(src)
            }
        }
    }
</script>
<style lang="scss">
    $back:lightsalmon;
    *{
        list-style: none;
    }
    .container{
        width: 100%;
        height: 100%;
        cursor: url(http://honglinliu.com/cur/normal.cur), auto;
        .friendLink{
            .title-method{
                margin-top: 30px;
                font-weight: 500;
            }
        }
        .box{
            width: 100%;
            padding: 10px;
            margin-top: 20px;
            .my{
                font-size: 35px;
                font-weight: bolder;
                padding: 20px 0;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                color: #fff;
                background-image: url("http://honglinliu.com/picture/lufei1.jpg");
                background-size: 100%;
            }
            .content{
                display: flex;
                position: relative;
                justify-content: space-around;
                align-items: center;
                width: 45%;
                float: left;
                padding: 10px;
                margin: 0 15px 15px 0;
                font-size: 14px;
                border: 1px dotted #ccc;
                border-radius: 16px;
                overflow: hidden;
                &::before{
                    content: "";
                    background-color: $back;
                    opacity: 0.3;
                    -webkit-transform: skew(45deg,0);
                    transform: skew(45deg,0);
                    width: 0;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: -60px;
                    z-index: -1;
                    -webkit-transition: all .5s;
                    transition: all .5s;
                }
                &:hover{
                    border: 1px dotted $back;
                    &::before{
                        transform: skew(0,0);
                        width: 100%;
                        left: 0;
                    }
                    & img{
                        transform: rotateZ(360deg);
                    }
                }
                img{
                    width: 65px;
                    height: 65px;
                    padding: 2px;
                    border-radius: 50%;
                    margin-right: 10px;
                    box-shadow: inset 0 0 10px #000;
                    transition: all ease 1s;
                    transform: rotateZ(0deg);
                }
                .header-right{
                    height: 100%;
                    .name{
                        font-size: 18px;
                        color: deepskyblue;
                        padding-bottom: 10px;
                        border-bottom: 1px dotted $back;
                    }
                    .introduce{
                        padding-top: 10px;
                        color: #949494;
                        font-size: 13px;
                    }
                }
            }
            &::after{
                clear: both;
                content: '';
                display: block;
            }
        }
    }
</style>
