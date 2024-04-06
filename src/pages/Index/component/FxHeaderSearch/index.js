import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import style from "./index.module.scss"
import searchImg from "./image/search-icon.png"
import arrow from "./image/arrow.png"
class FxHeaderSearch extends Component {
  goPage = () => {
    this.props.history.push("/citylist")
  }
  render() {
    return (
      <div className={style.header_search}>
        <div className={style.location}>
          <div className={style.cityname} onClick={this.goPage}>
            {this.props.city ? this.props.city : "定位中..."}
          </div>
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

export default withRouter(FxHeaderSearch)
