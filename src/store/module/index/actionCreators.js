// 切换用户当前城市
import * as actionTypes from "./constants"
// api
import { getBAiDuIpCity } from "../../../api/map"
import { getCity } from "../../../api"

const changeUserCity = (data) => {
  return {
    type: actionTypes.CHANGE_CURRENTCITY,
    data
  }
}

export const getUserCurrentCity = () => {
  return async (dispatch) => {
    const city = await getBAiDuIpCity()
    const userCity = await getCity({ name: city.name })
    dispatch(changeUserCity(userCity.body))
  }
}
