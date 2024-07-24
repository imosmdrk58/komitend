import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='min-h-screen antialiased scroll-smooth'>
        <header className='text-cprimary'>Header</header>
        <Outlet />
        <footer>Footer</footer>
    </div>
  )
}

export default RootLayout