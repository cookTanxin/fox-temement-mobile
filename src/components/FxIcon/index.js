import React from "react"
import home from "@/assets/icon/home.png"
import homeActive from "@/assets/icon/home-active.png"
import find from "@/assets/icon/find.png"
import findActive from "@/assets/icon/find-active.png"
import news from "@/assets/icon/news.png"
import newsActive from "@/assets/icon/news-active.png"
import profile from "@/assets/icon/user.png"
import profileActive from "@/assets/icon/user-active.png"
import style from "./index.module.scss"
const HomeIcon = () => {
  return <img src={home} alt="home" className={style.iconimg} />
}
const HomeIconActive = () => {
  return <img src={homeActive} alt="homeactive" className={style.iconimg} />
}
const FindIcon = () => {
  return <img src={find} alt="find" className={style.iconimg} />
}
const FindIconActive = () => {
  return <img src={findActive} alt="findActive" className={style.iconimg} />
}
const NewsIcon = () => {
  return <img src={news} alt="find" className={style.iconimg} />
}
const NewsIconActive = () => {
  return <img src={newsActive} alt="findActive" className={style.iconimg} />
}
const ProfileIcon = () => {
  return <img src={profile} alt="find" className={style.iconimg} />
}
const ProfileIconActive = () => {
  return <img src={profileActive} alt="findActive" className={style.iconimg} />
}

export {
  HomeIcon,
  HomeIconActive,
  FindIcon,
  FindIconActive,
  NewsIcon,
  NewsIconActive,
  ProfileIconActive,
  ProfileIcon
}
