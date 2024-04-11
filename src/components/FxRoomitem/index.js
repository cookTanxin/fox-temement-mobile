import React from "react"
import PropTypes from "prop-types"
import styles from "./index.module.scss"
import { Image } from "antd-mobile"
import { joinImgUrl } from "../../utils"

Index.propTypes = {
  item: PropTypes.object.isRequired
}

function Index(props) {
  return (
    <div className={styles.roomitem}>
      <div className={styles.leftimg}>
        <Image src={joinImgUrl(props.item.houseImg)}></Image>
      </div>
      <div className={styles.rightcontent}>
        <div className={styles.roomtitle}>{props.item.title}</div>
        <div className={styles.desctitle}>{props.item.desc}</div>
        <div className={styles.taglist}>
          {props.item.tags.map((tag, index) => {
            return (
              <p key={index} className={styles.itemtag + " ellipsis"}>
                {tag}
              </p>
            )
          })}
        </div>
        <div className={styles.price}>{props.item.price}</div>
      </div>
    </div>
  )
}

export default Index
