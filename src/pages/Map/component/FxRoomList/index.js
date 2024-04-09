import React from "react"
import PropTypes from "prop-types"
import styles from "./index.module.scss"
import classNames from "classnames"
import FxRoomitem from "../../../../components/FxRoomitem"
Index.propTypes = {
  roomList: PropTypes.array,
  // 是否显示
  show: PropTypes.bool.isRequired
}

function Index(props) {
  return (
    <div className={classNames(styles.ignoreroomList, { [styles.show]: props.show })}>
      {props.roomList.map((item, index) => {
        return <FxRoomitem key={item.houseCode} item={item}></FxRoomitem>
      })}
    </div>
  )
}

export default Index
