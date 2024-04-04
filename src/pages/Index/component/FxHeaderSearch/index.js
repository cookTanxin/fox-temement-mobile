import React, { Component } from "react"
import style from "./index.module.scss"
import searchImg from "./image/search-icon.png"
import arrow from "./image/arrow.png"
class Index extends Component {
  render() {
    return (
      <div className={style.header_search}>
        <div className={style.location}>
          <div className={style.cityname}>{this.props.city ? this.props.city : "定位中..."}</div>
          <div className={style.icon}>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div className={style.search}>
          <img src={searchImg} alt="search" />
        </div>
      </div>
    )
  }
}

export default Index
