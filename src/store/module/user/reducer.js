// 导入常量
import { CHANGE_USER_INFO, CHANGE_USER_TOKEN, CLEAR_USER_TOKEN } from "./constants"

// 初始数据
const initialState = {
  // token
  token: "",
  // 用户信息
  userinfo: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_TOKEN:
      return { ...state, token: action.data }
    case CHANGE_USER_INFO:
      return { ...state, userinfo: action.data }
    // 清空用户token
    case CLEAR_USER_TOKEN:
      return { ...state, token: "" }
    default:
      return state
  }
}

export default reducer
