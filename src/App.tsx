import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Users from './pages/Users/Users'
import User from './pages/User/User'
import About from './pages/About/About'
import './assets/styles/main.scss'
import './assets/styles/normalize.css'
import Header from './components/header/Header'


function App() {

const Layout = () => {
  return (
      <div className='main'>
        <Header />
        <div className='container'>
          <div className='contentContainer'>
            <Outlet />
          </div>
        </div>
      </div>
  )
}

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
