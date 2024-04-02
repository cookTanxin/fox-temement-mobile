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
import { MessageOutline, MessageFill, UserOutline } from "antd-mobile-icons"
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
      tabs: [
        {
          key: "home",
          title: "首页",
          path: "/home/index",
          icon: (active) => (active ? <HomeIconActive /> : <HomeIcon />)
        },
        {
          key: "find",
          title: "找房",
          path: "/home/houseList",
          icon: (active) => (active ? <FindIconActive /> : <FindIcon />)
        },
        {
          key: "news",
          title: "资讯",
          path: "news",
          icon: (active) => (active ? <NewsIconActive /> : <NewsIcon />)
        },
        {
          key: "profile",
          title: "我的",
          path: "profile",
          icon: (active) => (active ? <ProfileIconActive /> : <ProfileIcon />)
        }
      ],
      // 当前路由名称
      currentRouteName: this.props.history.location.pathname
    }
  }
  // 切换tabbar
  changeTab = (key) => {
    console.log(key)
  }
  render() {
    return (
      <div className={style.homewrap}>
        <div className="content-area">
          <Route path={"/home/index"} component={Index}></Route>
          <Route path={"/home/houseList"} component={HouseList}></Route>
          <Route path={"/home/news"} component={News}></Route>
          <Route path={"/home/profile"} component={Profile}></Route>
        </div>
        <div className={style.tabbar_area}>
          <TabBar onChange={this.changeTab}>
            {this.state.tabs.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
