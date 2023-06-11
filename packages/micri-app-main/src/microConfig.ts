const microApps = [
    {
        name: 'sub-vue',
        entry: 'http://localhost:7777/subapp/sub-vue/',
        activeRule: '/sub-vue'
    },
    {
        name: 'sub-react',
        entry: 'http://localhost:9003/',
        activeRule: '/sub-react'
    },
    {
        name: 'sub-html',
        entry: 'http://localhost:7799/',
        activeRule: '/sub-html'
    },
    // {
    //     name: 'juejin',
    //     entry: 'https://juejin.cn/post/7232726594208759867',
    //     activeRule: '/juejin'
    // }
];

const apps = microApps.map(item => {
    return {
        ...item,
        container: '#subapp-viewport', // 子应用挂载的div
    };
});

export default apps;
