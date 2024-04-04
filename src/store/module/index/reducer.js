import { CHANGE_CURRENTCITY } from "./constants"
// 默认数据
const defaultData = {
  // 定位城市数据
  currentCity: {
    name: "",
    value: ""
  }
}
function reducer(state = defaultData, action) {
  switch (action.type) {
    case CHANGE_CURRENTCITY:
      return { ...state, currentCity: action.data }
    default:
      return state
  }
}

export default reducer
