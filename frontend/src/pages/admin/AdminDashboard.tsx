import { Check, Clock, FileText, Users, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Article } from '../../types'
import api from '../../utils/api'

const AdminDashboard = () => {
  const [pendingArticles, setPendingArticles] = useState<Article[]>([])
  const [stats, setStats] = useState({
    totalArticles: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    totalUsers: 150, // Mock data
  })

  // Mock data for charts
  const activityData = [
    { name: 'Mon', articles: 4, views: 240 },
    { name: 'Tue', articles: 3, views: 139 },
    { name: 'Wed', articles: 7, views: 980 },
    { name: 'Thu', articles: 2, views: 390 },
    { name: 'Fri', articles: 6, views: 480 },
    { name: 'Sat', articles: 4, views: 380 },
    { name: 'Sun', articles: 3, views: 430 },
  ]

  const statusData = [
    { name: 'Approved', value: stats.approvedCount, fill: '#10B981' },
    { name: 'Pending', value: stats.pendingCount, fill: '#F59E0B' },
    { name: 'Rejected', value: stats.rejectedCount, fill: '#EF4444' },
  ]

  const fetchPendingArticles = useCallback(async () => {
    try {
      const response = await api.get('/admin/pending-articles')
      setPendingArticles(response.data)

      // Update stats based on pending articles (in a real app, fetch stats from API)
      // Here we just mock update pending count, and assume some other values
      setStats((prev) => ({ ...prev, pendingCount: response.data.length }))
    } catch (error) {
      console.error('Error fetching pending articles:', error)
    }
  }, [])

  const fetchAllStats = useCallback(async () => {
    try {
      const response = await api.get('/admin/articles')
      const articles: Article[] = response.data
      const approved = articles.filter((a) => a.status === 'APPROVED').length
      const rejected = articles.filter((a) => a.status === 'REJECTED').length
      const pending = articles.filter((a) => a.status === 'PENDING').length

      setStats({
        totalArticles: articles.length,
        pendingCount: pending,
        approvedCount: approved,
        rejectedCount: rejected,
        totalUsers: 124, // Mock
      })
    } catch (error) {
      console.error('Error fetching stats', error)
    }
  }, [])

  useEffect(() => {
    fetchPendingArticles()
    fetchAllStats()
  }, [fetchPendingArticles, fetchAllStats])

  const handleApprove = async (id: number) => {
    try {
      await api.put(`/admin/articles/${id}/approve`)
      fetchPendingArticles()
      fetchAllStats()
    } catch (error) {
      console.error('Error approving article:', error)
    }
  }

  const handleReject = async (id: number) => {
    try {
      await api.put(`/admin/articles/${id}/reject`)
      fetchPendingArticles()
      fetchAllStats()
    } catch (error) {
      console.error('Error rejecting article:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalArticles}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.pendingCount}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.approvedCount}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-6 dark:text-white">Weekly Activity</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="articles" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-6 dark:text-white">
            Article Status Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pending Reviews List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white">Pending Reviews</h3>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pendingArticles.map((article) => (
            <li
              key={article.id}
              className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    By {article.author?.name}
                  </p>
                </div>
                <div className="ml-4 flex items-center space-x-3">
                  <button
                    onClick={() => handleApprove(article.id)}
                    className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    title="Approve"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleReject(article.id)}
                    className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    title="Reject"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {pendingArticles.length === 0 && (
            <li className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
              No pending articles to review.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard
