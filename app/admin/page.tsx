'use client'

import { useState, useEffect } from 'react'
import { BlogPost } from '../../lib/blog-data'
import { optimizeImage, validateImageFile } from '../../lib/image-utils'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

export default function AdminPage() {
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

  // Authentication başarılı, /panel'e yönlendir
  window.location.href = '/panel'
  return null

  const savePosts = (newPosts: BlogPost[]) => {
    localStorage.setItem('blogPosts', JSON.stringify(newPosts))
    setPosts(newPosts)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')

    const newPost: BlogPost = {
      id: editingPost ? editingPost.id : Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      createdAt: editingPost ? editingPost.createdAt : new Date(),
      author: "BiomysticY",
      slug: slug,
      category: 'Genel',
      tags: [],
      readTime: Math.ceil(formData.content.split(' ').length / 200) + ' dk',
      contentImages: contentImages.length > 0 ? contentImages : undefined
    }

    // Debug: İçerik resimlerini kontrol et
    console.log('Kaydedilen post:', {
      title: newPost.title,
      contentImages: newPost.contentImages,
      contentImagesCount: contentImages.length
    })

    let updatedPosts
    if (editingPost) {
      updatedPosts = posts.map(post => post.id === editingPost.id ? newPost : post)
    } else {
      updatedPosts = [newPost, ...posts]
    }

    savePosts(updatedPosts)

    // Debug: localStorage'ı kontrol et
    console.log('localStorage güncellendi:', {
      totalPosts: updatedPosts.length,
      lastPost: updatedPosts[0],
      lastPostContentImages: updatedPosts[0]?.contentImages
    })

    resetForm()

    // Diğer sayfaları güncellemeye zorla
    window.dispatchEvent(new Event('storage'))
  }

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', content: '' })
    setContentImages([])
    setIsEditing(false)
    setEditingPost(null)
  }



  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Dosya validasyonu
    const validation = validateImageFile(file, 5)
    if (!validation.isValid) {
      alert(validation.error)
      return
    }

    try {
      // İçerik resimleri için optimize et
      const optimizedBase64 = await optimizeImage(file, 600, 400, 0.7)
      setContentImages([...contentImages, optimizedBase64])
    } catch (error) {
      console.error('İçerik resmi optimizasyonu hatası:', error)
      alert('Resim işlenirken bir hata oluştu. Lütfen tekrar deneyin.')
    }

    // Input'u temizle ki aynı dosya tekrar seçilebilsin
    e.target.value = ''
  }

  const editPost = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content
    })
    setContentImages(post.contentImages || [])
    setEditingPost(post)
    setIsEditing(true)
  }

  const deletePost = (id: number) => {
    if (confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      const updatedPosts = posts.filter(post => post.id !== id)
      savePosts(updatedPosts)

      // Diğer sayfaları güncellemeye zorla
      window.dispatchEvent(new Event('storage'))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 pt-20 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Blog Yönetimi</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Yazı</span>
          </button>
        </div>

        {isEditing && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingPost ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yazı başlığını girin..."
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Özet</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Yazının kısa özetini girin..."
                  required
                />
              </div>





              <div>
                <label className="block text-white font-medium mb-2">İçerik (Markdown destekli)</label>

                {/* Image Upload for Content */}
                <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">İçerik Resmi Ekle</h4>
                    <span className="text-xs text-gray-400">Maksimum 5MB</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleContentImageUpload}
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 file:cursor-pointer text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const markdownHelp = `\n\n<!-- Markdown Resim Formatları -->\n![Alt metin](resim-url)\n![Resim başlığı](resim-url "Başlık")\n\n`
                        setFormData({ ...formData, content: formData.content + markdownHelp })
                      }}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Yardım
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    📸 Resim yükleyin ve blog yazısının içeriğinde görüntülensin.
                    <br />
                    ⚡ Resimler otomatik olarak sıkıştırılır ve boyutları küçültülür (600x400px, %70 kalite).
                    <br />
                    🎯 Desteklenen formatlar: JPG, PNG, WebP, GIF (maksimum 5MB).
                  </p>

                  {/* İçerik Resimleri Önizleme */}
                  {contentImages.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-white font-medium mb-2">İçerik Resimleri ({contentImages.length})</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {contentImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`İçerik resmi ${index + 1}`}
                              className="w-full h-20 object-cover rounded border border-white/20"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = contentImages.filter((_, i) => i !== index)
                                setContentImages(newImages)
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={15}
                  placeholder="# Başlık&#10;&#10;Yazınızın içeriğini buraya yazın...&#10;&#10;## Alt Başlık&#10;&#10;Paragraf metni...&#10;&#10;![Resim açıklaması](resim-url)&#10;&#10;Resim eklemek için yukarıdaki 'İçerik Resmi Ekle' butonunu kullanın."
                  required
                />

                {/* Markdown Preview */}
                {formData.content && (
                  <div className="mt-4">
                    <h4 className="text-white font-medium mb-2">Önizleme:</h4>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <div className="prose-custom text-sm">
                        {formData.content.split('\n').slice(0, 10).map((line, index) => (
                          <div key={index} className="text-gray-300 mb-1">
                            {line.startsWith('#') ? (
                              <span className="text-white font-bold">{line}</span>
                            ) : line.startsWith('![') ? (
                              <span className="text-blue-400">{line}</span>
                            ) : (
                              line
                            )}
                          </div>
                        ))}
                        {formData.content.split('\n').length > 10 && (
                          <div className="text-gray-500 text-xs">... ve {formData.content.split('\n').length - 10} satır daha</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{editingPost ? 'Güncelle' : 'Kaydet'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Mevcut Yazılar ({posts.length})</h2>

            {posts.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Henüz yazı eklenmemiş.</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4 flex-1">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                          <p className="text-gray-300 text-sm mb-2">{post.excerpt}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <span>{post.readTime}</span>
                            <span>{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => editPost(post)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}