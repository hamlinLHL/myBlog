module.exports = {
    head: [['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}]],
    base: '/mybBlog/', // 部署到GitHub相关的配置
    dest: 'public',
    theme: 'reco',
    title: '小城旧事',
    description: '怀旧的前端想做全栈',
    markdown: {
        lineNumbers: false  // 代码块不显示行号
    },
    themeConfig: {
        huawei: true,
        type: 'blog',
        author: 'Hamlin',
        // valine
        valineConfig: {
            appId: '...',// your appId
            appKey: '...', // your appKey
        },
        nav: [
            {text: 'Home', link: '/'},
            {text: '前端', link: '/web/', items: [
                    {text: 'es6', link: '/web/es6/es7_decorator'}
                ]},
            {text: 'nodejs', link: '/node/'},
            {text: 'java', link: '/java/'},
            {text: '时间线', link: '/timeLine/', icon: 'reco-date'},
            {text: '关于', link: '/nested/',icon: 'account_circle'},
        ],
        sidebar: {
            '/web/es6/': ['es7_decorator'],
        },
        // 博客设置
        blogConfig: {
            tag: {
                location: 5,     // 在导航栏菜单中所占的位置，默认3
                text: 'Tag'      // 默认文案 “标签”
            }
        },
        sidebarDepth: 2, // 侧边栏显示2级
        algolia: {  // 搜索需要提交
            apiKey: '<API_KEY>',
            indexName: '<INDEX_NAME>'
        },
        lastUpdated: 'Last Updated', // string | boolean
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'ChaselLHL/myBlog',
        // 以下为可选的编辑链接选项
        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'vuejs/vuepress',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'master',
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

