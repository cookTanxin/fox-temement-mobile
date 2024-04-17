import React, { Component, useEffect, useState } from "react"
// api
import { getInfoData } from "../../api/index"
// component
import FxInfoItem from "../../components/FxInfoItem"
// styles
import styles from "./index.module.scss"
import { useSelector } from "react-redux"
import { Toast } from "antd-mobile"

export default function News() {
  const cityId = useSelector((state) => state.indexStore.currentCity.value)
  useEffect(() => {
    getNewinfo()
  }, [])
  // 列表数据
  const [infoList, setInfoList] = useState([])
  // 获取资讯数据
  const getNewinfo = async () => {
    Toast.show({
      icon: "loading",
      content: "加载中"
    })
    let params = {
      area: cityId
    }
    const data = await getInfoData(params)
    setInfoList(data.body)
    Toast.clear()
  }
  return (
    <div className={styles.newspage}>
      {infoList.map((item, index) => {
        return <FxInfoItem key={index} item={item}></FxInfoItem>
      })}
    </div>
  )
}
