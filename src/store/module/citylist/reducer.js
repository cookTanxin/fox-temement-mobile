import * as actionTypes from "./constants"

// 初始化数据
const defaultState = {
  // 城市列表数据
  city: {
    list: {},
    index: []
  }
}

// 数据的处理者 reducer
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CITYLIST:
      return { ...state, city: action.data }
    default:
      return state
  }
}

export default reducer
