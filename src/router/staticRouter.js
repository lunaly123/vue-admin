import Login from '@/views/login/login'
import Register from '@/views/login/register'
import Error401 from '@/views/error/error401'
import Error404 from '@/views/error/error404'
import TheLayout from '@/views/layout/TheLayout'
import FuncHome from '@/views/functions/home/FuncHome'
import FuncFormsBase from '@/views/functions/forms/FuncFormsBase'
import FuncFormsEdit from '@/views/functions/forms/FuncFormsEdit'
import FuncCharts from '@/views/functions/charts/FuncCharts'
import FuncTable from '@/views/functions/table/FuncTable'
import FuncDrag from '@/views/functions/drag/FuncDrag'
import FuncUserPassword from '@/views/functions/user/FuncUserPassword'
import FuncUserPermissions from '@/views/functions/user/FuncUserPermissions'

// 静态页面路由
const staticRouter = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login.login',
    component: Login
  },
  {
    path: '/register',
    name: 'login.register',
    component: Register
  },
  {
    path: '/',
    component: TheLayout,
    menu: true,
    children: [
      {
        path: '/index',
        alias: '/home',
        name: 'menu.home',
        icon: 'el-icon-menu',
        component: FuncHome
      }
    ]
  },
  {
    path: '/',
    component: TheLayout,
    menu: true,
    name: 'menu.form',
    icon: 'el-icon-tickets',
    children: [
      {
        path: '/forms/base',
        name: 'menu.formBase',
        component: FuncFormsBase
      },
      {
        path: '/forms/edit',
        name: 'menu.richText',
        component: FuncFormsEdit
      }
    ]
  },
  {
    path: '/',
    component: TheLayout,
    menu: true,
    children: [
      {
        path: '/charts',
        name: 'menu.chart',
        icon: 'el-icon-picture',
        component: FuncCharts
      }
    ]
  },
  {
    path: '/',
    component: TheLayout,
    menu: true,
    children: [
      {
        path: '/table',
        name: 'menu.table',
        icon: 'el-icon-search',
        component: FuncTable
      }
    ]
  },
  {
    path: '/',
    component: TheLayout,
    menu: true,
    children: [
      {
        path: '/drag',
        name: 'menu.drag',
        icon: 'el-icon-rank',
        component: FuncDrag
      }
    ]
  }, {
    path: '/',
    component: TheLayout,
    menu: true,
    name: 'menu.settings',
    icon: 'el-icon-setting',
    children: [
      {
        path: '/user/password',
        name: 'menu.modifyPass',
        component: FuncUserPassword
      }, {
        path: '/user/permissions',
        name: 'menu.permissions',
        component: FuncUserPermissions
      }
    ]
  },
  {
    path: '/error/401',
    name: 'error.401',
    meta: { errorPage: true },
    component: Error401
  },
  {
    path: '*',
    name: 'error.404',
    meta: { errorPage: true },
    component: Error404
  }
]

export default staticRouter
