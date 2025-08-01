'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Home, X, Image as ImageIcon } from 'lucide-react'

export default function NewPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft',
    author: 'BiomysticY',
    readTime: '5 dk',
    contentImages: [] as string[] // İçerik resimleri
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Authentication kontrolü
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus !== 'true') {
      window.location.href = '/login'
      return
    }
    setIsAuthenticated(true)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Yönlendiriliyor...</div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Slug oluştur
    const slug = formData.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    // Blog post objesi oluştur
    const newPost = {
      id: Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      createdAt: new Date(),
      author: formData.author,
      slug: slug,
      category: 'Genel',
      tags: [],
      readTime: formData.readTime,
      contentImages: formData.contentImages
    }

    // localStorage'a kaydet
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    existingPosts.push(newPost)
    
    try {
      localStorage.setItem('blogPosts', JSON.stringify(existingPosts))
      console.log('Yeni yazı kaydedildi:', {
        id: newPost.id,
        title: newPost.title,
        contentImagesCount: newPost.contentImages.length,
        totalSize: JSON.stringify(existingPosts).length
      })
    } catch (error) {
      console.error('localStorage kaydetme hatası:', error)
      alert('Yazı kaydedilemedi! Resimler çok büyük olabilir.')
      setIsLoading(false)
      return
    }
    
    // Simüle edilmiş kaydetme
    setTimeout(() => {
      setIsLoading(false)
      alert('Yazı başarıyla kaydedildi!')
      // Dashboard'a yönlendir
      window.location.href = '/admin/dashboard'
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Resim yükleme fonksiyonu
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dosya boyutu kontrolü (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan büyük olamaz!')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        
        // Base64 boyutu kontrolü (yaklaşık 1.5MB sınırı)
        if (result.length > 2 * 1024 * 1024) {
          alert('Resim çok büyük! Lütfen daha küçük bir resim seçin.')
          return
        }

        console.log(`İçerik resmi yüklendi - Boyut: ${Math.round(result.length / 1024)} KB`)
        
        setFormData({
          ...formData,
          contentImages: [...formData.contentImages, result]
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // İçerik resmini kaldırma
  const removeContentImage = (index: number) => {
    const newImages = formData.contentImages.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      contentImages: newImages
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
                <h1 className="text-3xl font-bold gradient-text">Yeni Yazı</h1>
                <p className="text-gray-600 mt-1">Yeni bir blog yazısı oluşturun</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="btn-secondary flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Link>
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



          {/* Content Images */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İçerik Resimleri
            </label>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="content-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">İçerik resmi eklemek için tıklayın</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG veya JPEG (MAX. 5MB)</p>
                  </div>
                  <input
                    id="content-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              
              {formData.contentImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.contentImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`İçerik resmi ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeContentImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
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