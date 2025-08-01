'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye, Home, X, Image as ImageIcon, Trash2 } from 'lucide-react'
import { useToast } from '../../../../components/ToastContainer'

export default function EditPostPage() {
  const { showSuccess, showError } = useToast()
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    author: 'BiomysticY',
    readTime: '5 dk',
    contentImages: [] as string[]
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [postFound, setPostFound] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Authentication kontrolü
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus !== 'true') {
      router.push('/login')
      return
    }
    setIsAuthenticated(true)

    // Post verilerini yükle
    loadPost()
  }, [postId, router])

  const loadPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`)
      if (response.ok) {
        const post = await response.json()
        setFormData({
          title: post.title,
          content: post.content,
          status: post.status || 'draft',
          author: post.author || 'BiomysticY',
          readTime: post.readTime || '5 dk',
          contentImages: post.contentImages || []
        })
        setPostFound(true)
      } else {
        console.error('Post bulunamadı')
        setPostFound(false)
      }
    } catch (error) {
      console.error('Post yükleme hatası:', error)
      setPostFound(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        showSuccess('Başarılı!', 'Yazı başarıyla güncellendi')
        setTimeout(() => {
          router.push('/panel')
        }, 1500)
      } else {
        const error = await response.json()
        showError('Hata!', 'Yazı güncellenemedi: ' + (error.error || 'Bilinmeyen hata'))
      }
    } catch (error) {
      console.error('API hatası:', error)
      showError('Bağlantı Hatası', 'Bir hata oluştu! Lütfen tekrar deneyin.')
    }
    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        showSuccess('Başarılı!', 'Yazı başarıyla silindi')
        setTimeout(() => {
          router.push('/panel')
        }, 1500)
      } else {
        showError('Hata!', 'Yazı silinemedi!')
      }
    } catch (error) {
      console.error('Silme hatası:', error)
      showError('Bağlantı Hatası', 'Bir hata oluştu!')
    }
    setIsDeleting(false)
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
        showError('Dosya Çok Büyük', 'Dosya boyutu 5MB\'dan büyük olamaz!')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        
        // Base64 boyutu kontrolü (yaklaşık 1.5MB sınırı)
        if (result.length > 2 * 1024 * 1024) {
          showError('Resim Çok Büyük', 'Lütfen daha küçük bir resim seçin.')
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

  if (!postFound) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-shift"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Yazı Bulunamadı</h1>
            <p className="text-gray-300 mb-8">Aradığınız yazı bulunamadı veya silinmiş olabilir.</p>
            <Link 
              href="/panel" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Panele Dön
            </Link>
          </div>
        </div>
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
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10 pt-20">
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
                  Yazıyı Düzenle
                </h1>
                <p className="text-gray-300 mt-1">Blog yazısını güncelleyin</p>
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
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600/20 backdrop-blur-md text-red-300 px-4 py-2 rounded-xl font-medium hover:bg-red-600/30 transition-all duration-300 border border-red-500/30 flex items-center shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-300 mr-2"></div>
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



          {/* Content Images */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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
          <div className="mt-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-400" />
              Önizleme
            </h3>
            <div className="prose-custom">
              <h1 className="text-white text-2xl font-bold mb-4">{formData.title}</h1>
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