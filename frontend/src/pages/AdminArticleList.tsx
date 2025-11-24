import { useEffect, useState, useCallback } from 'react';
import api from '../utils/api';
import type { Article } from '../types';
import { Trash2, Check, X } from 'lucide-react';

const AdminArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    const fetchArticles = useCallback(async () => {
        try {
            const response = await api.get('/admin/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await api.delete(`/articles/${id}`);
                fetchArticles();
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    const handleApprove = async (id: number) => {
        try {
            await api.put(`/admin/articles/${id}/approve`);
            fetchArticles();
        } catch (error) {
            console.error('Error approving article:', error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            await api.put(`/admin/articles/${id}/reject`);
            fetchArticles();
        } catch (error) {
            console.error('Error rejecting article:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'text-green-600 bg-green-100';
            case 'REJECTED': return 'text-red-600 bg-red-100';
            default: return 'text-yellow-600 bg-yellow-100';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Manage All Articles</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {articles.map((article) => (
                        <li key={article.id} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(article.status)}`}>
                                            {article.status}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        By {article.author?.name} ({article.author?.email})
                                    </p>
                                    <p className="mt-2 text-gray-600 line-clamp-2">{article.content}</p>
                                </div>
                                <div className="ml-4 flex items-center space-x-2">
                                    {article.status === 'PENDING' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(article.id)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                                                title="Approve"
                                            >
                                                <Check className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleReject(article.id)}
                                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                                                title="Reject"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                    {articles.length === 0 && (
                        <li className="px-6 py-4 text-center text-gray-500">
                            No articles found.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminArticleList;
