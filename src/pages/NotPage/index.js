import React from "react"
import styles from "./index.module.scss"
import { ErrorBlock } from "antd-mobile"
function NotPage(props) {
  return (
    <div className={styles.notpage}>
      <ErrorBlock status="empty" />
    </div>
  )
}

export default NotPage
