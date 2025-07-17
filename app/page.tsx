import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, User, ArrowRight } from 'lucide-react'

// Mock data - gerçek uygulamada database'den gelecek
const mockPosts = [
  {
    id: 1,
    title: "Blog Sitemize Hoş Geldiniz",
    excerpt: "Yeni blog sitemizde sizlerle düşüncelerimi, deneyimlerimi ve ilginç konuları paylaşacağım.",
    content: "Bu ilk yazımda...",
    createdAt: new Date('2024-01-15'),
    author: "BiomysticY",
    slug: "blog-sitemize-hos-geldiniz"
  },
  {
    id: 2,
    title: "Teknoloji ve Yaşam",
    excerpt: "Modern teknolojinin günlük yaşamımıza etkilerini ve bu değişime nasıl adapte olabileceğimizi konuşuyoruz.",
    content: "Teknoloji hızla gelişiyor...",
    createdAt: new Date('2024-01-10'),
    author: "BiomysticY",
    slug: "teknoloji-ve-yasam"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">BiomysticY</h1>
              <p className="text-gray-600 mt-1">Kişisel Blog & Düşünceler</p>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/hakkimda" className="text-gray-700 hover:text-primary-600 transition-colors">
                Hakkımda
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-primary-600 transition-colors">
                İletişim
              </Link>
              <Link href="/dashboard" className="btn-primary">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hoş Geldiniz
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bu blogda düşüncelerimi, deneyimlerimi ve ilginç bulduğum konuları sizlerle paylaşıyorum.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Son Yazılar</h3>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h4>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                  </div>
                </div>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Devamını Oku
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xl font-semibold mb-4">BiomysticY</h5>
              <p className="text-gray-400">
                Kişisel blog ve düşüncelerimi paylaştığım alan.
              </p>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Bağlantılar</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                <li><Link href="/hakkimda" className="hover:text-white transition-colors">Hakkımda</Link></li>
                <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">İletişim</h5>
              <p className="text-gray-400">
                Sorularınız için benimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BiomysticY. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}