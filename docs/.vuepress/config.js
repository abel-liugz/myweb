const {defaultTheme} = require('@vuepress/theme-default')
const {searchPlugin} = require('@vuepress/plugin-search')
module.exports = {
    title: 'Abel\'s Web',
    description: 'My tech blog',
    head: [
        ['link', {rel: 'icon', href: '/images/JAVA.png'}],
        ['link', {rel: 'stylesheet', href: '/css/style.css'}]
    ],
    theme: defaultTheme(
        {
            logo: '/images/JAVA.png',
            logoDark:'/images/java-2.png',
            repo:'/',
            navbar: require('./navbar'),
            sidebar:'auto',
            editLink:true,
            editLinkText:'编辑此页',
            // editLinkPattern:':repo/:path',
            collapsible: true,
            lastUpdated: true,

        }
    ),
    plugins:[
        searchPlugin({
            locales:{
                '/':{
                    placeholder:'搜索'
                }
            },
            isSearchable: (page) => page.path !== '/'
        })
    ]
}

