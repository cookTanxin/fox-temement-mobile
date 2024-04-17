// 导入常量
import { CHANGE_USER_INFO, CHANGE_USER_TOKEN, CLEAR_USER_TOKEN } from "./constants"

export function changeUserTokenAction(data) {
  return {
    type: CHANGE_USER_TOKEN,
    data
  }
}

export function changeUserinfoAction(data) {
  return {
    type: CHANGE_USER_INFO,
    data
  }
}

// 清空用户token
export function clearUserTokenAction() {
  return {
    type: CLEAR_USER_TOKEN,
    data: ""
  }
}
