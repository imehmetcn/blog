'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Calendar, LogOut, Home } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'

export default function AdminPanel() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setMounted(true)
    
    // Authentication kontrolü
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus !== 'true') {
      window.location.href = '/login'
      return
    }
    setIsAuthenticated(true)

    // API'den blog postlarını yükle
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (response.ok) {
          const postsData = await response.json()
          const parsedPosts = postsData.map((post: any) => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
          setPosts(parsedPosts)
        } else {
          console.error('Posts yüklenemedi')
        }
      } catch (error) {
        console.error('API hatası:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true
    return post.status === filter
  })

  const handleDelete = async (id: number) => {
    if (confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      try {
        const postToDelete = posts.find(post => post.id === id)
        if (!postToDelete) return

        const response = await fetch(`/api/posts/${postToDelete.slug}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          const updatedPosts = posts.filter(post => post.id !== id)
          setPosts(updatedPosts)
          alert('Blog yazısı başarıyla silindi!')
        } else {
          alert('Blog yazısı silinemedi!')
        }
      } catch (error) {
        console.error('Silme hatası:', error)
        alert('Bir hata oluştu!')
      }
    }
  }

  const handleLogout = () => {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      localStorage.removeItem('isAuthenticated')
      window.location.href = '/login'
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800'
    }
    
    const labels = {
      published: 'Yayında',
      draft: 'Taslak'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Blog Yönetim Paneli</h1>
              <p className="text-gray-600 mt-1">Blog yazılarınızı yönetin</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="btn-secondary flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Link>
              <Link href="/panel/new" className="btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Yazı
              </Link>
              <button onClick={handleLogout} className="btn-secondary flex items-center text-red-600 hover:text-red-700">
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-2 text-gray-600">Yükleniyor...</span>
          </div>
        ) : (
          <>
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl text-white p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2">Hoş Geldiniz! 👋</h2>
              <p className="opacity-90">Blog yönetim panelinize hoş geldiniz. Buradan yazılarınızı oluşturabilir, düzenleyebilir ve yönetebilirsiniz.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg card-hover border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Toplam Yazı</h3>
                    <p className="text-3xl font-bold text-primary-600">{posts.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Edit className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg card-hover border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Yayında</h3>
                    <p className="text-3xl font-bold text-green-600">
                      {posts.filter(p => p.status === 'published').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg card-hover border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Taslak</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                      {posts.filter(p => p.status === 'draft').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                    filter === 'all' 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tümü ({posts.length})
                </button>
                <button
                  onClick={() => setFilter('published')}
                  className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                    filter === 'published' 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yayında ({posts.filter(p => p.status === 'published').length})
                </button>
                <button
                  onClick={() => setFilter('draft')}
                  className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                    filter === 'draft' 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Taslak ({posts.filter(p => p.status === 'draft').length})
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Başlık</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Durum</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Tarih</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-900">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-1">{post.excerpt}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {getStatusBadge(post.status)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                            {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-end space-x-2">
                            {post.status === 'published' && (
                              <Link
                                href={`/blog/${post.slug}`}
                                className="p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                                title="Görüntüle"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            )}
                            <Link
                              href={`/panel/edit/${post.id}`}
                              className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                              title="Düzenle"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {!loading && filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz yazı bulunmuyor</h3>
                  <p className="text-gray-600 mb-6">İlk blog yazınızı oluşturarak başlayın.</p>
                  <Link href="/panel/new" className="btn-primary">
                    İlk Yazınızı Oluşturun
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}