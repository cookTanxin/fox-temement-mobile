import React, { useEffect } from "react"
// component
import FxNavBar from "../../components/FxNavBar"
// style
import styles from "./index.module.scss"
function Map(props) {
  const initMap = () => {
    const map = new window.BMapGL.Map("map") // 创建地图实例
    const point = new window.BMapGL.Point(116.404, 39.915) // 创建点坐标
    map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级
  }
  useEffect(() => {
    // 初始化地图
    initMap()
  }, [])
  return (
    <div className={styles.ignoremappage}>
      <div className={styles.ignoreheaderarea}>
        <FxNavBar>地图找房</FxNavBar>
      </div>
      {/*地图区域*/}
      <div id="map" className={styles.bdmap}></div>
    </div>
  )
}

export default Map
