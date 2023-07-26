﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 * Dashboard: dashboard

<<<<<<< HEAD
 form
 able
 profile
 check-circle
 warning
 user
 highlight
=======
form
able
profile
check-circle
warning
user
highlight
>>>>>>> 7422dd8 (前端框架构建完成 用户信息获取 接口信息获取完成)
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      // 登录页
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      // 注册页
      {
        name: 'register',
        path: '/user/register',
        component: './User/Register',
      },
    ],
  },
  //欢迎页
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  //管理页
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  //用户信息页
  {
    name: '用户信息',
    access: 'canAdmin',
    icon: 'user',
    path: '/user/list',
<<<<<<< HEAD
    component: './TableList/Admin/User',
=======
    component: './TableList/User',
>>>>>>> 7422dd8 (前端框架构建完成 用户信息获取 接口信息获取完成)
  },

  //接口信息页
  {
    name: '接口信息',
<<<<<<< HEAD
    access: 'canAdmin',
    icon: 'user',
    path: '/interfaceInfo/list',
    component: './TableList/Admin/InterfaceInfo',
  },

  // 接口分析页
  {
    name: '接口分析',
    icon: 'user',
    path: '/admin/interface_analysis',
    component: './TableList/Admin/InterfaceAnalysis'
  },

  // 测试分析页
  {
    name: '测试分析',
    icon: 'user',
    path: '/admin/test_analysis',
    component: './TableList/Admin/testAnalysis'
  },


  //接口详情页
  {
    name: '接口详情',
    icon: 'user',
    path: '/interfaceInfo/info',
    component: './TableList/Index',
  },

  //接口调用页
  {
    name: '接口调用',
    icon: 'user',
    path: '/interfaceInfo/:id',
=======
    icon: 'user',
    path: '/interfaceInfo/list',
>>>>>>> 7422dd8 (前端框架构建完成 用户信息获取 接口信息获取完成)
    component: './TableList/InterfaceInfo',
  },

  {
    path: '/',
    redirect: '/welcome',
  },

  {
    path: '*',
    layout: false,
    component: './404',
  },
];
