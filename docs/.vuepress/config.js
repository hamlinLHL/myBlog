module.exports = {
    title: 'Hello MyBlog',
    description: 'The First Time Doing this !!!',
    head: [],
    base: '/', // 部署到GitHub相关的配置
    markdown: {
        lineNumbers: false  // 代码块不显示行号
    },
    themeConfig:{
        nav:[ // 导航栏配置
            {text: '一天', link: ''},
            {text: '两天', link: ''},
            {text: '三四天', link: ''},
        ],
        sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }
};
