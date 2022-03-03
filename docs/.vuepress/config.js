const moment = require('moment')
module.exports = {
  title: '沉淀在网页',
  base: '/PrecipitateOnWeb/',
  description: 'While there is life, there is hope.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/css/index.css' }]
  ],
  theme: 'yuu',
  themeConfig: {
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp) => {
          moment.locale('zh-cn') // 中文时间
          return moment(timestamp).format('lll')
        }
      }
    ]
  ],
  themeConfig: {
    lastUpdated: '最近更新', // string | boolean
    nav: [
      { text: '首页', link: '/' },
      
      { text: '前端基础', 
        items: [
          { text: 'HTML', link: '/FrontEnd/HTML/' },
          { text: 'CSS', link: '/FrontEnd/CSS/' },
          { text: 'JavaScript', link: '/FrontEnd/JavaScript/' }
        ] 
      },

      { text: 'GitHub', link: 'https://github.com/psy6dyp/PrecipitateOnWeb/tree/master/docs/FrontEnd' },
    ],
    displayAllHeaders: false,
    sidebarDepth: 2,
    markdown: {
      lineNumbers: true
    },
    sidebar: {
      '/FrontEnd/HTML/': [

      ],
      '/FrontEnd/CSS/': [

      ],
      '/FrontEnd/JavaScript/': [
        '',
        'Collection_Reference_Type', //集合引用类型
      ]
    }
  }
}