import * as actionTypes from "./constants"
// api
import { getCityData, getHotCity } from "../../../api/citylist"
// ui
import { Toast } from "antd-mobile"
// 管理城市数据
function cityAction(data) {
  return {
    type: actionTypes.CHANGE_CITYLIST,
    data
  }
}

// 因为city是异步获取 需要使用reducer-thunk
function getCityListData() {
  return async (dispatch, getState) => {
    const toast = Toast.show({
      icon: "loading",
      content: "加载中…"
    })
    let params = { level: 1 }
    // 城市列表数据
    const city = {}
    // 城市列表索引
    let index = []
    const data = await getCityData(params)
    const hotCity = await getHotCity()
    toast.close()
    data.body.forEach((item, indey) => {
      const word = item.short.substring(0, 1)
      // 有值
      if (city[word]) {
        city[word].push(item)
      } else {
        city[word] = []
        city[word].push(item)
      }
    })
    // 枚举自身属性成为一个数组数据
    index = Object.keys(city).sort()
    // 添加一个当前定位城市
    city["#"] = [getState().indexStore.currentCity]
    // 添加一个热门城市数据
    city["hot"] = hotCity.body
    // 使用unicode 排序
    index.sort()
    // 索引添加 定位和热门索引
    index.unshift("hot")
    index.unshift("#")
    dispatch(cityAction({ list: city, index }))
  }
}

export { cityAction, getCityListData }

export class changeUserCity {}
