import {
  BarChart3,
  ChevronDown,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  Users,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useDarkMode } from '../context/useDarkMode'

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/articles', label: 'Articles', icon: FileText },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        // biome-ignore lint/a11y/useSemanticElements: Overlay needs to be a div for styling purposes
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMobileSidebarOpen(false)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out 
          ${isMobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <div
              className={`flex items-center space-x-2 transition-opacity duration-300 ${isSidebarCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'}`}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
                Admin
              </span>
            </div>
            {/* Logo for collapsed state */}
            <div
              className={`hidden lg:flex w-full justify-center transition-opacity duration-300 ${!isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative
                  ${
                    isActive(item.path)
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <item.icon
                  className={`w-6 h-6 flex-shrink-0 ${isSidebarCollapsed ? 'mx-auto' : 'mr-3'}`}
                />
                <span
                  className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:hidden' : 'opacity-100'}`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="hidden lg:group-hover:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Link
              to="/"
              className="flex items-center px-3 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg transition-colors group relative"
              title={isSidebarCollapsed ? 'Back to Home' : ''}
            >
              <Home
                className={`w-6 h-6 flex-shrink-0 ${isSidebarCollapsed ? 'mx-auto' : 'mr-3'}`}
              />
              <span
                className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:hidden' : 'opacity-100'}`}
              >
                Back to Home
              </span>
              {isSidebarCollapsed && (
                <div className="hidden lg:group-hover:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-50">
                  Back to Home
                </div>
              )}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-30 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300">
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsSidebarCollapsed(!isSidebarCollapsed)
                // Only toggle mobile menu if we are on mobile (handled by CSS media queries mostly, but logic here helps)
                if (window.innerWidth < 1024) {
                  setIsMobileSidebarOpen(!isMobileSidebarOpen)
                }
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  {user?.sub?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="hidden md:block font-medium">{user?.sub || 'Admin'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user?.sub}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Your Profile
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsProfileDropdownOpen(false)
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
