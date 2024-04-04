import React, { Component } from "react"
import style from "./index.module.scss"
import PropTypes from "prop-types"
import { joinImgUrl } from "../../utils"
class FxInfoItem extends Component {
  render() {
    return (
      <div className={style.item_wrap}>
        <div className={style.left}>
          <img src={joinImgUrl(this.props.item.imgSrc)} alt="" />
        </div>
        <div className={style.right}>
          <p>{this.props.item.title}</p>
          <span className={style.date}>{this.props.item.date}</span>
        </div>
      </div>
    )
  }
}
FxInfoItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default FxInfoItem
