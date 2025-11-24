import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import type { Article } from '../types';
import SearchBar from '../components/SearchBar';
import { HighlightedText } from '../utils/highlight';
import { calculateReadingTime } from '../utils/readingTime';
import { Clock, User, Calendar } from 'lucide-react';

const Home = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchArticles = async (query: string = '') => {
        setLoading(true);
        try {
            const endpoint = query 
                ? `/articles/public/search?query=${encodeURIComponent(query)}`
                : '/articles/public';
            const response = await api.get(endpoint);
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        fetchArticles(query);
    };

    const getExcerpt = (html: string) => {
        const text = html.replace(/<[^>]*>/g, '');
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Latest Articles</h1>
            
            <SearchBar onSearch={handleSearch} />

            {loading ? (
                <div className="text-center py-12">
                    <div className="text-xl text-gray-600">Loading articles...</div>
                </div>
            ) : articles.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-xl text-gray-600">No articles found.</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <Link 
                            key={article.id} 
                            to={`/article/${article.id}`}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            {article.imageUrl && (
                                <img 
                                    src={article.imageUrl} 
                                    alt={article.title} 
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6 flex-1 flex flex-col">
                                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                                    <HighlightedText text={article.title} query={searchQuery} />
                                </h2>
                                <p className="text-gray-600 mb-4 flex-1">
                                    <HighlightedText text={getExcerpt(article.content)} query={searchQuery} />
                                </p>
                                <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-4 border-t">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-1" />
                                        <span>{article.author?.name || 'Unknown'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{calculateReadingTime(article.content)} min</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-400 mt-2">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
