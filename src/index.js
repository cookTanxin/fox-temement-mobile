import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// 样式重置
import "normalize.css"
// style 样式
import "./styles/main.scss"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
