//react-router-dom
import { Outlet } from 'react-router-dom'

//components
import { Navbar } from '../components'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div >
      <Navbar/>
      <main className='align-element'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout
