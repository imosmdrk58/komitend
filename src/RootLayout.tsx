import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const RootLayout = () => {
  return (
    <div className='min-h-screen antialiased scroll-smooth font-titillium bg-[#ffffff] dark:bg-[#3b3c4c]'>
        <Header />
        <Outlet />
        <footer>Footer</footer>
    </div>
  )
}

export default RootLayout