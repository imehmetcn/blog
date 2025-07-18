'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, ArrowRight, Star, TrendingUp, BookOpen, Github, Twitter, Mail } from 'lucide-react'
import { getBlogPosts } from '../lib/blog-data'

export default function HomePage() {
  const mockPosts = getBlogPosts().slice(0, 3)

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Moving Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-shift"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-indigo-900/50 animate-gradient-shift-reverse"></div>
          
          {/* Mesh Gradient Overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 via-transparent to-blue-500/20 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-500/20 via-transparent to-pink-500/20 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-float-delayed"></div>
            <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-50 animate-float-slow"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-300 rounded-full opacity-30 animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-indigo-300 rounded-full opacity-40 animate-float-delayed"></div>
            <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-50 animate-float-slow"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-300/20 rounded-full opacity-30 animate-float"></div>
            <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-green-300/30 rounded-full opacity-40 animate-float-delayed"></div>
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/20 shadow-lg">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Yeni yazılar her hafta
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight px-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Hoş Geldiniz
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Düşünce Dünyama
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-4">
              Bu blogda <span className="text-blue-300 font-semibold">teknoloji</span>, 
              <span className="text-purple-300 font-semibold"> yaşam</span> ve 
              <span className="text-pink-300 font-semibold"> kişisel deneyimlerimi</span> sizlerle paylaşıyorum.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
              <Link href="/blog" className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-center">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Yazıları Keşfet
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              
              <Link href="/hakkimda" className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 border border-white/30 hover:border-white/50">
                <div className="flex items-center justify-center">
                  Hakkımda Daha Fazla
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">50+</div>
                <div className="text-white/80 font-medium text-sm sm:text-base">Yazı</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">1K+</div>
                <div className="text-white/80 font-medium text-sm sm:text-base">Okuyucu</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 sm:col-span-2 md:col-span-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">2024</div>
                <div className="text-white/80 font-medium text-sm sm:text-base">Başlangıç</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-white/80 transition-colors">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>     
 {/* Featured Section */}
      <section className="bg-gradient-to-b from-slate-900 to-gray-900 py-16 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium mb-6 border border-white/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Öne Çıkan İçerikler
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Son Yazılar</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              En güncel düşüncelerim ve deneyimlerim burada
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden card-hover border border-white/10 hover:border-white/20 animate-fade-in-up transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image placeholder */}
                <div className="h-40 sm:h-48 bg-gradient-to-br from-primary-500 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/30">
                      Blog
                    </span>
                  </div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                    {post.title}
                  </h4>

                  <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed line-clamp-3 text-sm sm:text-base">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">B</span>
                      </div>
                      <span className="font-medium text-white">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold group/link transition-all duration-200 hover:gap-3"
                  >
                    Devamını Oku
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-2xl font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-105">
              Tüm Yazıları Görüntüle
              <ArrowRight className="w-5 h-5 ml-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-600 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Yeni Yazılardan Haberdar Olun
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Haftalık bültenimize abone olun ve yeni içeriklerden ilk siz haberdar olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 sm:px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none text-sm sm:text-base"
              />
              <button className="bg-white text-primary-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap text-sm sm:text-base">
                Abone Ol
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </div>
        </div>
      </section>

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