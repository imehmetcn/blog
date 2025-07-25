import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, User, ArrowRight, Search, Tag, Github, Twitter, Mail } from 'lucide-react'
import { getBlogPosts, getCategories, getTags } from '../../lib/blog-data'

export default function BlogPage() {
  const blogPosts = getBlogPosts()
  const categories = getCategories()
  const tags = getTags()
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900/50 to-slate-900 border-b border-white/10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              Blog Yazıları
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Düşüncelerim, deneyimlerim ve ilginç bulduğum konular hakkında yazılar
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid gap-6 sm:gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden animate-fade-in-up border border-white/10 hover:border-white/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs sm:text-sm font-medium rounded-full border border-primary-400/30 w-fit">
                        {post.category}
                      </span>
                      <div className="flex items-center text-xs sm:text-sm text-gray-400">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 hover:text-blue-300 transition-colors leading-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">B</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">{post.author}</div>
                          <div className="text-sm text-gray-400">Yazar</div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold group transition-all duration-200"
                      >
                        Devamını Oku
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Search */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4 text-white">Arama</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Yazı ara..."
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4 text-white">Kategoriler</h3>
                <ul className="space-y-2">
                  {categories.map((category) => {
                    const count = blogPosts.filter(post => post.category === category).length
                    return (
                      <li key={category}>
                        <a href="#" className="flex items-center justify-between text-gray-300 hover:text-white transition-colors">
                          <span>{category}</span>
                          <span className="text-sm bg-white/10 text-gray-300 px-2 py-1 rounded">{count}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4 text-white">Popüler Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full hover:bg-primary-500/20 hover:text-primary-300 transition-colors cursor-pointer border border-white/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <h5 className="text-2xl font-bold">BiomysticY</h5>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Teknoloji, yaşam ve kişisel deneyimlerimi paylaştığım blog. 
                Düşüncelerimi özgürce ifade ettiğim dijital alanım.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-6">Sayfalar</h5>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/hakkimda" className="text-gray-400 hover:text-white transition-colors">Hakkımda</Link></li>
                <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">İletişim</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-6">Kategoriler</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Teknoloji</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yaşam</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kişisel</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Düşünceler</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 BiomysticY. Tüm hakları saklıdır.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Gizlilik Politikası</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Kullanım Şartları</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}