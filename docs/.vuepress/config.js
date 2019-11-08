module.exports = {
    head: [
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}],
        ['link', {rel: 'icon', href: 'favicon.ico'}]
    ],
    base: '/myBlog/', // 部署到GitHub相关的配置
    title: '小城旧事',
    description: '怀旧的前端想做全栈',
    plugins: {
        '@vuepress/medium-zoom': {
            selector: 'img.zoom-custom-imgs',
            // medium-zoom options here
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
                margin: 16
            }
        }
    },
    markdown: {
        lineNumbers: false  // 代码块不显示行号
    },
    themeConfig: {
        author: 'Hamlin',
        logo: '/bg.jpg',
        search: true,
        // valine
        valineConfig: {
            appId: '20uttEi9BN7qb7fMVhJwCEoc-gzGzoHsz',// your appId
            appKey: 'W2mkX4DhUukTDsfQeHi7mzQu', // your appKey
            notify:true,
            verify:true,
            avatar:'mp',
            avatar:'identicon',
            placeholder: '填写邮箱可以收到回复提醒哦',
            visitor: true,  // 阅读量统计,
            recordIP: true
        },
        categories: {
            text: '分类',
            index: 2,
            icon: 'hamlin-categories'
        },
        tags: {
           text: '标签',
            index: 3,
           icon: 'hamlin-tag'
        },
        timeLine: {
            text: '时间线',
            index: 5,
            icon: 'hamlin-date'
        },
        friendLink: {
            text: '友链',
            index: 10,
            data: [{
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
            icon: 'hamlin-friendLink'
        },
        nav: [
            {text: 'Home', link: '/', icon: 'hamlin-bili'},
            {text: '前端', link: '/web/', items: [
                    {text: 'es6', link: '/web/es6/'},
                    {text: 'vue', link: '/web/vue/'},
                    {text: 'H5', link: '/web/H5/'},
                    {text: 'React', link: '/web/React/'},
                ]},
            {text: 'nodejs', link: '/node/'},
            {text: 'java', link: '/java/'},
            {text: '关于', link: '/nested/',icon: 'account_circle'},
        ],
        sidebar: {
            '/web/es6/': ['es7_decorator','ArrayBuffer','ts_config'],
            '/web/vue/': ['vuePress_deploy'],
            '/web/H5/' : ['svg'],
            '/web/React/': ['chess']
        },
        sidebarDepth: 2, // 侧边栏显示2级
        lastUpdated: 'Last Updated', // string | boolean
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'ChaselLHL/myBlog',
        // 以下为可选的编辑链接选项eeeeeeeeee
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
            updatePopup: {
                message: "发现新内容可用.",
                buttonText: "刷新"
            }
        }
    }
};

