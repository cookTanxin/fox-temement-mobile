import React from "react"
// style
import styles from "./index.module.scss"
// component
import FxHeaderSearch from "../../components/FxHeaderSearch"
import FxFilter from "./component/FxFilter"
import { useSelector } from "react-redux"

function HoseList(props) {
  // hook
  const city = useSelector((state) => state.indexStore.currentCity.label)
  return (
    <div className={styles.housepage}>
      <div className={styles.tophedaer}>
        <FxHeaderSearch showinput city={city}></FxHeaderSearch>
      </div>
      {/*筛选标题*/}
      <div className={styles.filterarea}>
        <FxFilter></FxFilter>
      </div>
    </div>
  )
}

export default HoseList
