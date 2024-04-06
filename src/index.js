import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import store from "./store/index"
// 样式重置
import "normalize.css"
// style 样式
import "./styles/main.scss"
// andt 样式修改
import "./styles/custom.scss"
import "react-virtualized/styles.css"
import VConsole from "vconsole"
import App from "./App"
new VConsole()
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
