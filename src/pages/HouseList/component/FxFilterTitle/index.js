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
function FxFilterTitle({ click, titleStatus }) {
  const [titleData, setTitleData] = useState(initialTitleData)
  const clicktitle = (item) => {
    click(item)
  }
  console.log(setTitleData)
  return (
    <div className={styles.filtertitle}>
      <ul>
        {titleData.map((item, index) => {
          return (
            <li
              key={index}
              className={titleStatus === item.type ? styles.active : ""}
              onClick={(e) => clicktitle(item)}
            >
              <p>{item.title}</p>
              <i>
                <DownFill fontSize={12} color={titleStatus === item.type ? "#FF523D" : "#cccccc"} />
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
  click: PropTypes.func,
  // 当前选中项
  titleStatus: PropTypes.string
}

export default FxFilterTitle
