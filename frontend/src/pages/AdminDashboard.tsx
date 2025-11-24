import { useEffect, useState, useCallback } from 'react';
import api from '../utils/api';
import type { Article } from '../types';
import { Check, X } from 'lucide-react';

const AdminDashboard = () => {
    const [pendingArticles, setPendingArticles] = useState<Article[]>([]);

    const fetchPendingArticles = useCallback(async () => {
        try {
            const response = await api.get('/admin/pending-articles');
            setPendingArticles(response.data);
        } catch (error) {
            console.error('Error fetching pending articles:', error);
        }
    }, []);

    useEffect(() => {
        fetchPendingArticles();
    }, [fetchPendingArticles]);

    const handleApprove = async (id: number) => {
        try {
            await api.put(`/admin/articles/${id}/approve`);
            fetchPendingArticles();
        } catch (error) {
            console.error('Error approving article:', error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            await api.put(`/admin/articles/${id}/reject`);
            fetchPendingArticles();
        } catch (error) {
            console.error('Error rejecting article:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {pendingArticles.map((article) => (
                        <li key={article.id} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500">By {article.author?.name}</p>
                                    <p className="mt-2 text-gray-600">{article.content.substring(0, 200)}...</p>
                                </div>
                                <div className="ml-4 flex items-center space-x-4">
                                    <button
                                        onClick={() => handleApprove(article.id)}
                                        className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                                        title="Approve"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleReject(article.id)}
                                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                        title="Reject"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                    {pendingArticles.length === 0 && (
                        <li className="px-6 py-4 text-center text-gray-500">
                            No pending articles to review.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
