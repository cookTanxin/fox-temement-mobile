// 切换用户当前城市
import * as actionTypes from "./constants"
// api
import { getBAiDuIpCity } from "../../../api/map"
import { getCity } from "../../../api"
// 设置当前城市
export const changeUserCity = (data) => {
  return {
    type: actionTypes.CHANGE_CURRENTCITY,
    data
  }
}

// 获取当前城市的信息 异步
export const getUserCurrentCity = () => {
  return async (dispatch, getState) => {
    // 判断是否已经获取过ip位置了，如果获取以后不不在重新发送请求
    if (getState().indexStore.currentCity.value) {
      dispatch(changeUserCity(getState().indexStore.currentCity))
    } else {
      const city = await getBAiDuIpCity()
      const userCity = await getCity({ name: city.name })
      dispatch(changeUserCity(userCity.body))
    }
  }
}
