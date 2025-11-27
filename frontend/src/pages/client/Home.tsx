import { useEffect, useState } from 'react'
import AboutMe from '../../components/home/AboutMe'
import Categories from '../../components/home/Categories'
import FeaturedPosts from '../../components/home/FeaturedPosts'
import HeroSection from '../../components/home/HeroSection'
import LatestPosts from '../../components/home/LatestPosts'
import Newsletter from '../../components/home/Newsletter'
import ProgrammingSeries from '../../components/home/ProgrammingSeries'
import type { Article } from '../../types'
import api from '../../utils/api'

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles/public')
        setArticles(response.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      <FeaturedPosts articles={articles} />
      <LatestPosts articles={articles} />
      <ProgrammingSeries />
      <Categories />
      <AboutMe />
      <Newsletter />
    </div>
  )
}

export default Home
