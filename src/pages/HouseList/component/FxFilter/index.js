import React, { useState } from "react"
import styles from "./index.module.scss"
// component
import FxFilterTitle from "../FxFilterTitle"
import FxFilterPicker from "../FxFilterPicker"
function FxFilter(props) {
  // 当前选中筛选项
  const [currentFilter, setCurrentFilter] = useState("")
  // 点击筛选标题
  const changeTitle = (item) => {
    setCurrentFilter(item.type)
  }
  return (
    <div className={styles.filter}>
      {/*遮罩元素*/}
      <div className={styles.mask}></div>
      {/*筛选标题区域*/}
      <div className={styles.filterheader}>
        <FxFilterTitle click={changeTitle} titleStatus={currentFilter}></FxFilterTitle>
      </div>
      {/*选择器*/}
      <div className={styles.filterpicker}>
        <FxFilterPicker></FxFilterPicker>
      </div>
    </div>
  )
}

export default FxFilter
