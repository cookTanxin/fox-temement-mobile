import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store/index"

// 样式重置
import "normalize.css"
// style 样式
import "./styles/main.scss"
// andt 样式修改
import "./styles/custom.scss"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
