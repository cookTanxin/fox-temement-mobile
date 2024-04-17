import React, { useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import { Toast } from "antd-mobile"
// 这个鉴权组件 主要的特别是 鉴别用户是否登录 如果没有登录 那么 跳转到 登录界面
function AuthRoute({ component: Component, ...rest }) {
  const token = useSelector((state) => state.userStore.token)

  useEffect(() => {
    // console.log(rest.path)
    if (!token && rest.path !== "/home/profile") {
      Toast.show({
        content: "您还未登录"
      })
    }
  }, [token])
  return (
    <Route
      {...rest}
      // 指定渲染
      render={(props) => {
        if (token) {
          return <Component {...rest}></Component>
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname }
              }}
            />
          )
        }
      }}
    ></Route>
  )
}

export default AuthRoute
