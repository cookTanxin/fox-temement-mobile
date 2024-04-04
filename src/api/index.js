import request from "../utils/request"
// 轮播图
export function getSwiperData() {
  return request("home/swiper", "get")
}
// 租房小组
export function getGrousData(params) {
  return request("home/groups", "get", params)
}
// 获取租房资讯
export function getInfoData(params) {
  return request("home/news", "get", params)
}

// 根据城市名称查询该城市信息
export function getCity(params) {
  return request("area/info", "get", params)
}
