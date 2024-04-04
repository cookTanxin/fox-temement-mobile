// axios
import axios from "axios"
// 实例化axios
const instance = axios.create({
  // 基础地址
  baseURL: process.env.REACT_APP_BASE_API,
  // 请求超时时间
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 请求携带token
    // const store = useUserStore()
    // if (store.user?.token && config.headers) {
    //   config.headers['Authorization'] = `Bearer ${}`
    // }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器 401 处理
instance.interceptors.response.use(
  (res) => {
    // 后台约定，响应成功，但是status不是200，是业务逻辑失败
    if (res.data?.status !== 200) {
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，响应数据 作为axios 成功的结果
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

const request = (url, method, submitData = {}) => {
  return instance.request({
    url,
    method,
    [method.toUpperCase() === "GET" ? "params" : "data"]: submitData
  })
}

export default request
