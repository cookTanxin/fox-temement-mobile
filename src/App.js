// react-router-dom
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
// 页面组件
import Home from "./pages/Home"
import CityList from "./pages/CityList"
import Map from "./pages/Map"
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} render={() => <Redirect to={"/home"}></Redirect>}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/citylist" component={CityList}></Route>
          <Route path="/map" component={Map}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
