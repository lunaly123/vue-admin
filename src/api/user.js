import { request } from '@/utils/request'

// 登陆
export const requestLogin = params => {
  return request('/api/user/login', params).then(data => {
    localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}
// 退出
export const requestLogout = params => {
  return request('/api/user/logout', params)
}
// 注册
export const requestRegister = params => {
  return request('/api/user/register', params)
}
// 获取用户信息
export const requestUserInfo = params => {
  return request('/api/user/info', params).then(data => {
    sessionStorage.setItem('user-info', JSON.stringify(data))
    return data
  })
}
// 用户查询
export const requestUserQuery = params => {
  return request('/api/user/query', params)
}
// 修改密码
export const requestChangePassword = params => {
  return request('/api/user/changePassword', params).then(data => {
    localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}
// 用户权限查询
export const requestPermissionsQuery = params => {
  return request('/api/user/permissions', params)
}
