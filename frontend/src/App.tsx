import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import GuestRoute from './components/GuestRoute'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { DarkModeProvider } from './context/DarkModeContext'
import AdminArticleList from './pages/AdminArticleList'
import AdminDashboard from './pages/AdminDashboard'
import ArticleDetail from './pages/ArticleDetail'
import CreateArticle from './pages/CreateArticle'
import Home from './pages/Home'
import Login from './pages/Login'
import MyArticles from './pages/MyArticles'
import Profile from './pages/Profile'
import Register from './pages/Register'

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <Navbar />
            {/* Add padding-top to prevent content from being hidden under fixed navbar */}
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/article/:id" element={<ArticleDetail />} />

                <Route element={<GuestRoute />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/create-article" element={<CreateArticle />} />
                  <Route path="/my-articles" element={<MyArticles />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<ProtectedRoute requireAdmin />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/articles" element={<AdminArticleList />} />
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </DarkModeProvider>
  )
}

export default App
