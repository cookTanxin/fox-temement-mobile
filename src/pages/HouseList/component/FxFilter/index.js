import React, { useEffect, useState } from "react"
import styles from "./index.module.scss"
// component
import FxFilterTitle from "../FxFilterTitle"
import FxFilterPicker from "../FxFilterPicker"
import FxFilterMore from "../FxFilterMore"
// api
import { getQueryCondition } from "../../../../api/houselist"
// redux
import { useSelector } from "react-redux"
import { Toast } from "antd-mobile"

// filter 和 more 默认选择
const selectDefault = {
  area: ["area", "null"],
  mode: ["null"],
  price: ["null"],
  more: []
}
// filter 和 more 选中高亮
const titleStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}
function FxFilter(props) {
  // 当前选中筛选项
  const [currentFilter, setCurrentFilter] = useState("")
  // 选项数据
  const [options, setOptions] = useState({})
  // 标题高亮
  const [titleStatusData, setTitleStatus] = useState(titleStatus)
  // 数据选中项
  const [selectedval, setSelectedval] = useState(selectDefault)
  // 当前选中选项数据
  const [currentOptions, setCurrentOptions] = useState([])
  // 是否显示mask
  const [showMask, setShowMask] = useState(false)
  // redux
  const cityid = useSelector((state) => state.indexStore.currentCity.value)
  useEffect(() => {
    // 获取查询条件
    getQueryData(cityid)
  }, [cityid])
  useEffect(() => {
    const body = document.body
    if (currentFilter) {
      body.style.overflow = "hidden"
    } else {
      body.style.overflow = ""
    }
  }, [currentFilter])
  // 点击筛选标题
  const changeTitle = (item) => {
    // 标题筛选数据高亮
    const newtitleState = { ...titleStatusData }
    // 根据用户点击的选项 传入对应的数据给组件
    let newOptions = []
    // 解构数据
    const { area, subway, rentType, price, roomType, oriented, floor, characteristic } = options
    Object.keys(titleStatusData).forEach((key) => {
      // 如果是点击的自身就直接设置高亮 如果不是还需要检查其他是否高亮 需要判断用户是否选择数据
      if (key === item.type) {
        newtitleState[item.type] = true
        return
      }
      if (key === "area" && selectedval[key][1] !== "null") {
        newtitleState[key] = true
      } else if (key === "mode" && selectedval[key][0] !== "null") {
        newtitleState[key] = true
      } else if (key === "price" && selectedval[key][0] !== "null") {
        newtitleState[key] = true
      } else if (key === "more" && selectedval[key].length > 0) {
        newtitleState[key] = true
      } else {
        newtitleState[key] = false
      }
    })

    // 如果点击的是区域 还需要判断是否选择框是否有数据
    if (item.type === "area") {
      newOptions = [area, subway]
    }
    if (item.type === "mode") {
      newOptions = [...rentType]
    }
    if (item.type === "price") {
      newOptions = [...price]
    }
    if (item.type === "more") {
      newOptions = [roomType, oriented, floor, characteristic]
    }
    // 显示遮罩
    setShowMask(true)
    // 当前选中type
    setCurrentFilter(item.type)
    // 选择器数据
    setCurrentOptions(newOptions)
    // 标题高亮
    setTitleStatus(newtitleState)
  }
  // 获取查询条件
  const getQueryData = async (id) => {
    // 提示
    Toast.show({
      icon: "loading",
      content: "加载中...",
      duration: 0,
      maskClickable: false
    })
    const params = { id }
    const data = await getQueryCondition(params)
    Toast.clear()
    setOptions(data.body)
  }
  // 关闭弹窗
  const closeMask = () => {
    setShowMask(false)
    setCurrentFilter("")
  }
  // 渲染mask
  const renderMask = () => {
    if (showMask && currentFilter !== "more") {
      return <div className={styles.mask} onClick={closeMask}></div>
    }
    return null
  }
  const pickercancel = () => {
    setShowMask(false)
    setCurrentFilter("")
  }
  // 选择确认
  const pickerconfirm = (data, type) => {
    setShowMask(false)
    setCurrentFilter("")
    // 复杂数据类型 需要拷贝一份数据 才能操作 浅层拷贝
    const newSelectval = { ...selectedval }
    newSelectval[type] = data
    const newTitleStatus = { ...titleStatusData }
    // 判断选择器类型 和用户是否选择了数据
    if (type === "area" && data[1] !== "null") {
      newTitleStatus[type] = true
    } else if (type === "mode" && data[0] !== "null") {
      newTitleStatus[type] = true
    } else if (type === "price" && data[0] !== "null") {
      newTitleStatus[type] = true
    } else if (type === "more" && data.length > 0) {
      newTitleStatus[type] = true
    } else {
      newTitleStatus[type] = false
    }
    // 更新数据
    setSelectedval(newSelectval)
    setTitleStatus(newTitleStatus)
    // 更新筛选条件
    const { area, mode, more, price } = newSelectval
    let filterData = {}
    console.log(newSelectval)
    // 区域
    const areaKey = area[0]
    // 选中区域key
    let areaValue = ""
    if (area.length === 4) {
      areaValue = area[2] !== "null" ? area[2] : area[1]
    }
    filterData[areaKey] = areaValue
    // 方式
    filterData.mode = mode[0]
    // 租金
    filterData.price = price[0]
    // 更多
    filterData.more = more.join("|")
    // 把数据传递给父组件
    props.filterData({ ...filterData })
  }
  // 关闭更多弹窗
  const closemore = () => {
    setCurrentFilter("")
    setShowMask(false)
  }
  return (
    <div className={styles.filter}>
      {/*遮罩元素*/}
      {renderMask()}
      {/*筛选标题区域*/}
      <div className={styles.filterheader}>
        <FxFilterTitle
          titleStatusData={titleStatusData}
          click={changeTitle}
          titleStatus={currentFilter}
        ></FxFilterTitle>
      </div>
      {/*选择器*/}
      <div className={styles.filterpicker}>
        {showMask && currentFilter !== "more" && (
          <FxFilterPicker
            key={selectedval[currentFilter]}
            cancel={pickercancel}
            confirm={pickerconfirm}
            options={currentOptions}
            openType={currentFilter}
            defaultValue={selectedval[currentFilter]}
          ></FxFilterPicker>
        )}
        {showMask && currentFilter === "more" && (
          <FxFilterMore
            close={closemore}
            confirmData={pickerconfirm}
            select={selectedval["more"]}
            options={currentOptions}
          ></FxFilterMore>
        )}
      </div>
    </div>
  )
}

export default FxFilter
