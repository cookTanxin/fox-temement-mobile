import request from "../utils/request"

// 获取房屋查询条件
export function getQueryCondition(params) {
  return request("houses/condition", "get", params)
}

// 查询房屋列表
export function getHouseList(params) {
  return request("houses", "get", params)
}
