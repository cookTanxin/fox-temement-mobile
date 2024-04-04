import React, { Component } from "react"
import style from "./index.module.scss"
import { Grid, Skeleton } from "antd-mobile"
// component
import FxHeaderSearch from "./component/FxHeaderSearch"
import FxSwiper from "./component/FxSwiper"
import FxHeader from "../../components/FxHeader"
import FxInfoItem from "../../components/FxInfoItem"
// 导入菜单图标
import Nav1 from "../../assets/images/icon-full.png"
import Nav2 from "../../assets/images/icon-join.png"
import Nav3 from "../../assets/images/icon-map.png"
import Nav4 from "../../assets/images/icon-friend.png"
// api
import { getSwiperData, getGrousData, getInfoData } from "../../api/index"
// actionCreator
import { getUserCurrentCity } from "../../store/module/index/actionCreators"
// store
import store from "../../store"
// utils
import { joinImgUrl } from "../../utils"

class Index extends Component {
  state = {
    // 当前城市信息
    currentCity: "",
    // 轮播图数据
    swiperData: [],
    // 租房小组数据
    groupList: [],
    // 租房资讯
    info: [],
    // 导航菜单数据
    navList: [
      {
        id: 1,
        img: Nav1,
        title: "整租",
        path: "/home/houseList"
      },
      {
        id: 2,
        img: Nav2,
        title: "合租",
        path: "/home/houseList"
      },
      {
        id: 3,
        img: Nav3,
        title: "地图找房",
        path: "/map"
      },
      {
        id: 4,
        img: Nav4,
        title: "去出租",
        path: "/rent/add"
      }
    ]
  }
  // 货物轮播图数据
  getSwiper = async () => {
    const data = await getSwiperData()
    this.setState({
      swiperData: data.body
    })
  }
  // 获取租房小组数据
  getGroup = async () => {
    let params = {
      area: "AREA|88cff55c-aaa4-e2e0"
    }
    const data = await getGrousData(params)
    this.setState({
      groupList: data.body
    })
  }
  // 获取租房资讯数据
  getInfo = async () => {
    let params = {
      area: "AREA|88cff55c-aaa4-e2e0"
    }
    const data = await getInfoData(params)
    this.setState({
      info: data.body
    })
  }
  // 导航跳转页面
  goPage = (item) => {
    this.props.history.push(item.path)
  }
  // 渲染导航数据
  renderNav = () => {
    return (
      <Grid columns={4} gap={8}>
        {this.state.navList.map((item) => {
          return (
            <Grid.Item key={item.id} onClick={() => this.goPage(item)}>
              <div className={style.navitem}>
                <img src={item.img} alt="" />
                <p>{item.title}</p>
              </div>
            </Grid.Item>
          )
        })}
      </Grid>
    )
  }
  // 渲染租房小组
  renderGroup = () => {
    return (
      <Grid columns={2} gap={8}>
        {this.state.groupList.map((item) => {
          return (
            <Grid.Item key={item.id}>
              <div className={style.groupitem}>
                <div className={style.left}>
                  <h2>{item.title}</h2>
                  <span>{item.desc}</span>
                </div>
                <div className={style.right}>
                  <img src={joinImgUrl(item.imgSrc)} alt="" />
                </div>
              </div>
            </Grid.Item>
          )
        })}
      </Grid>
    )
  }
  // 渲染租房资讯
  renderInfo = () => {
    return this.state.info.map((item) => {
      return <FxInfoItem item={item} key={item.id}></FxInfoItem>
    })
  }

  render() {
    return (
      <div className={style.indexwrap}>
        <div className={style.header_area}>
          <FxHeaderSearch city={this.state.currentCity}></FxHeaderSearch>
        </div>
        <div className={style.swiper_area}>
          {this.state.swiperData.length > 0 ? (
            <FxSwiper data={this.state.swiperData}></FxSwiper>
          ) : (
            <Skeleton animated className={style.customSkeleton} />
          )}
        </div>
        <div className={style.icon_area}>{this.renderNav()}</div>
        {/*租房小组*/}
        <div className={style.temement}>
          <FxHeader title={"租房小组"}></FxHeader>
          <div className={style.temementgroup}>
            {this.state.groupList.length > 0 ? (
              this.renderGroup()
            ) : (
              <Skeleton.Paragraph lineCount={5} animated />
            )}
          </div>
        </div>
        {/*资讯*/}
        <div className={style.info}>
          <FxHeader title={"租房资讯"}></FxHeader>
          <div className={style.info_list}>
            {this.state.groupList.length > 0 ? (
              this.renderInfo()
            ) : (
              <Skeleton.Paragraph lineCount={5} />
            )}
          </div>
        </div>
      </div>
    )
  }
  async componentDidMount() {
    this.subscribe = store.subscribe(() => {
      this.setState({
        currentCity: store.getState().indexStore.currentCity.label
      })
    })
    // 录播图数据
    await this.getSwiper()
    // 租房小组
    await this.getGroup()
    // 获取租房资讯
    await this.getInfo()
    // 获取当前城市
    await store.dispatch(getUserCurrentCity())
  }
}

export default Index
