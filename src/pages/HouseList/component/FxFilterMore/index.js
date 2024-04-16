import React from "react"
import styles from "./index.module.scss"
import PropTypes from "prop-types"
import classnames from "classnames"
import FxfilterFooter from "../FxfilterFooter"
const selectTitle = ["户型", "朝向", "楼层", "亮点"]
function FxFilterMore({ close, options, select, confirmData }) {
  // 用户选中的选项
  const [userSelect, setUserSelect] = React.useState(select)
  // 关闭更多弹窗
  const closeMore = () => {
    close()
  }
  // 点击选择盒子
  const selectitembox = (item) => {
    const newselectdata = [...userSelect]
    // 判断是否已选中数据 如果已选中数据 就移除
    if (userSelect.includes(item.value)) {
      // 查找下标索引
      const index = userSelect.indexOf(item.value)
      newselectdata.splice(index, 1)
    } else {
      newselectdata.push(item.value)
    }
    // 更新数据
    setUserSelect(newselectdata)
  }
  // 确认选择
  const confirm = () => {
    confirmData(userSelect, "more")
    close()
  }
  return (
    <div className={styles.filtermore}>
      {/*遮罩*/}
      <div className={styles.mask} onClick={closeMore}></div>
      {/*内容选择区域*/}
      <div className={styles.seleccontent}>
        <ul>
          {options.map((item, index) => (
            <li key={index} className={styles.selectitem}>
              <div className={styles.selecttitle}>
                <span>{selectTitle[index]}</span>
              </div>
              <div className={styles.selectbox}>
                {item.map((itembox, indey) => {
                  const isSelect = userSelect.indexOf(itembox.value) > -1
                  return (
                    <div
                      key={indey}
                      onClick={() => selectitembox(itembox)}
                      className={classnames(styles.selectboxitem, {
                        [styles.on]: isSelect
                      })}
                    >
                      {itembox.label}
                    </div>
                  )
                })}
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <FxfilterFooter cancel={closeMore} confirm={confirm}></FxfilterFooter>
        </div>
      </div>
    </div>
  )
}

FxFilterMore.propTypes = {
  close: PropTypes.func.isRequired
}

export default FxFilterMore
