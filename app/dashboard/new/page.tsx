'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('draft')
  const [isPreview, setIsPreview] = useState(false)

  const handleSave = async (saveStatus: string) => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    console.log('Saving post:', {
      title,
      excerpt,
      content,
      status: saveStatus,
      slug
    })

    // Simulated save
    alert(`Yazı ${saveStatus === 'published' ? 'yayınlandı' : 'taslak olarak kaydedildi'}!`)
    router.push('/dashboard')
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
              <h1 className="text-2xl font-bold text-gray-900">Yeni Yazı</h1>
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
                      placeholder="# Başlık

Yazınızın içeriğini buraya yazın...

## Alt Başlık

- Liste öğesi 1
- Liste öğesi 2

**Kalın metin** ve *italik metin* kullanabilirsiniz.

> Alıntı metni

```javascript
// Kod bloğu
console.log('Merhaba Dünya!');
```"
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
                  Yazar: BiomysticY • Şimdi
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