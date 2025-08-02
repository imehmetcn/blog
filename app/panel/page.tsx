'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Calendar, LogOut, Home } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { useToast } from '../../components/ToastContainer'

export default function AdminPanel() {
  const { showSuccess, showError } = useToast()
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
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          const updatedPosts = posts.filter(post => post.id !== id)
          setPosts(updatedPosts)
          showSuccess('Başarılı!', 'Blog yazısı başarıyla silindi')
        } else {
          const errorData = await response.json()
          showError('Hata!', errorData.error || 'Blog yazısı silinemedi!')
        }
      } catch (error) {
        console.error('Silme hatası:', error)
        showError('Bağlantı Hatası', 'Bir hata oluştu!')
      }
    }
  }

  const handleLogout = () => {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      localStorage.removeItem('isAuthenticated')
      // Navbar'ı güncellemek için custom event tetikle
      window.dispatchEvent(new Event('authChange'))
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
            <div className="animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Blog Yönetim Paneli
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center shadow-lg hover:shadow-xl"
              >
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Link>
              <Link
                href="/panel/new"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Yazı
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600/20 backdrop-blur-md text-red-300 px-4 py-2 rounded-xl font-medium hover:bg-red-600/30 transition-all duration-300 border border-red-500/30 flex items-center shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-2 text-white">Yükleniyor...</span>
          </div>
        ) : (
          <>
            {/* Welcome Message */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 text-white p-6 mb-8 animate-fade-in-up card-hover">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Hoş Geldin Elif Hanım (:
              </h2>
              <p className="text-gray-300">Buradan yazılarınızı oluşturabilir düzenleyebilir ve yönetebilirsiniz</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300 card-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Toplam Yazı</h3>
                    <p className="text-3xl font-bold text-blue-400">{posts.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Edit className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300 card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Yayında</h3>
                    <p className="text-3xl font-bold text-green-400">
                      {posts.filter(p => p.status === 'published').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300 card-hover animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Taslak</h3>
                    <p className="text-3xl font-bold text-yellow-400">
                      {posts.filter(p => p.status === 'draft').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium ${filter === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                >
                  Tümü ({posts.length})
                </button>
                <button
                  onClick={() => setFilter('published')}
                  className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium ${filter === 'published'
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                >
                  Yayında ({posts.filter(p => p.status === 'published').length})
                </button>
                <button
                  onClick={() => setFilter('draft')}
                  className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium ${filter === 'draft'
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                >
                  Taslak ({posts.filter(p => p.status === 'draft').length})
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/10 border-b border-white/20">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-white">Başlık</th>
                      <th className="text-left py-4 px-6 font-semibold text-white">Durum</th>
                      <th className="text-left py-4 px-6 font-semibold text-white">Tarih</th>
                      <th className="text-right py-4 px-6 font-semibold text-white">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post, index) => (
                      <tr key={post.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <h4 className="font-semibold text-white mb-1">{post.title}</h4>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.status === 'published'
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            }`}>
                            {post.status === 'published' ? 'Yayında' : 'Taslak'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-sm text-gray-300">
                            <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                            {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-end space-x-2">
                            {post.status === 'published' && (
                              <Link
                                href={`/blog/${post.slug}`}
                                className="p-2 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-500/20"
                                title="Görüntüle"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            )}
                            <Link
                              href={`/panel/edit/${post.id}`}
                              className="p-2 text-gray-300 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/20"
                              title="Düzenle"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-gray-300 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/20"
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
              <div className="text-center py-12 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Henüz yazı bulunmuyor</h3>
                  <p className="text-gray-300 mb-6">İlk blog yazınızı oluşturarak başlayın.</p>
                  <Link
                    href="/panel/new"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
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