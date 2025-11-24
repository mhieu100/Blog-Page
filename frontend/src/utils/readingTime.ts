export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200
  // Strip HTML tags to count words correctly
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wordsPerMinute)
  return time
}
