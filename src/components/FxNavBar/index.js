import React from "react"
import { NavBar } from "antd-mobile"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import style from "./index.module.scss"

function FxNavBar(props) {
  const back = () => {
    props.back()
  }
  const defaultClick = () => {
    console.log(props.history)
    if (props.history.length <= 1) {
      props.history.push("/")
    } else {
      props.history.go(-1)
    }
  }
  return (
    <div className={style.navcontent}>
      <NavBar className={style.ignorenavbar} onBack={defaultClick || back}>
        {props.children}
      </NavBar>
    </div>
  )
}
// 组件类型
FxNavBar.propTypes = {
  children: PropTypes.string.isRequired,
  back: PropTypes.func
}

export default withRouter(FxNavBar)
