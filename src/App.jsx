import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DefaultLayout from "./Layout/Default"
import Home from "./Pages/Home"
import Login from "./Pages/User/Login"
import Register from "./Pages/User/Register"
import Recovery from "./Pages/User/Recovery"
import PageNotFound from "./Components/PageNotFound"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/user" element={<DefaultLayout />}>
          <Route index element={<PageNotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recovery" element={<Recovery />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
