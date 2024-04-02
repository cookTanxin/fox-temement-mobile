import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { Button } from "antd-mobile"
import Home from "./pages/Home"
import CityList from "./pages/CityList"
function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/home">首页</Link>
            <Button>hello</Button>
          </li>
          <li>
            <Link to="/citylist">城市</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/citylist" component={CityList}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
