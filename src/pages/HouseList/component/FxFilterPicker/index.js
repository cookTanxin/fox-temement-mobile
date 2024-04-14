import React, { useState } from "react"
import { CascadePickerView } from "antd-mobile"
import FxfilterFooter from "../FxfilterFooter"
import styles from "./index.module.scss"
import PropTypes from "prop-types"
function FxFilterPicker(props) {
  const [selectval, setSelectval] = useState([])
  const cancel = () => {
    props.cancel()
  }
  const confirm = () => {
    props.confirm(selectval, props.openType)
  }
  const changeData = (val) => {
    setSelectval([...val])
  }
  return (
    <div className={styles.filterpicker}>
      <CascadePickerView
        options={props.options}
        onChange={changeData}
        defaultValue={props.defaultValue}
        style={{ "--height": "250px", "--item-height": "2rem" }}
      />
      <FxfilterFooter cancel={cancel} confirm={confirm}></FxfilterFooter>
    </div>
  )
}
FxFilterPicker.propTypes = {
  options: PropTypes.array.isRequired,
  openType: PropTypes.string.isRequired,
  defaultValue: PropTypes.array.isRequired
}

export default FxFilterPicker
