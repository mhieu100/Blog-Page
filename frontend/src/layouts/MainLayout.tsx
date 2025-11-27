import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex flex-col">
      <Navbar />
      {/* Add padding-top to prevent content from being hidden under fixed navbar */}
      <main className="pt-16 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
