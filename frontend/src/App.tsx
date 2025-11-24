import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArticle from './pages/CreateArticle';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MyArticles from './pages/MyArticles';
import AdminArticleList from './pages/AdminArticleList';
import ArticleDetail from './pages/ArticleDetail';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
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
  );
}

export default App;
