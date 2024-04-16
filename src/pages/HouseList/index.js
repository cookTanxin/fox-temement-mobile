import React, { useCallback, useEffect, useState } from "react"
// style
import styles from "./index.module.scss"
// component
import FxHeaderSearch from "../../components/FxHeaderSearch"
import FxFilter from "./component/FxFilter"
import FxRoomitem from "../../components/FxRoomitem"
import FxSticky from "../../components/FxSticky"
// redux
import { useSelector } from "react-redux"
// api
import { getHouseList } from "../../api/houselist"
// antd
import { InfiniteScroll, Toast } from "antd-mobile"
function HoseList(props) {
  // hook
  const city = useSelector((state) => state.indexStore.currentCity.label)
  // 列表数据
  const [houselistData, setHouselistData] = useState([])
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  // hook redux
  const cityId = useSelector((state) => state.indexStore.currentCity.value)
  // 加载更多
  const loadMore = async (filterData, type = "") => {
    let params = {
      cityId: cityId,
      ...filterData,
      start: type === "query" ? 1 : houselistData.length === 0 ? 1 : houselistData.length,
      end: type === "query" ? 20 : houselistData.length + 20
    }
    const data = await getHouseList(params)
    if (data.body.count > 0 && type === "query") {
      Toast.show({
        content: `共查询${data.body.count}条数据！`,
        duration: 1500
      })
    }
    setHouselistData((pre) => {
      if (type === "query") {
        return [...data.body.list]
      } else {
        return [...pre, ...data.body.list]
      }
    })
    setHasMore(data.body.list.length > 0)
  }
  // 子组件传递给父组件 设置筛选条件
  const onFilterData = async (data) => {
    Toast.show({
      icon: "loading",
      content: "查询中...",
      duration: 3000
    })
    await loadMore(data, "query")
    // 滚动到页面顶部
    window.scrollTo(0, 0)
  }
  return (
    <div className={styles.housepage}>
      <FxSticky>
        <>
          <div className={styles.ignoretophedaer}>
            <FxHeaderSearch showinput city={city} isFixed={false}></FxHeaderSearch>
          </div>
          {/*筛选标题*/}
          <div className={styles.filterarea}>
            <FxFilter filterData={onFilterData}></FxFilter>
          </div>
        </>
      </FxSticky>

      {/*加载列表*/}
      <div className={styles.loadList}>
        <div className={styles.innerlist}>
          {houselistData.map((item, index) => (
            <FxRoomitem item={item} key={index}></FxRoomitem>
          ))}
        </div>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  )
}

export default HoseList
