import request from "../utils/request"

// 获取城市数据
export function getCityData(params) {
  return request("area/city", "get", params)
}

// 获取热门城市数据
export function getHotCity() {
  return request("area/hot", "get")
}
