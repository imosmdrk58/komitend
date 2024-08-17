import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const RootLayout = () => {
  return (
    <div className='min-h-screen antialiased scroll-smooth font-titillium bg-[#ffffff] dark:bg-[#2f303e] text-[#444444] dark:text-[#9ca9b9]'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default RootLayout