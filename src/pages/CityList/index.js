import React, { useEffect, useState, useRef } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
// style
import stylepage from "./index.module.scss"
// classnames
import classNames from "classnames"
// actionCreators
import { getCityListData } from "../../store/module/citylist/actionCreators"
import { changeUserCity } from "../../store/module/index/actionCreators"
// component
import FxNavBar from "../../components/FxNavBar"
import { List, AutoSizer } from "react-virtualized"
import { Toast } from "antd-mobile"
// config
import { availableCity } from "../../config"
// 标题高度
const titleHeight = 36
// 城市一行高度
const cityHeight = 50
// 格式化标题数据
const formatTitle = (title) => {
  switch (title) {
    case "#":
      return "当前城市"
    case "hot":
      return "热门城市"
    default:
      return title
  }
}
const CityList = (props) => {
  const dispatch = useDispatch()
  // hook
  const listRef = useRef()
  // hook
  const [currentIndex, setCurrentIndex] = useState(0)
  // 是否需要滚动计算
  const [computedIndex, setComputedIndex] = useState(true)
  // 列表渲染函数
  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const rowData = cityData.list[cityData.index[index]]
    const cityTitle = cityData.index[index]
    return (
      <div key={key} style={style}>
        <div className={stylepage.ignorecitytitle}>{formatTitle(cityTitle)}</div>
        {rowData.map((item, indey) => {
          return (
            <div
              key={item.value}
              onClick={() => selectCity(item)}
              className={stylepage.ignorecitytitlecityrow}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }
  // 选择城市
  const selectCity = (item) => {
    if (availableCity.indexOf(item.label) > -1) {
      // 更改全局状态
      dispatch(changeUserCity({ label: item.label, value: item.value }))
      // 返回页面
      props.history.go(-1)
    } else {
      Toast.show({
        icon: "fail",
        content: "该城市暂未开通"
      })
    }
  }
  // 获取store全局数据中的数据
  const { cityData } = useSelector((state) => {
    return {
      cityData: state.citylistStore.city
    }
  }, shallowEqual)
  // hook
  useEffect(() => {
    // 派发store事件
    dispatch(getCityListData())
    if (cityData.list.length > 0 && listRef.current) {
      listRef.current.measureAllRows()
    }
  }, [dispatch, cityData.list.length])
  // 返回页面
  const backPage = () => {
    props.history.go(-1)
  }
  // 获取每一行的高度
  const getRowHeight = ({ index }) => {
    return titleHeight + cityData.list[cityData.index[index]].length * cityHeight
  }
  // 渲染的时候触发的事件
  const onRowsRendered = (data) => {
    if (currentIndex !== data.startIndex && computedIndex) {
      setCurrentIndex(data.startIndex)
    }
  }
  return (
    <div className={stylepage.ignorecitylistpage}>
      <div className={stylepage.ignorenavbar}>
        <FxNavBar back={backPage}>城市列表</FxNavBar>
      </div>

      {/*列表数据展示*/}
      <AutoSizer>
        {({ height, width }) => {
          return (
            <List
              ref={listRef}
              width={width}
              height={height}
              rowCount={cityData.index.length}
              rowHeight={getRowHeight}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
            />
          )
        }}
      </AutoSizer>
      {/*右侧索引数据渲染*/}
      <div className={stylepage.rightindex}>
        <ul>
          {cityData.index.map((item, index) => {
            return (
              <li key={item} className={classNames({ [stylepage.active]: currentIndex === index })}>
                {item === "hot" ? "热" : item}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default CityList
