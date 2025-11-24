import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PenSquare, ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { isAuthenticated, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link 
                            to="/" 
                            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
                            onClick={closeMobileMenu}
                        >
                            BlogApp
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to="/create-article" 
                                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <PenSquare className="w-5 h-5 mr-1" />
                                    Write
                                </Link>
                                <Link 
                                    to="/my-articles" 
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    My Articles
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link 
                                            to="/admin" 
                                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            <ShieldCheck className="w-5 h-5 mr-1" />
                                            Review
                                        </Link>
                                        <Link 
                                            to="/admin/articles" 
                                            className="text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            All Articles
                                        </Link>
                                    </>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-red-600 hover:text-red-700 transition-colors"
                                >
                                    <LogOut className="w-5 h-5 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen 
                        ? 'max-h-screen opacity-100' 
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/create-article"
                                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                onClick={closeMobileMenu}
                            >
                                <PenSquare className="w-5 h-5 mr-2" />
                                Write
                            </Link>
                            <Link
                                to="/my-articles"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                onClick={closeMobileMenu}
                            >
                                My Articles
                            </Link>
                            {isAdmin && (
                                <>
                                    <Link
                                        to="/admin"
                                        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        <ShieldCheck className="w-5 h-5 mr-2" />
                                        Review
                                    </Link>
                                    <Link
                                        to="/admin/articles"
                                        className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        All Articles
                                    </Link>
                                </>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="block px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors text-center"
                                onClick={closeMobileMenu}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

