import React from "react"
import { CascadePickerView } from "antd-mobile"
import styles from "./index.module.scss"
const options = [
  {
    label: "浙江",
    value: "浙江",
    children: [
      {
        label: "杭州",
        value: "杭州"
      },
      {
        label: "宁波",
        value: "宁波"
      }
    ]
  },
  {
    label: "江苏",
    value: "江苏",
    children: [
      {
        label: "南京",
        value: "南京"
      },
      {
        label: "苏州",
        value: "苏州"
      }
    ]
  }
]
function FxFilterPicker(props) {
  return (
    <div className={styles.filterpicker}>
      <CascadePickerView
        options={options}
        style={{ "--height": "250px", "--item-height": "2rem" }}
      />
    </div>
  )
}

export default FxFilterPicker
