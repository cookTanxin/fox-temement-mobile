import React from "react"
import PropTypes from "prop-types"
import { RightOutline } from "antd-mobile-icons"
import style from "./index.module.scss"
const FxHeader = (props) => {
  return (
    <div className={style.fxhedaer}>
      <div className={style.left}>
        <h2>{props.title}</h2>
        <span>{props.desc}</span>
      </div>
      <div className={style.right}>
        <span>更多</span>
        <RightOutline />
      </div>
    </div>
  )
}
FxHeader.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
}
FxHeader.defaultProps = {
  title: "优质推荐",
  desc: "优质房源推荐"
}

export default FxHeader
