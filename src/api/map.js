import request from "../utils/request"

export function getBAiDuIpCity() {
  return new Promise((resolve, reject) => {
    try {
      const localCity = new window.BMap.LocalCity()
      localCity.get((res) => {
        resolve(res)
      })
    } catch (e) {
      reject(e)
    }
  })
}
//查询房源数据
export function getMapDataList(params) {
  return request("area/map", "get", params)
}
// 查询房源数据
export function getHouseList(params) {
  return request("/houses", "get", params)
}
