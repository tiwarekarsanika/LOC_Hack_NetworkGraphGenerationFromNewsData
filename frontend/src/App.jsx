import ChatApp from "./components/ChatApp"
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import MyPortfolio from "./components/MyPortfolio"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={ChatApp}/>
          <Route path='/myportfolio' Component={MyPortfolio}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
