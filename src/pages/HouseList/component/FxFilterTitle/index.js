import React, { useState } from "react"
import styles from "./index.module.scss"
import { DownFill } from "antd-mobile-icons"
import PropTypes from "prop-types"
const initialTitleData = [
  { title: "区域", type: "area" },
  { title: "方式", type: "mode" },
  { title: "租金", type: "price" },
  { title: "筛选", type: "more" }
]
function FxFilterTitle({ click, titleStatusData }) {
  const [titleData] = useState(initialTitleData)
  // 点击标题
  const clicktitle = (item) => {
    click && click(item)
  }
  return (
    <div className={styles.filtertitle}>
      <ul>
        {titleData.map((item, index) => {
          const isSelected = titleStatusData[item.type]
          return (
            <li
              key={index}
              className={isSelected ? styles.active : ""}
              onClick={(e) => clicktitle(item)}
            >
              <p>{item.title}</p>
              <i>
                <DownFill fontSize={12} color={isSelected ? "#FF523D" : "#cccccc"} />
              </i>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
FxFilterTitle.propTypes = {
  // 点击事件
  click: PropTypes.func
}

export default FxFilterTitle
