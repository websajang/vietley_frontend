/** Implement routing and secure routing **/
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './layouts/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import { AuthProvider } from './context/AuthProvider'
import { TickersProvider } from './context/TickersProvider'
import Tickers from './pages/Tickers'
import NewTicker from './pages/NewTicker'
import Ticker from './pages/Ticker'
import EditTicker from './pages/EditTicker'
import Docs from './pages/Docs'
import Updates from './pages/Updates'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <TickersProvider>
            <Routes>

              {/** Public area **/}
              <Route path='/' element={<AuthLayout />}>

                {/** Index is the first component is going to render when enteringh its parent path **/}
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='forgot-password/:token' element={<NewPassword />} />
                <Route path='confirm/:id' element={<ConfirmAccount />} />
              </Route>

              {/** Private area **/}

              <Route path='/tickers' element={<ProtectedRoute />}>
                <Route index element={<Tickers />} />
                <Route path='create-ticker' element={<NewTicker />} />
                <Route path='docs' element={<Docs />} />
                <Route path='updates' element={<Updates />} />
                {/** Place dynamic routes always at the end **/}
                <Route path=':id' element={<Ticker />} />
                <Route path='edit/:id' element={<EditTicker />} />
              </Route>
            </Routes>
          </TickersProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
