import React, { useEffect, useRef } from "react"
import styles from "./index.module.scss"
import PropTypes from "prop-types"
function FxSticky(props) {
  const plaRef = useRef(null)
  // 内容ref
  const contentRef = useRef(null)
  useEffect(() => {
    window.addEventListener("scroll", scrollChange)
    return () => {
      window.removeEventListener("scroll", scrollChange)
    }
  }, [])
  // 监听页面滚动
  const scrollChange = (e) => {
    // 判断占位距离 顶部的高度 如果小于0 就添加 固定样式类
    const { top } = plaRef.current.getBoundingClientRect()
    if (top < 0) {
      contentRef.current.classList.add(`${styles.ignorefixed}`)
      plaRef.current.style.height = "64px"
    } else {
      contentRef.current.classList.remove(`${styles.ignorefixed}`)
      plaRef.current.style.height = "0px"
    }
  }
  return (
    <div className={styles.stickywrap}>
      {/*占位元素*/}
      <div className={styles.placeholder} ref={plaRef}></div>
      {/*包裹内容区域*/}
      <div className={styles.content} ref={contentRef}>
        {props.children}
      </div>
    </div>
  )
}

FxSticky.propTypes = {
  children: PropTypes.node
}

export default FxSticky
