import Vue from 'vue'
import Router from 'vue-router'
import staticRouter from './staticRouter'
import whiteList from './whiteList'
import { requestUserInfo } from '@/api/user'

Vue.use(Router)

const router = new Router({
  routes: staticRouter
})

// 利用router.meta保存数据级权限
const routerInit = permissions => {
  permissions.forEach(v => {
    let routeItem = router.match(v.path)
    if (routeItem) {
      routeItem.meta.permission = v.permission ? v.permission : []
    }
  })
}

// 检测用户是否有权限访问页面
const pagePermission = (permissions, toPath, next) => {
  let allowPage = false
  permissions.forEach(v => {
    if (v.path === toPath) {
      allowPage = true
    }
  })
  allowPage ? next() : next({path: '/error/401'})
}

// 权限控制
router.beforeEach((to, form, next) => {
  // 忽略错误页面的权限判断
  if (to.meta.errorPage) {
    return next()
  }
  // 进入登录页面将注销用户信息
  if (to.path === '/login') {
    sessionStorage.removeItem('user-info')
    localStorage.removeItem('user-info')
  }
  if (whiteList.indexOf(to.fullPath) >= 0) {
    return next()
  }
  let userInfo = JSON.parse(sessionStorage.getItem('user-info'))
  // 上次会话结束，重新获取用户信息
  if (!userInfo) {
    requestUserInfo({}).then(userInfo => {
      const permissions = userInfo.permissions || []
      routerInit(permissions)
      pagePermission(permissions, to.path, next)
    }).catch(err => {
      // 获取用户异常信息
      console.error(err)
    })
  } else {
    // 已登录时判断页面权限
    const permissions = userInfo.permissions || []
    pagePermission(permissions, to.path, next)
  }
})

export default router
