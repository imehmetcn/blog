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
      <header className="glass-effect sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">BiomysticY</h1>
              <p className="text-gray-600 mt-1">Kişisel Blog & Düşünceler</p>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-all duration-200 font-medium relative group">
                Ana Sayfa
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link href="/hakkimda" className="text-gray-700 hover:text-primary-600 transition-all duration-200 font-medium relative group">
                Hakkımda
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-primary-600 transition-all duration-200 font-medium relative group">
                İletişim
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Hoş Geldiniz</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Bu blogda düşüncelerimi, deneyimlerimi ve ilginç bulduğum konuları 
              <span className="text-primary-600 font-semibold"> sizlerle paylaşıyorum</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/blog" className="btn-primary">
                Yazıları Keşfet
              </Link>
              <Link href="/hakkimda" className="btn-secondary">
                Hakkımda Daha Fazla
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-float-slow"></div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Son Yazılar</h3>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((post, index) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    Blog
                  </span>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
                  {post.title}
                </h4>
                
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                    {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                  </div>
                </div>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group transition-all duration-200"
                >
                  Devamını Oku
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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