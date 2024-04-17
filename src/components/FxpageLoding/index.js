import React from "react"
import styles from "./index.module.scss"
import { DotLoading } from "antd-mobile"
function FxpageLoding(props) {
  return (
    <div className={styles.loadingarea}>
      <DotLoading color="primary"></DotLoading>
    </div>
  )
}

export default FxpageLoding
