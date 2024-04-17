import request from "../utils/request"

// 获取用户资料数据
export function getUserinfoData() {
  return request("user", "get")
}
