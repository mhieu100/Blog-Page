import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import GuestRoute from './components/GuestRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import { DarkModeProvider } from './context/DarkModeContext'
import AdminLayout from './layouts/AdminLayout'
import MainLayout from './layouts/MainLayout'
import AdminArticleList from './pages/admin/AdminArticleList'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUserList from './pages/admin/AdminUserList'
import Login from './pages/auth/Login'
import OAuth2RedirectHandler from './pages/auth/OAuth2RedirectHandler'
import Register from './pages/auth/Register'
import ArticleDetail from './pages/client/ArticleDetail'
import CreateArticle from './pages/client/CreateArticle'
import CV from './pages/client/CV'
import Home from './pages/client/Home'
import MyArticles from './pages/client/MyArticles'
import Profile from './pages/client/Profile'

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes */}
            <Route element={<ProtectedRoute requireAdmin />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/articles" element={<AdminArticleList />} />
                <Route path="/admin/users" element={<AdminUserList />} />
              </Route>
            </Route>

            {/* Main Routes (Public & User) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/cv" element={<CV />} />

              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/create-article" element={<CreateArticle />} />
                <Route path="/my-articles" element={<MyArticles />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </DarkModeProvider>
  )
}

export default App
