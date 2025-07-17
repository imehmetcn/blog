'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'

// Mock data - gerçek uygulamada database'den gelecek
const mockPosts = [
  {
    id: 1,
    title: "Blog Sitemize Hoş Geldiniz",
    excerpt: "Yeni blog sitemizde sizlerle düşüncelerimi, deneyimlerimi ve ilginç konuları paylaşacağım.",
    status: "published",
    createdAt: new Date('2024-01-15'),
    slug: "blog-sitemize-hos-geldiniz"
  },
  {
    id: 2,
    title: "Teknoloji ve Yaşam",
    excerpt: "Modern teknolojinin günlük yaşamımıza etkilerini ve bu değişime nasıl adapte olabileceğimizi konuşuyoruz.",
    status: "published",
    createdAt: new Date('2024-01-10'),
    slug: "teknoloji-ve-yasam"
  },
  {
    id: 3,
    title: "Taslak Yazı",
    excerpt: "Bu yazı henüz tamamlanmadı...",
    status: "draft",
    createdAt: new Date('2024-01-05'),
    slug: "taslak-yazi"
  }
]

export default function Dashboard() {
  const [posts, setPosts] = useState(mockPosts)
  const [filter, setFilter] = useState('all')

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true
    return post.status === filter
  })

  const handleDelete = (id: number) => {
    if (confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      setPosts(posts.filter(post => post.id !== id))
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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Blog yazılarınızı yönetin</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="btn-secondary">
                Siteyi Görüntüle
              </Link>
              <Link href="/dashboard/new" className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Yazı
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Toplam Yazı</h3>
            <p className="text-3xl font-bold text-primary-600">{posts.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Yayında</h3>
            <p className="text-3xl font-bold text-green-600">
              {posts.filter(p => p.status === 'published').length}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Taslak</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {posts.filter(p => p.status === 'draft').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü ({posts.length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'published' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yayında ({posts.filter(p => p.status === 'published').length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'draft' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Taslak ({posts.filter(p => p.status === 'draft').length})
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                  <tr key={post.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <h4 className="font-medium text-gray-900">{post.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end space-x-2">
                        {post.status === 'published' && (
                          <Link
                            href={`/blog/${post.slug}`}
                            className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                            title="Görüntüle"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/dashboard/edit/${post.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
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

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Henüz yazı bulunmuyor.</p>
            <Link href="/dashboard/new" className="btn-primary">
              İlk Yazınızı Oluşturun
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}