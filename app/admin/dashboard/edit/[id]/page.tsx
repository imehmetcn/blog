'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Home, Trash2 } from 'lucide-react'

// Mock data - gerçek uygulamada API'den gelecek
const mockPost = {
  id: 1,
  title: "Blog Sitemize Hoş Geldiniz",
  excerpt: "Yeni blog sitemizde sizlerle düşüncelerimi, deneyimlerimi ve ilginç konuları paylaşacağım.",
  content: "Bu ilk yazımda blog sitemizin amacından ve gelecek planlarımdan bahsetmek istiyorum...",
  status: "published",
  createdAt: new Date('2024-01-15'),
  slug: "blog-sitemize-hos-geldiniz"
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    // Gerçek uygulamada API'den post verisi çekilecek
    setFormData({
      title: mockPost.title,
      excerpt: mockPost.excerpt,
      content: mockPost.content,
      status: mockPost.status
    })
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Burada API'ye güncelleme gönderilecek
    console.log('Güncellenen yazı:', formData)
    
    // Simüle edilmiş güncelleme
    setTimeout(() => {
      setIsLoading(false)
      alert('Yazı başarıyla güncellendi!')
      // Dashboard'a yönlendir
      window.location.href = '/admin/dashboard'
    }, 1000)
  }

  const handleDelete = async () => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return
    }

    setIsDeleting(true)
    
    // Burada API'ye silme isteği gönderilecek
    setTimeout(() => {
      setIsDeleting(false)
      alert('Yazı başarıyla silindi!')
      window.location.href = '/admin/dashboard'
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard" 
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Yazıyı Düzenle</h1>
                <p className="text-gray-600 mt-1">Blog yazınızı güncelleyin</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="btn-secondary flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn-secondary flex items-center text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                    Siliniyor...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Sil
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Başlık
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Yazınızın başlığını girin..."
              required
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Özet
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Yazınızın kısa bir özetini girin..."
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              İçerik
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Yazınızın içeriğini buraya yazın... (Markdown desteklenir)"
              required
            />
          </div>

          {/* Status and Actions */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="draft">Taslak</option>
                  <option value="published">Yayınla</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <Link 
                  href="/admin/dashboard" 
                  className="btn-secondary"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Güncelleniyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Güncelle
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Preview Section */}
        {formData.title && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary-600" />
              Önizleme
            </h3>
            <div className="prose prose-lg max-w-none">
              <h1>{formData.title}</h1>
              {formData.excerpt && <p className="text-gray-600 italic">{formData.excerpt}</p>}
              {formData.content && (
                <div className="mt-4">
                  {formData.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}