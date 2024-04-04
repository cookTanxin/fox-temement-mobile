import React, { Component } from "react"
// route
import { Route } from "react-router-dom"
// style
import style from "./index.module.scss"
// 页面
import Index from "../Index"
import Profile from "../Profile"
import News from "../News"
import HouseList from "../HouseList"
// ui
import { TabBar } from "antd-mobile"
// icon
import {
  HomeIcon,
  HomeIconActive,
  FindIcon,
  FindIconActive,
  ProfileIconActive,
  ProfileIcon,
  NewsIconActive,
  NewsIcon
} from "@/components/FxIcon"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // activeKey
      activeKey: this.props.history.location.pathname,
      // tabbar数据
      tabs: [
        {
          key: "/home",
          title: "首页",
          path: "/home",
          icon: (active) => (active ? <HomeIconActive /> : <HomeIcon />)
        },
        {
          key: "/home/houseList",
          title: "找房",
          path: "/home/houseList",
          icon: (active) => (active ? <FindIconActive /> : <FindIcon />)
        },
        {
          key: "/home/news",
          title: "资讯",
          path: "/home/news",
          icon: (active) => (active ? <NewsIconActive /> : <NewsIcon />)
        },
        {
          key: "/home/profile",
          title: "我的",
          path: "/home/profile",
          icon: (active) => (active ? <ProfileIconActive /> : <ProfileIcon />)
        }
      ]
    }
  }
  // 切换tabbar
  changeTab = (key) => {
    this.props.history.push(key)
    this.setState({
      activeKey: key
    })
  }
  render() {
    return (
      <div className={style.homewrap}>
        <div className="content-area">
          <Route exact path={"/home"} component={Index}></Route>
          <Route path={"/home/houseList"} component={HouseList}></Route>
          <Route path={"/home/news"} component={News}></Route>
          <Route path={"/home/profile"} component={Profile}></Route>
        </div>
        <div className={style.tabbar_area}>
          <TabBar onChange={this.changeTab} activeKey={this.state.activeKey}>
            {this.state.tabs.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        </div>
      </div>
    )
  }
  // componentDisupdate 要使用if 条件语句
  componentDidUpdate(prevProps, prevState, snapshot) {
    // 判断当前路由名称和 当前的 key 是否一直 如果不一致以pathname
    if (prevState.activeKey !== this.props.history.location.pathname) {
      this.setState({
        activeKey: this.props.history.location.pathname
      })
    }
  }
}

export default Home
