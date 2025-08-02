'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Home } from 'lucide-react'
import { useToast } from '../../../components/ToastContainer'

export default function NewPostPage() {
  const { showSuccess, showError } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [formData, setFormData] = useState({
    title: '',
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
        showSuccess('Başarılı!', 'Yazı başarıyla kaydedildi')
        setTimeout(() => {
          window.location.href = '/panel'
        }, 1500)
      } else {
        const error = await response.json()
        showError('Hata!', 'Yazı kaydedilemedi: ' + (error.error || 'Bilinmeyen hata'))
      }
    } catch (error) {
      console.error('API hatası:', error)
      showError('Bağlantı Hatası', 'Bir hata oluştu! Lütfen tekrar deneyin.')
    }
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }



  // Metin ekleme fonksiyonu
  const insertText = (before: string, after: string) => {
    console.log('insertText çağrıldı:', { before, after })
    const textarea = textareaRef.current
    if (!textarea) {
      console.log('Textarea bulunamadı!')
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    const newText = before + selectedText + after
    
    console.log('Metin işleme:', { start, end, selectedText, newText })
    
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
                  onClick={(e) => {
                    e.preventDefault()
                    insertText('**', '**')
                  }}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                  title="Kalın metin"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    insertText('*', '*')
                  }}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm italic"
                  title="İtalik metin"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    insertText('\n## ', '')
                  }}
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
          <div className="mt-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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