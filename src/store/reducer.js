// 合并多个reducer reducer 是状态处理者
import { combineReducers } from "redux"

// 首页store模块
import indexReducer from "./module/index"

export default combineReducers({
  indexStore: indexReducer
})
