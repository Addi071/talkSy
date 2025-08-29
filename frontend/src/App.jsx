import react, { useEffect } from 'react'
import { Navbar } from './components/Navbar.jsx'
import { Routes,Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { Setting } from './pages/Setting.jsx'
import { Profilepage } from './pages/Profilepage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'

function App() {
 const {authUser,checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
 const {theme} = useThemeStore()

 console.log({onlineUsers})

 useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  console.log({authUser})

  if (isCheckingAuth && !authUser)return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )

  return (
    <div data-theme={theme}>
    <Navbar/>
    <div className="pt-16">
    <Routes>
      <Route path="/" element={authUser ? <Home/> : <Navigate to='/login'/>} />
      <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to='/'/> } />
      <Route path="/login" element={!authUser ? <Login/> : <Navigate to='/'/>} />
      <Route path="/setting" element={<Setting/>} />
      <Route path="/profile" element={authUser ?<Profilepage/> : <Navigate to='/login'/>} />
    </Routes>
    <Toaster/>
    </div>
    </div>
  )
}

export default App
