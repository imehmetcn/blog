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
    contentImages: [] as string[]
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Authentication kontrolü
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus !== 'true') {
      window.location.href = '/login'
      return
    }
    setIsAuthenticated(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // API'ye gönderilecek veri
    const postData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: 'Genel',
      tags: [],
      readTime: formData.readTime,
      contentImages: formData.contentImages,
      status: formData.status
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        const newPost = await response.json()
        console.log('Yeni yazı kaydedildi:', newPost)
        alert('Yazı başarıyla kaydedildi!')
        window.location.href = '/panel'
      } else {
        const error = await response.json()
        alert('Yazı kaydedilemedi: ' + (error.error || 'Bilinmeyen hata'))
      }
    } catch (error) {
      console.error('API hatası:', error)
      alert('Bir hata oluştu! Lütfen tekrar deneyin.')
    }
    setIsLoading(false)
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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Yükleniyor...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Yönlendiriliyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-indigo-900/50 animate-gradient-shift-reverse"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 hidden sm:block">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-50 animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-300 rounded-full opacity-30 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-indigo-300 rounded-full opacity-40 animate-float-delayed"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center space-x-4 animate-fade-in-up">
              <Link 
                href="/panel" 
                className="p-2 text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Yeni Yazı
                </h1>
                <p className="text-gray-300 mt-1">Yeni bir blog yazısı oluşturun</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/" 
                className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center shadow-lg hover:shadow-xl"
              >
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up">
            <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
              Başlık
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Yazınızın başlığını girin..."
              required
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="excerpt" className="block text-sm font-medium text-white mb-2">
              Özet
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Yazınızın kısa bir özetini girin..."
              required
            />
          </div>

          {/* Content Images */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-medium text-white mb-2">
              İçerik Resimleri
            </label>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="content-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/30 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 mb-4 text-gray-300" />
                    <p className="mb-2 text-sm text-gray-300">
                      <span className="font-semibold">İçerik resmi eklemek için tıklayın</span>
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG veya JPEG (MAX. 5MB)</p>
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
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`İçerik resmi ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl border border-white/20"
                      />
                      <button
                        type="button"
                        onClick={() => removeContentImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
              İçerik
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Yazınızın içeriğini buraya yazın... (Markdown desteklenir)"
              required
            />
          </div>

          {/* Status and Actions */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
                  Durum
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="draft" className="bg-gray-800 text-white">Taslak</option>
                  <option value="published" className="bg-gray-800 text-white">Yayınla</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <Link 
                  href="/panel" 
                  className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
          <div className="mt-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-400" />
              Önizleme
            </h3>
            <div className="prose-custom">
              <h1 className="text-white text-2xl font-bold mb-4">{formData.title}</h1>
              {formData.excerpt && <p className="text-gray-300 italic mb-4">{formData.excerpt}</p>}
              {formData.content && (
                <div className="mt-4">
                  {formData.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-200">{paragraph}</p>
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