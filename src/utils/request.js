import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

/*
 * 一、request：
 *    1. 说明：封装对后台的请求，可以选择自动处理一些异常。
 *    2. 参数：
 *        - url：            后台地址，必填，String，如："/user/add"
 *        - params：         请求参数，必填，Object，如：{"name":"xxx"}
 *        - config：         axios参数，选填，Object，默认值：{}
 *        - autoErrorRes： 是否自动处理响应错误，选填，Boolean，默认值：true
 *        - autoErrorData：是否自动处理后台错误，选填，Boolean，默认值：true
 *    3. 返回：
 *        - 成功：Promise.resolve(请求成功后的结果：response.data.result)
 *        - 失败：
 *            - 请求异常：Promise.reject(http响应错误)
 *            - 请求失败：Promise.reject(请求失败后的结果：response.data.error)
 *    4. 约定后台返回数据格式：
 *        response.data = {
 *          "success": true/false,         //请求成功或失败
 *          "result": {},                  //请求成功后的结果
 *          "error":{
 *            "code": 100001,              //请求失败错误码
 *            "message": "用户名字重复"     //请求失败描述
 *          }
 *        }
 *
 * 二、sessionRequest：
 *    1. 说明：利用sessionStorage缓存请求，可以选择outTime，其他同request。
 *    2. 参数：
 *        - outTime：距离上次请求多少秒后需要重新请求，选填，Integer，小于0表示不重新请求，默认值：-1
 *
 * 三、localRequest：
 *    1. 说明：利用localStorage缓存请求，可以选择outTime，其他同request。
 *    2. 参数：
 *        - outTime：距离上次请求多少秒后需要重新请求，选填，Integer，小于0表示不重新请求，默认值：604800（一周）
 *
 **/

axios.defaults.baseURL = ''
axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('user-token')
  return config
})

// 普通请求
export const request = (
  url,
  params,
  config = {},
  autoErrorRes = true,
  autoErrorData = true
) => {
  const args = Object.assign(
    {
      method: 'post',
      url: url,
      data: params
    },
    config
  )
  return axios(args).then(
    // 后台返回指定错误
    res => {
      if (!res.data.success) {
        res.data.error = res.data.error || {}
        console.error(res.data.error)
        // token失效
        if (res.data.error.code === 100000) {
          Message({
            message: '登录失效，请重新登录',
            type: 'error'
          })
          window.location.href = '/#/login'
          return Promise.reject(res.data.error)
        }
        // 其他错误
        if (autoErrorData) {
          const errMsg =
            res.data.error.message || '未知的服务器错误，请联系管理员！'
          const errCod = res.data.error.code || -1
          MessageBox.alert(errMsg, '请求失败：' + errCod, {
            confirmButtonText: '确定'
          })
        }
        return Promise.reject(res.data.error)
      }
      return res.data.result
    },
    error => {
      if (autoErrorRes) {
        const errStatus = error.response.status || -100
        MessageBox.alert(
          '网络请求异常，请联系管理员！',
          '请求异常：' + errStatus,
          { confirmButtonText: '确定' }
        )
      }
      return Promise.reject(error)
    }
  )
}

// 使用sessionStorage缓存的请求
export const sessionRequest = (
  url,
  params,
  outTime = -1,
  config = {},
  autoErrorRes = true,
  autoErrorData = true
) => {
  const itemKey = url + '#' + JSON.stringify(params)
  let itemVal = sessionStorage.getItem(itemKey)
  const nowTime = new Date().getTime()
  if (itemVal) {
    itemVal = JSON.parse(itemVal)
    const overTime = nowTime - itemVal.last_time
    if (outTime < 0 || overTime < outTime * 1000) {
      return Promise.resolve(itemVal.data)
    }
  }
  return request(url, params, config, autoErrorRes, autoErrorData).then(
    data => {
      sessionStorage.setItem(
        itemKey,
        JSON.stringify({
          last_time: nowTime,
          data: data
        })
      )
      return data
    }
  )
}

// 使用localStorage缓存的请求
export const localRequest = (
  url,
  params,
  outTime = 604800,
  config = {},
  autoErrorRes = true,
  autoErrorData = true
) => {
  const itemKey = url + '#' + JSON.stringify(params)
  let itemVal = localStorage.getItem(itemKey)
  const nowTime = new Date().getTime()
  if (itemVal) {
    itemVal = JSON.parse(itemVal)
    const overTime = nowTime - itemVal.last_time
    if (outTime < 0 || overTime < outTime * 1000) {
      return Promise.resolve(itemVal.data)
    }
  }
  return request(url, params, config, autoErrorRes, autoErrorData).then(
    data => {
      localStorage.setItem(
        itemKey,
        JSON.stringify({
          last_time: nowTime,
          data: data
        })
      )
      return data
    }
  )
}
