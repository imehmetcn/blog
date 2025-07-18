'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, User, ArrowRight, Menu, X, Github, Twitter, Mail, Star, TrendingUp, BookOpen } from 'lucide-react'
import { useState } from 'react'

import { getBlogPosts } from '@/lib/blog-data'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mockPosts = getBlogPosts().slice(0, 3) // Son 3 yazıyı göster

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold gradient-text">BiomysticY</h1>
                <p className="text-gray-600 text-sm hidden sm:block">Kişisel Blog & Düşünceler</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-all duration-200 font-medium relative group">
                Ana Sayfa
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-primary-600 transition-all duration-200 font-medium relative group">
                Blog
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
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-fade-in-up">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
                  Ana Sayfa
                </Link>
                <Link href="/blog" className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
                  Blog
                </Link>
                <Link href="/hakkimda" className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
                  Hakkımda
                </Link>
                <Link href="/iletisim" className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
                  İletişim
                </Link>
                <div className="flex items-center space-x-4 px-2 pt-4 border-t border-gray-200">
                  <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-pink-200 rounded-full opacity-20 animate-float-delayed"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-700 border border-primary-200 mb-6">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Yeni yazılar her hafta
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Hoş Geldiniz</span>
              <br />
              <span className="text-gray-800">Düşünce Dünyama</span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Bu blogda <span className="text-primary-600 font-semibold">teknoloji</span>,
              <span className="text-primary-600 font-semibold"> yaşam</span> ve
              <span className="text-primary-600 font-semibold"> kişisel deneyimlerimi</span> sizlerle paylaşıyorum.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/blog" className="btn-primary group">
                <BookOpen className="w-5 h-5 mr-2" />
                Yazıları Keşfet
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/hakkimda" className="btn-secondary group">
                Hakkımda Daha Fazla
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Yazı</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-2">1K+</div>
                <div className="text-sm text-gray-600">Okuyucu</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-2">2024</div>
                <div className="text-sm text-gray-600">Başlangıç</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Öne Çıkan İçerikler
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Son Yazılar</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En güncel düşüncelerim ve deneyimlerim burada
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden card-hover border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-400 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-medium rounded-full">
                      Blog
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                    {post.title}
                  </h4>

                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">B</span>
                      </div>
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                      {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group/link transition-all duration-200 hover:gap-3"
                  >
                    Devamını Oku
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="btn-primary">
              Tüm Yazıları Görüntüle
              <ArrowRight className="w-4 h-4 ml-2" />
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