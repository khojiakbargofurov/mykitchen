//rrd
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

//pages
import { Home, Login, Register } from './pages'

//layouts
import MainLayout from './layouts/MainLayout'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { Protectedroutes } from './components'
import { login, isAuthChange } from './app/userSlice'

//actions
import { action as LoginAction } from "./pages/Login"
import { action as RegisterAction } from "./pages/Register"
import {action as HomeAction} from "./pages/Home"
import Create, {action as CreateAction} from "./pages/Create"

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'
import Retsept from './pages/Retsept'
import Error from './pages/Error'
import Charts from './pages/Charts'
import Cart from './pages/Cart'

function App() {
  const dispatch = useDispatch()
  const { user, isAuthState } = useSelector((state) => state.user)

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Protectedroutes user={user}>
        <MainLayout />
      </Protectedroutes>,
      errorElement: <Error/>,
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
        },
        {
          path: "/create",
          element: <Create />,
          action: CreateAction,
        },
        {
          path: "/retsepts/:id",
          element: <Retsept />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/charts",
          element: <Charts />,
        },
      ]
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction
    }
  ])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user))
      dispatch(isAuthChange())
    })
  })

  return <>
    {isAuthState && <RouterProvider router={routes} />}
  </>

}
export default App
