import React from "react"
import styles from "./index.module.scss"
function FxfilterFooter(props) {
  const cancel = () => {
    props.cancel()
  }
  const confirm = () => {
    props.confirm()
  }
  return (
    <div className={styles.footerarea}>
      <div className={styles.cancel} onClick={cancel}>
        取消
      </div>
      <div className={styles.confirm} onClick={confirm}>
        确认
      </div>
    </div>
  )
}

export default FxfilterFooter
