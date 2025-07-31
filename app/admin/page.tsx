'use client'

import { useState, useEffect } from 'react'
import { BlogPost } from '../../lib/blog-data'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    image: '',
    imageUrl: ''
  })

  useEffect(() => {
    // LocalStorage'dan blog yazılarını yükle
    const savedPosts = localStorage.getItem('blogPosts')
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [])

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
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      readTime: Math.ceil(formData.content.split(' ').length / 200) + ' dk',
      image: formData.image || undefined
    }

    let updatedPosts
    if (editingPost) {
      updatedPosts = posts.map(post => post.id === editingPost.id ? newPost : post)
    } else {
      updatedPosts = [newPost, ...posts]
    }

    savePosts(updatedPosts)
    resetForm()
  }

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', content: '', category: '', tags: '', image: '', imageUrl: '' })
    setIsEditing(false)
    setEditingPost(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan büyük olamaz!')
        return
      }

      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        alert('Lütfen sadece resim dosyası seçin!')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target?.result as string
        setFormData({...formData, image: base64String, imageUrl: ''})
      }
      reader.readAsDataURL(file)
    }
  }

  const editPost = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      image: post.image || '',
      imageUrl: post.image?.startsWith('http') ? post.image : ''
    })
    setEditingPost(post)
    setIsEditing(true)
  }

  const deletePost = (id: number) => {
    if (confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      const updatedPosts = posts.filter(post => post.id !== id)
      savePosts(updatedPosts)
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
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yazı başlığını girin..."
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Özet</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Yazının kısa özetini girin..."
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Banner Resmi</label>
                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      JPG, PNG, WebP formatlarında maksimum 5MB boyutunda resim yükleyebilirsiniz.
                    </p>
                  </div>

                  {/* URL Input as Alternative */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Veya resim URL'si girin:</label>
                    <input
                      type="url"
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value, image: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mt-3">
                      <img 
                        src={formData.image} 
                        alt="Önizleme" 
                        className="w-full h-48 object-cover rounded-lg border border-white/20"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, image: '', imageUrl: ''})}
                        className="mt-2 text-red-400 hover:text-red-300 text-sm transition-colors"
                      >
                        Resmi Kaldır
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Kategori</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Teknoloji, Yaşam, vb."
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Etiketler</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="etiket1, etiket2, etiket3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">İçerik (Markdown destekli)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={15}
                  placeholder="# Başlık&#10;&#10;Yazınızın içeriğini buraya yazın...&#10;&#10;## Alt Başlık&#10;&#10;Paragraf metni..."
                  required
                />
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
                        {/* Image Preview */}
                        {post.image && (
                          <div className="flex-shrink-0">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded-lg border border-white/20"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                          <p className="text-gray-300 text-sm mb-2">{post.excerpt}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <span>{post.category}</span>
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