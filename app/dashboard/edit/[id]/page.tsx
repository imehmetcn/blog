'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

// Mock data - gerçek uygulamada database'den gelecek
const mockPosts = [
  {
    id: 1,
    title: "Blog Sitemize Hoş Geldiniz",
    excerpt: "Yeni blog sitemizde sizlerle düşüncelerimi, deneyimlerimi ve ilginç konuları paylaşacağım.",
    content: `# Blog Sitemize Hoş Geldiniz

Merhaba değerli okuyucular!

Bu yeni blog sitemde sizlerle **düşüncelerimi**, deneyimlerimi ve ilginç bulduğum konuları paylaşacağım.`,
    status: "published",
    createdAt: new Date('2024-01-15'),
    slug: "blog-sitemize-hos-geldiniz"
  },
  {
    id: 2,
    title: "Teknoloji ve Yaşam",
    excerpt: "Modern teknolojinin günlük yaşamımıza etkilerini ve bu değişime nasıl adapte olabileceğimizi konuşuyoruz.",
    content: `# Teknoloji ve Yaşam

Modern teknoloji hayatımızı nasıl etkiliyor? Bu sorunun cevabını aramaya devam ediyoruz.`,
    status: "published",
    createdAt: new Date('2024-01-10'),
    slug: "teknoloji-ve-yasam"
  }
]

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('draft')
  const [isPreview, setIsPreview] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    const post = mockPosts.find(p => p.id === parseInt(params.id))
    
    if (post) {
      setTitle(post.title)
      setExcerpt(post.excerpt)
      setContent(post.content)
      setStatus(post.status)
    }
    
    setLoading(false)
  }, [params.id])

  const handleSave = async (saveStatus: string) => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    console.log('Updating post:', {
      id: params.id,
      title,
      excerpt,
      content,
      status: saveStatus
    })

    // Simulated save
    alert(`Yazı ${saveStatus === 'published' ? 'yayınlandı' : 'taslak olarak kaydedildi'}!`)
    router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yazı yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link 
                href="/dashboard"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 mr-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard'a Dön
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Yazıyı Düzenle</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="btn-secondary"
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? 'Düzenle' : 'Önizle'}
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                className="btn-secondary"
              >
                <Save className="w-4 h-4 mr-2" />
                Taslak Kaydet
              </button>
              
              <button
                onClick={() => handleSave('published')}
                className="btn-primary"
                disabled={!title || !content}
              >
                Yayınla
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!isPreview ? (
          /* Editor Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Başlık *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Yazınızın başlığını girin..."
                    />
                  </div>

                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                      Özet
                    </label>
                    <textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Yazınızın kısa bir özetini girin..."
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                      İçerik * (Markdown desteklenir)
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={20}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                      placeholder="Yazınızın içeriğini buraya yazın..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Yayın Ayarları</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durum
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="draft">Taslak</option>
                      <option value="published">Yayında</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Markdown Yardımı</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <div><code># Başlık</code> - Ana başlık</div>
                  <div><code>## Alt Başlık</code> - Alt başlık</div>
                  <div><code>**kalın**</code> - Kalın metin</div>
                  <div><code>*italik*</code> - İtalik metin</div>
                  <div><code>- Liste</code> - Madde işareti</div>
                  <div><code>&gt; Alıntı</code> - Alıntı</div>
                  <div><code>```kod```</code> - Kod bloğu</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="bg-white rounded-lg shadow-sm p-8">
            <article>
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {title || 'Başlık girilmedi'}
                </h1>
                {excerpt && (
                  <p className="text-xl text-gray-600 mb-4">{excerpt}</p>
                )}
                <div className="text-sm text-gray-500">
                  Yazar: BiomysticY • Düzenlendi
                </div>
              </header>
              
              <div className="prose-custom">
                {content ? (
                  <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                  <p className="text-gray-500 italic">İçerik girilmedi</p>
                )}
              </div>
            </article>
          </div>
        )}
      </main>
    </div>
  )
}