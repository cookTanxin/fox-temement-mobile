import React, { useCallback, useEffect, useRef, useState } from "react"
// component
import FxNavBar from "../../components/FxNavBar"
import FXRoomList from "./component/FxRoomList"
import { Toast } from "antd-mobile"
// style
import styles from "./index.module.scss"
// api
import { getMapDataList, getHouseList } from "../../api/map"
import { shallowEqual, useSelector } from "react-redux"
// 百度地图
const BMap = window.BMap
// 覆盖物样式
const labelStyle = {
  cursor: "pointer",
  border: "0px solid rgb(255, 0, 0)",
  padding: "0px",
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: "rgb(255, 255, 255)",
  textAlign: "center"
}
function Map(props) {
  // map
  let mapRef = useRef(null)
  // 房源数据
  const [roomList, setRoomList] = useState([])
  // 是否显示房源列表弹窗
  const [showRoomList, setShowRoomList] = useState(false)
  // hook
  const { city, cityid } = useSelector((state) => {
    return {
      city: state.indexStore.currentCity.label || "上海",
      cityid: state.indexStore.currentCity.value || "AREA|dbf46d32-7e76-1196"
    }
  }, shallowEqual)
  // 初始化地图
  const initMap = useCallback(() => {
    mapRef.current = new BMap.Map("map") // 创建地图实例
    // 创建一个地址解析器实例
    const bdGeocoder = new BMap.Geocoder()
    // 根据用户选择的城市定位到地图
    bdGeocoder.getPoint(
      null,
      async ({ lat, lng }) => {
        const point = new BMap.Point(lng, lat) // 创建点坐标
        mapRef.current.centerAndZoom(point, 11) // 初始化地图，设置中心点坐标和地图级
        // 添加控制条
        mapRef.current.addControl(new BMap.NavigationControl())
        mapRef.current.addControl(new BMap.ScaleControl())
        // 渲染覆盖物
        await renderMap(cityid)
      },
      city
    )
    // 给地图添加移动事件
    mapRef.current.addEventListener("movestart", () => {
      setShowRoomList(false)
    })
  }, [city, cityid])
  useEffect(() => {
    // 初始化地图
    initMap()
  }, [initMap])
  // 渲染地图数据
  const renderMap = useCallback(async () => {
    Toast.show({
      icon: "loading",
      content: "加载中...",
      duration: 0
    })
    let params = {
      id: cityid
    }
    const data = await getMapDataList(params)
    // 获取地图缩放大小
    const { nextZoom, type } = getMapZoom()
    data.body.forEach((item, index) => {
      addLocation(nextZoom, type, item)
    })
    // 清除loading
    Toast.clear()
  }, [cityid])

  // 计算要绘制的覆盖物类型和下一个缩放级别
  // 区   -> 11 ，范围：>=10 <12
  // 镇   -> 13 ，范围：>=12 <14
  // 小区 -> 15 ，范围：>=14 <16
  const getMapZoom = () => {
    // 返回地图的缩放大小
    const zoom = mapRef.current.getZoom()
    let nextZoom, type
    if (zoom >= 10 && zoom < 12) {
      console.log("区")
      // 下一个缩放级别
      nextZoom = 13
      // 覆盖物形状
      type = "circle"
    } else if (zoom >= 12 && zoom <= 14) {
      // 镇
      // 下一个缩放级别
      nextZoom = 15
      // 覆盖物形状
      type = "circle"
    } else if (zoom >= 14 && zoom <= 16) {
      // 小区
      // 覆盖物形状
      type = "rect"
    }
    return {
      nextZoom,
      type
    }
  }

  // 渲染覆盖物
  const addLocation = (zoom, type, item) => {
    const {
      coord: { latitude, longitude },
      value,
      label,
      count
    } = item
    // 创建坐标对象
    const poinit = new BMap.Point(longitude, latitude)
    // 判断是渲染 区 还是小区 根据type 来判断
    if (type === "circle") {
      // 渲染圆形
      renderCicle(poinit, value, label, count, zoom)
    } else {
      // 渲染小区
      renderRect(poinit, value, label, count, zoom)
    }
  }

  // 渲染圆形
  const renderCicle = (poinit, id, name, count, zoom) => {
    // 创建一个覆盖物
    const label = new BMap.Label("", {
      position: poinit,
      offset: new BMap.Size(-35, -35)
    })
    // 给 label 对象添加一个唯一标识
    label.id = id
    // 设置房源覆盖物内容
    label.setContent(`
     <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
      </div>
    `)
    // 设置样式
    label.setStyle(labelStyle)
    // 监听点击事件
    label.addEventListener("click", () => {
      // 获取区下面的房源数据
      renderMap(id)
      // // 放大地图 以区的坐标放大地图
      mapRef.current.centerAndZoom(poinit, zoom)
      // 清除覆盖物 显示区的覆盖物
      setTimeout(() => {
        mapRef.current.clearOverlays()
      })
    })
    mapRef.current.addOverlay(label)
  }
  // 渲染矩形
  const renderRect = (poinit, id, name, count, zoom) => {
    // // 创建一个覆盖物
    const label = new BMap.Label("", {
      position: poinit,
      offset: new BMap.Size(-35, -35)
    })
    // 给覆盖物设置内内容
    label.setContent(`<div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>`)
    // 覆盖样式
    label.setStyle(labelStyle)
    // 监听覆盖物点击事件
    label.addEventListener("click", (e) => {
      // 当点击房源的时候查询当前小区下面的房源数据
      getHouseListdata(id)
      // 计算偏移像素
      const touchY = (window.innerHeight - 500) / 2 - e.changedTouches[0].clientY
      const touchX = window.innerWidth / 2 - e.changedTouches[0].clientX
      mapRef.current.centerAndZoom(poinit, 16)
      // 移动地图
      mapRef.current.panBy(touchX, touchY)
    })
    // 把覆盖物添加到地图上面
    mapRef.current.addOverlay(label)
  }

  // 查询房源数据
  const getHouseListdata = async (id) => {
    Toast.show({
      icon: "loading",
      content: "房源加载中..."
    })

    const data = await getHouseList({ cityId: id })
    Toast.clear()
    // 设置房源数据
    setRoomList(data.body.list)
    // 显示弹窗
    setShowRoomList(true)
  }

  return (
    <div className={styles.ignoremappage}>
      <div className={styles.ignoreheaderarea}>
        <FxNavBar>地图找房</FxNavBar>
      </div>
      {/*地图区域*/}
      <div id="map" className={styles.bdmap}></div>
      {/*房屋列表区域*/}
      <FXRoomList show={showRoomList} roomList={roomList}></FXRoomList>
    </div>
  )
}

export default Map
