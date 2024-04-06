import React from "react"
import { NavBar } from "antd-mobile"
import PropTypes from "prop-types"
import style from "./index.module.scss"

function FxNavBar(props) {
  const back = () => {
    props.back()
  }
  return (
    <div className={style.navcontent}>
      <NavBar className={style.ignorenavbar} onBack={back}>
        {props.children}
      </NavBar>
    </div>
  )
}
// 组件类型
FxNavBar.propTypes = {
  children: PropTypes.string,
  back: PropTypes.func
}

export default FxNavBar
