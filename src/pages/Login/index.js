import React, { useEffect, useRef, useState } from "react"
import styles from "./index.module.scss"
import { NavBar, Form, Input, Button, Toast } from "antd-mobile"
// api
import { login as loginapi } from "../../api/login"
import { useDispatch } from "react-redux"
// 导入action
import { changeUserTokenAction, changeUserinfoAction } from "../../store/module/user/actionCreators"

function Login(props) {
  // dispatch
  const dispatch = useDispatch()
  // ref
  const formRef = useRef(null)
  // 用户之前跳转的路径
  const [userFromPathname, setUserFromPathname] = useState("")
  // 按钮加载
  const [loginLoading, setLoginLoading] = useState(false)
  // hook
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  // 返回页面
  const back = () => {
    props.history.goBack()
  }
  // 受控组件表单
  const changeFormdata = (e, type) => {
    setLoginForm((prevState) => {
      return { ...prevState, [type]: e }
    })
  }
  useEffect(() => {
    setUserFromPathname(props.location.state.from)
  }, [])
  // 登录
  const login = async () => {
    // 验证表单是否填写完毕
    try {
      setLoginLoading(true)
      const data = await loginapi(loginForm)
      // 派发事件处理 存储全局数据token
      dispatch(changeUserTokenAction(data.body.token))
      // 返回登录页面
      // props.history.replace("/")
      console.log(userFromPathname)
      if (userFromPathname) {
        props.history.replace(userFromPathname)
      } else {
        props.history.replace("/")
      }
      Toast.show({
        content: "登录成功"
      })
    } catch (e) {
      setLoginLoading(false)
    }
  }
  return (
    <div className={styles.loginpage}>
      <NavBar back="返回" onBack={back}>
        登录
      </NavBar>
      <div className={styles.formarea}>
        <Form ref={formRef}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: "姓名不能为空" }]}
          >
            <Input
              placeholder="请输入姓名"
              clearable
              value={loginForm.username}
              onChange={(e) => changeFormdata(e, "username")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "密码不能为空" }]}
          >
            <Input
              type="password"
              placeholder="请输入密码"
              onChange={(e) => changeFormdata(e, "password")}
              value={loginForm.password}
              clearable
            />
          </Form.Item>
        </Form>
        <div className={styles.loginbutton}></div>
        <Button block color="primary" onClick={login} loading={loginLoading}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
