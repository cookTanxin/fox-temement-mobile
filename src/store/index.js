import { createStore, compose, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { thunk } from "redux-thunk"
import reducer from "./reducer"

const persistConfig = {
  key: "root",
  storage,
  // 不添加到本地存储数据
  blacklist: ["citylistStore"]
}

// 持久化根reducers
const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
// 5. 持久化store对象
let persistor = persistStore(store)
export default store
export { persistor }
