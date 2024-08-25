import { Route, Routes } from 'react-router-dom'
import AuthForm from './pages/AuthForm'
import VarifyEmail from './pages/VarifyEmail'
import Navbar from './components/navbar.component'
import EmailChecking from './components/forgotPassword/EmailChecking'
import PasswordResetLinkSent from './components/forgotPassword/PasswordResetLinkSent'
import ResetPassword from './components/forgotPassword/ResetPassword'
import { useAuthStore } from './store/auth.store'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import LeftSideBar from './components/LeftSideBar'
import FeedPage from './pages/FeedPage'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

function App() {

  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div className='w-full h-full bg-gray-100'>
      <Routes>
        <Route path='/signup' element={<AuthForm type='signup' />} />
        <Route path='/signin' element={<AuthForm type='signin' />} />
        <Route path='/verify-email' element={<VarifyEmail />} />

        <Route path='/forgot-password' element={<EmailChecking />} />
        <Route path='/password-link-sent' element={<PasswordResetLinkSent />} />

        <Route path={`/reset-password/:token`} element={<ResetPassword />} />



        <Route path='/' element={<Navbar />}>
          <Route path='/' element={<LeftSideBar />} >
            <Route path='/' element={<FeedPage />} />
            <Route path='/Search' element={<SearchPage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
