import React, { useEffect, useState } from "react"
import styles from "./index.module.scss"
import { List, Toast, Modal } from "antd-mobile"
import { AddSquareOutline, UserOutline } from "antd-mobile-icons"
import exiticon from "../../assets/images/exiticon.png"
import defaultavatar from "../../assets/images/defaultavatar.png"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { clearUserTokenAction } from "../../store/module/user/actionCreators"
import { getUserinfoData } from "../../api/user"
import { joinImgUrl } from "../../utils"
function Profile(props) {
  // hook
  const [userinfodata, setUserinfodata] = useState({})
  // 点击登录
  const login = () => {
    props.history.push("/login", {
      from: props.location
    })
  }
  // 获取token
  const token = useSelector((state) => {
    return state.userStore.token
  }, shallowEqual)
  // hook
  const dispatch = useDispatch()
  // hook
  useEffect(() => {
    getUserinfo()
  }, [])
  // 获取用户数据
  const getUserinfo = async () => {
    if (!token) return
    Toast.show({
      icon: "loading",
      content: "加载中..."
    })
    const data = await getUserinfoData()
    setUserinfodata(data.body)
    Toast.clear()
  }
  // 渲染用户信息
  const renderUserinfo = () => {
    if (token) {
      return (
        <>
          <div className={styles.avatar}>
            <img src={joinImgUrl(userinfodata.avatar)} alt="" />
          </div>
          <div className={styles.loginbtn}>
            <p>{userinfodata.nickname}</p>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className={styles.avatar}>
            <img src={defaultavatar} alt="" />
          </div>
          <div className={styles.loginbtn}>
            <span onClick={login}>登录/注册</span>
          </div>
        </>
      )
    }
  }
  // 退出登录
  const loginOut = () => {
    Modal.confirm({
      content: "确认退出登录吗？",
      showCloseButton: true,
      onConfirm: () => {
        console.log("Confirmed")
        dispatch(clearUserTokenAction())
      }
    })
  }
  return (
    <div className={styles.profilepage}>
      <div className={styles.topseting}>
        {!!token && <img onClick={loginOut} src={exiticon} alt="exiticon icon" />}
      </div>
      <div className={styles.userinfo}>
        {/*用户数据渲染*/}
        {renderUserinfo()}
      </div>

      <div className={styles.listcontent}>
        <List>
          <List.Item prefix={<AddSquareOutline color="var(--fx-primary)" />}>我的收藏</List.Item>
          <List.Item prefix={<UserOutline color="var(--fx-primary)" />}>发布房屋</List.Item>
        </List>
      </div>
    </div>
  )
}

export default Profile
