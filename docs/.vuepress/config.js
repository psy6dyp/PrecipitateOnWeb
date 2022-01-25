module.exports = {
  title: '沉淀在网页',
  base: '/PrecipitateOnWeb/',
  description: 'While there is life, there is hope.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/css/index.css' }]
  ],
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      { text: '首页', link: '/' },
      
      { text: '前端基础', 
        items: [
          { text: 'HTML', link: '/FrontEnd/HTML/' },
          { text: 'CSS', link: '/FrontEnd/CSS/' },
          { text: 'JavaScript', link: '/FrontEnd/JavaScript/' }
        ] 
      },
      { text: 'External', link: 'https://google.com' },
    ],
    displayAllHeaders: false,
    sidebarDepth: 1,
    sidebar: {
      '/FrontEnd/HTML/': [

      ],
      '/FrontEnd/CSS/': [

      ],
      '/FrontEnd/JavaScript/': [
        '',
        'Language_Basics', //第三章 语言基础
        'Variables_Scope_Memory', //第四章 变量、作用域与内存
        // 'Basic_Reference_Types', //第五章 基本引用类型
        // 'Collection_Reference_Types', //第六章 集合引用类型
        // 'Iterators_And_Generators', //第七章 迭代器与生成器
        // 'Objects_Classes_And_Object-Oriented_Programming', //第八章 对象、类与面向对象编程
        // 'Proxies_And_Reflect', //第九章 代理与反射
        // 'Functions', //第十章 函数
        // 'Promises_And_Async_Functions', //第十一章 期约与异步函数
        // 'The_Browser_Object_Model', //第十二章 BOM
        // 'Client_Detection', //第十三章 客户端检测
        // 'The_Document_Object_Model', //第十四章 DOM
        // 'Dom_Extensions', //第十五章 DOM扩展
        // 'DOM_Levels2_And_3', //第十六章 DOM2和DOM3
        // 'Events', //第十七章 事件
        // 'Animation_And_Graphics_With_Canvas', //第十八章 动画与Canvas图形
        // 'Scripting_Forms', //第十九章 表单脚本
        // 'JavaScript_APIs', //第二十章 JavaScript API
        // 'Error_Handling_And_Debugging ', //第二十一章 错误处理与调试
        // 'XML_In_JavaScript', //第二十二章 处理XML
        // 'JSON', //第二十三章 JSON
        // 'Network_Requests_And_Remote_Resources', //第二十四章 网络请求与远程资源
        // 'Client-Side_Storage', //第二十五章 客户端存储
        // 'Modules', //第二十六章 模块
        // 'Workers', //第二十七章 工作者线程
        // 'Best_Practices ', //第二十八章 最佳实践
      ]
    }
  },
  markdown: {
    lineNumbers: true
  }
}