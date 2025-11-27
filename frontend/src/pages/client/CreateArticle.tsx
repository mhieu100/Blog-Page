import DOMPurify from 'dompurify'
import { Calendar, Clock, Eye, FileEdit, User } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import api from '../../utils/api'
import { calculateReadingTime } from '../../utils/readingTime'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

const CreateArticle = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [showPreview, setShowPreview] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return // Prevent duplicate submissions

    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (tags.length > 0) {
      formData.append('tags', JSON.stringify(tags))
    }
    if (image) {
      formData.append('image', image)
    }

    try {
      await api.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate('/')
    } catch (error) {
      console.error('Error creating article:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Create New Article</h1>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {showPreview ? (
            <>
              <FileEdit className="w-5 h-5" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-5 h-5" />
              Preview
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className={showPreview ? 'hidden lg:block' : ''}>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <div className="h-64 mb-12">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  className="h-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                dark:file:bg-blue-900 dark:file:text-blue-300
                                hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tags
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const t = tagInput.trim()
                      if (t && !tags.includes(t)) {
                        setTags((s) => [...s, t])
                      }
                      setTagInput('')
                    }
                  }}
                  placeholder="Add tag and press Enter"
                  className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    const t = tagInput.trim()
                    if (t && !tags.includes(t)) setTags((s) => [...s, t])
                    setTagInput('')
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-gray-800 px-2 py-1 rounded-full inline-flex items-center gap-2"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => setTags((s) => s.filter((x) => x !== tag))}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </button>
          </form>
        </div>

        {/* Preview Panel */}
        <div className={!showPreview ? 'hidden lg:block' : ''}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden sticky top-8">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b dark:border-gray-600">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview
              </h2>
            </div>

            <div className="p-6">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              {title ? (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
              ) : (
                <h1 className="text-3xl font-bold text-gray-400 dark:text-gray-500 mb-4 italic">
                  Your Title Here
                </h1>
              )}

              {/* Tags preview */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-gray-800 px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b dark:border-gray-700">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>You</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>
                    {new Date().toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{content ? calculateReadingTime(content) : 0} min read</span>
                </div>
              </div>

              {content ? (
                <div
                  className="ql-editor prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content),
                  }}
                />
              ) : (
                <p className="text-gray-400 dark:text-gray-500 italic">
                  Start writing to see your content preview...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateArticle
