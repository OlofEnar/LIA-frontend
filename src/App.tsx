import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Users from './pages/Users/Users'
import './assets/styles/main.scss'
import './assets/styles/normalize.css'
import Header from './components/header/Header'
import UserPage from './pages/User/UserPage'


function App() {

const Layout = () => {
  return (
    <div className='container'>
      <Header />
      <main className='mainContent'>
          <div className='contentContainer'>
            <Outlet />
          </div>
      </main>
    </div>
  )
}

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<UserPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
