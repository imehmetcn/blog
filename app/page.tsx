'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, ArrowRight, Menu, X, Github, Twitter, Mail, Star, TrendingUp, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { getBlogPosts } from '../lib/blog-data'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mockPosts = getBlogPosts().slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">BiomysticY</h1>
                <p className="text-white/70 text-sm hidden sm:block">Kişisel Blog & Düşünceler</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/90 hover:text-white transition-all duration-200 font-medium relative group">
                Ana Sayfa
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link href="/blog" className="text-white/90 hover:text-white transition-all duration-200 font-medium relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link href="/hakkimda" className="text-white/90 hover:text-white transition-all duration-200 font-medium relative group">
                Hakkımda
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link href="/iletisim" className="text-white/90 hover:text-white transition-all duration-200 font-medium relative group">
                İletişim
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-white/20">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 py-4 animate-fade-in-up bg-black/40 backdrop-blur-md">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium px-2 py-1">
                  Ana Sayfa
                </Link>
                <Link href="/blog" className="text-white/90 hover:text-white transition-colors font-medium px-2 py-1">
                  Blog
                </Link>
                <Link href="/hakkimda" className="text-white/90 hover:text-white transition-colors font-medium px-2 py-1">
                  Hakkımda
                </Link>
                <Link href="/iletisim" className="text-white/90 hover:text-white transition-colors font-medium px-2 py-1">
                  İletişim
                </Link>
                <div className="flex items-center space-x-4 px-2 pt-4 border-t border-white/20">
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Hoş Geldiniz
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Düşünce Dünyama
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Bu blogda <span className="text-blue-300 font-semibold">teknoloji</span>, 
              <span className="text-purple-300 font-semibold"> yaşam</span> ve 
              <span className="text-pink-300 font-semibold"> kişisel deneyimlerimi</span> sizlerle paylaşıyorum.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/blog" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Yazıları Keşfet
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              
              <Link href="/hakkimda" className="group relative px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-2xl font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50">
                <div className="flex items-center">
                  Hakkımda Daha Fazla
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">50+</div>
                <div className="text-white/80 font-medium">Yazı</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">1K+</div>
                <div className="text-white/80 font-medium">Okuyucu</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">2024</div>
                <div className="text-white/80 font-medium">Başlangıç</div>
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden card-hover border border-white/10 hover:border-white/20 animate-fade-in-up transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-500 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                      Blog
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                    {post.title}
                  </h4>

                  <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm text-gray-400 mb-6 space-x-4">
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
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap">
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