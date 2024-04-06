// 合并多个reducer reducer 是状态处理者
import { combineReducers } from "redux"

// 首页store模块
import indexReducer from "./module/index"
// 城市列表 store 模块
import citylistReducer from "./module/citylist"

export default combineReducers({
  // 首页数据管理
  indexStore: indexReducer,
  // 城市列表数据管理
  citylistStore: citylistReducer
})
