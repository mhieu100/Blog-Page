import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import type { Article } from '../types';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import DOMPurify from 'dompurify';
import { calculateReadingTime } from '../utils/readingTime';

const ArticleDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles/public/${id}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Article not found</div>
            </div>
        );
    }

    const readingTime = calculateReadingTime(article.content);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
            </button>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                {article.imageUrl && (
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-96 object-cover"
                    />
                )}
                
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {article.title}
                    </h1>

                    <div className="flex items-center space-x-6 text-gray-600 mb-8 pb-6 border-b">
                        <div className="flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            <span>{article.author?.name || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span>{new Date(article.createdAt).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-2" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>

                    <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(article.content)
                        }}
                    />
                </div>
            </article>
        </div>
    );
};

export default ArticleDetail;
