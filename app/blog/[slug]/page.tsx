import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

// Mock data - gerçek uygulamada database'den gelecek
const mockPosts = [
  {
    id: 1,
    title: "Blog Sitemize Hoş Geldiniz",
    excerpt: "Yeni blog sitemizde sizlerle düşüncelerimi, deneyimlerimi ve ilginç konuları paylaşacağım.",
    content: `# Blog Sitemize Hoş Geldiniz

Merhaba değerli okuyucular!

Bu yeni blog sitemde sizlerle **düşüncelerimi**, deneyimlerimi ve ilginç bulduğum konuları paylaşacağım. 

## Neler Bulacaksınız?

- Teknoloji hakkında yazılar
- Kişisel deneyimler
- Güncel konular üzerine düşünceler
- Ve daha fazlası...

Umarım bu yazıları okurken keyif alırsınız. Yorumlarınızı ve geri bildirimlerinizi bekliyorum!

> "Bilgi paylaştıkça çoğalır." - Anonim

Herkese iyi okumalar!`,
    createdAt: new Date('2024-01-15'),
    author: "BiomysticY",
    slug: "blog-sitemize-hos-geldiniz"
  },
  {
    id: 2,
    title: "Teknoloji ve Yaşam",
    excerpt: "Modern teknolojinin günlük yaşamımıza etkilerini ve bu değişime nasıl adapte olabileceğimizi konuşuyoruz.",
    content: `# Teknoloji ve Yaşam

Modern teknoloji hayatımızı nasıl etkiliyor? Bu sorunun cevabını aramaya devam ediyoruz.

## Dijital Dönüşüm

Günümüzde dijital dönüşüm sadece şirketleri değil, bireyleri de etkiliyor. 

### Avantajlar
- Hızlı iletişim
- Kolay bilgi erişimi
- Uzaktan çalışma imkanları

### Dezavantajlar
- Dijital bağımlılık
- Gizlilik endişeleri
- Sosyal izolasyon

Bu dengeyi nasıl kuracağız? Bu konuda düşüncelerinizi merak ediyorum.`,
    createdAt: new Date('2024-01-10'),
    author: "BiomysticY",
    slug: "teknoloji-ve-yasam"
  }
]

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = mockPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-600 space-x-6">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose-custom">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <Link 
            href="/"
            className="btn-secondary"
          >
            ← Tüm Yazılar
          </Link>
          
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">Bu yazıyı beğendiniz mi?</p>
            <div className="space-x-2">
              <button className="text-2xl hover:scale-110 transition-transform">👍</button>
              <button className="text-2xl hover:scale-110 transition-transform">❤️</button>
              <button className="text-2xl hover:scale-110 transition-transform">🔥</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}