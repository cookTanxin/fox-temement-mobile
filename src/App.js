// react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// 页面组件
import Home from "./pages/Home"
import CityList from "./pages/CityList"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/citylist" component={CityList}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
