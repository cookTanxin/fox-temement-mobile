import React, { Suspense, lazy } from "react"
// react-router-dom
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
// 页面组件
import pageLoading from "./components/FxpageLoding"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotPage from "./pages/NotPage"
// 鉴权组件
import AuthRoute from "./components/AuthRoute"
const CityList = lazy(() => import("./pages/CityList"))
const Map = lazy(() => import("./pages/Map"))

function App() {
  return (
    <Router>
      <Suspense fallback={<pageLoading></pageLoading>}>
        <div className="App">
          <Switch>
            <Route exact path={"/"} render={() => <Redirect to={"/home"}></Redirect>}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/citylist" component={CityList}></Route>
            <AuthRoute path="/map" component={Map}></AuthRoute>
            <Route path="/login" component={Login}></Route>
            <Route path="*" component={NotPage}></Route>
          </Switch>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
