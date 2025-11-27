import { Lock, Mail, Save, TrendingUp, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/useAuth'
import type { Article } from '../../types'
import api from '../../utils/api'

interface UserStats {
  totalArticles: number
  approvedArticles: number
  pendingArticles: number
  rejectedArticles: number
}

const Profile = () => {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [stats, setStats] = useState<UserStats | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  useEffect(() => {
    fetchUserData()
    fetchUserStats()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await api.get('/users/profile')
      setName(response.data.name || '')
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const fetchUserStats = async () => {
    try {
      const response = await api.get('/articles/my-articles')
      const articles: Article[] = response.data

      setStats({
        totalArticles: articles.length,
        approvedArticles: articles.filter((a: Article) => a.status === 'APPROVED').length,
        pendingArticles: articles.filter((a: Article) => a.status === 'PENDING').length,
        rejectedArticles: articles.filter((a: Article) => a.status === 'REJECTED').length,
      })
    } catch {
      console.error('Error fetching user stats')
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingProfile(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await api.put('/users/profile', { name })
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch {
      setErrorMessage('Failed to update profile. Please try again.')
      setTimeout(() => setErrorMessage(''), 3000)
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingPassword(true)
    setSuccessMessage('')
    setErrorMessage('')

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match!')
      setIsUpdatingPassword(false)
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long!')
      setIsUpdatingPassword(false)
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }

    try {
      await api.put('/users/password', {
        currentPassword,
        newPassword,
      })
      setSuccessMessage('Password updated successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined
      setErrorMessage(
        errorMessage || 'Failed to update password. Please check your current password.'
      )
      setTimeout(() => setErrorMessage(''), 3000)
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {name || 'User'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 flex items-center mt-2">
                <Mail className="w-4 h-4 mr-2" />
                {user?.sub}
              </p>
              <span
                className={`mt-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  user?.role === 'ADMIN'
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                }`}
              >
                {user?.role}
              </span>
            </div>
          </div>

          {/* Stats Card */}
          {stats && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-gray-700 dark:text-gray-300 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Statistics</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Articles</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats.totalArticles}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Approved</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {stats.approvedArticles}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Pending</span>
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                    {stats.pendingArticles}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Rejected</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {stats.rejectedArticles}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Update Profile Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Update Profile
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.sub || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-400 cursor-not-allowed"
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Email cannot be changed
                </p>
              </div>
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Lock className="w-5 h-5 text-gray-700 dark:text-gray-300 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Change Password
              </h3>
            </div>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter new password (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Lock className="w-4 h-4 mr-2" />
                {isUpdatingPassword ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
