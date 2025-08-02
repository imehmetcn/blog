'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye, Home, Trash2 } from 'lucide-react'
import { useToast } from '../../../../components/ToastContainer'

export default function EditPostPage() {
  const { showSuccess, showError } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    author: 'BiomysticY',
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



  // Metin ekleme fonksiyonu
  const insertText = (before: string, after: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    const newText = before + selectedText + after
    
    const newContent = 
      formData.content.substring(0, start) + 
      newText + 
      formData.content.substring(end)
    
    setFormData({ ...formData, content: newContent })
    
    // İmleci doğru yere yerleştir
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  // Hızlı resim yükleme
  const handleQuickImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 50 * 1024 * 1024) {
      showError('Dosya Çok Büyük', 'Dosya boyutu 50MB\'dan büyük olamaz!')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      
      if (result.length > 70 * 1024 * 1024) {
        showError('Resim Çok Büyük', 'Lütfen daha küçük bir resim seçin.')
        return
      }

      const textarea = textareaRef.current
      if (!textarea) return

      const cursorPos = textarea.selectionStart
      const imageIndex = formData.contentImages.length + 1
      const imageText = `\n\n[RESIM-${imageIndex}]\n\n`
      
      const newContent = 
        formData.content.substring(0, cursorPos) + 
        imageText + 
        formData.content.substring(cursorPos)
      
      setFormData({
        ...formData,
        content: newContent,
        contentImages: [...formData.contentImages, result]
      })

      // İmleci resimden sonraya yerleştir
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(cursorPos + imageText.length, cursorPos + imageText.length)
      }, 0)
    }
    reader.readAsDataURL(file)
    
    // Input'u temizle
    e.target.value = ''
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





          {/* Content */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
              İçerik
            </label>
            
            {/* Basit Araç Çubuğu */}
            <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => insertText('**', '**')}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                  title="Kalın metin"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => insertText('*', '*')}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm italic"
                  title="İtalik metin"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertText('\n## ', '')}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                  title="Başlık"
                >
                  H
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQuickImageUpload}
                  className="hidden"
                  id="quick-image-upload"
                />
                <label
                  htmlFor="quick-image-upload"
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm cursor-pointer flex items-center"
                  title="Resim ekle"
                >
                  📷 Resim
                </label>
              </div>
              <div className="text-xs text-gray-400">
                💡 <strong>İpucu:</strong> Resim yüklendiğinde <code className="bg-white/10 px-1 rounded">[RESIM-1]</code> şeklinde kısa bir kod eklenir. Bu kodu istediğiniz yere taşıyabilirsiniz.
              </div>
            </div>

            <textarea
              ref={textareaRef}
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Yazınızı buraya yazın...&#10;&#10;Araç çubuğundaki butonları kullanarak metin formatı ekleyebilir ve resim yükleyebilirsiniz."
              required
            />
          </div>

          {/* Status and Actions */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
          <div className="mt-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-400" />
              Önizleme
            </h3>
            <div className="prose-custom">
              <h1 className="text-white text-2xl font-bold mb-4">{formData.title}</h1>
              {formData.content && (
                <div className="mt-4">
                  {(() => {
                    let previewContent = formData.content
                    
                    // [RESIM-X] placeholder'larını gerçek resimlerle değiştir
                    if (formData.contentImages && formData.contentImages.length > 0) {
                      formData.contentImages.forEach((image, index) => {
                        const placeholder = `[RESIM-${index + 1}]`
                        const imageHtml = `<img src="${image}" alt="Resim ${index + 1}" class="max-w-full h-auto rounded-lg border border-white/20 my-4" />`
                        previewContent = previewContent.replace(new RegExp(placeholder.replace(/[[\]]/g, '\\$&'), 'g'), imageHtml)
                      })
                    }
                    
                    return (
                      <div 
                        className="text-gray-200"
                        dangerouslySetInnerHTML={{
                          __html: previewContent
                            .split('\n')
                            .map(line => {
                              // Markdown formatını basit HTML'e çevir
                              let formattedLine = line
                              
                              // Başlıklar
                              if (line.startsWith('## ')) {
                                formattedLine = `<h2 class="text-xl font-bold text-white mt-6 mb-3">${line.substring(3)}</h2>`
                              } else if (line.startsWith('# ')) {
                                formattedLine = `<h1 class="text-2xl font-bold text-white mt-6 mb-4">${line.substring(2)}</h1>`
                              }
                              // Kalın metin
                              else if (line.includes('**')) {
                                formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
                              }
                              // İtalik metin
                              else if (line.includes('*')) {
                                formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                              }
                              
                              // Boş satırlar için br, diğerleri için p
                              if (formattedLine.trim() === '') {
                                return '<br />'
                              } else if (!formattedLine.startsWith('<h') && !formattedLine.startsWith('<img')) {
                                return `<p class="mb-4">${formattedLine}</p>`
                              }
                              
                              return formattedLine
                            })
                            .join('')
                        }}
                      />
                    )
                  })()}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}