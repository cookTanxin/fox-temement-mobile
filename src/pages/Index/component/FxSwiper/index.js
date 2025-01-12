import React, { Component } from "react"
import PropTypes from "prop-types"
import style from "./index.module.scss"
import { Swiper } from "antd-mobile"
import { joinImgUrl } from "../../../../utils"
class FxSwiper extends Component {
  // 渲染swiper
  renderSwiper = () => {
    return (
      <Swiper autoplay loop>
        {this.props.data.map((item, index) => {
          return (
            <Swiper.Item key={item.id}>
              <img src={joinImgUrl(item.imgSrc)} alt="banner" />
            </Swiper.Item>
          )
        })}
      </Swiper>
    )
  }
  render() {
    return <div className={style.index_swiper}>{this.renderSwiper()}</div>
  }
}

FxSwiper.propTypes = {
  data: PropTypes.array.isRequired
}

export default FxSwiper
