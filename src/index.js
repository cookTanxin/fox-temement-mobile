import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import store, { persistor } from "./store/index"
import { PersistGate } from "redux-persist/integration/react"

// 样式重置
import "normalize.css"
// style 样式
import "./styles/main.scss"
// andt 样式修改
import "./styles/custom.scss"
// react-virtualized
import "react-virtualized/styles.css"
import "antd-mobile/bundle/css-vars-patch.css"
import VConsole from "vconsole"
// 只有在开发环境才显示 vconsole
if (process.env.NODE_ENV !== "production") {
  new VConsole()
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
