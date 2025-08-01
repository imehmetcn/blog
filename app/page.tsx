'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, ArrowRight, Github, Twitter, Mail, MapPin, Heart, Edit } from 'lucide-react'
import { getBlogPosts, BlogPost } from '../lib/blog-data'

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Authentication durumunu kontrol et
    const authStatus = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(authStatus === 'true')

    const loadPosts = async () => {
      try {
        const allPosts = await getBlogPosts()
        setPosts(allPosts.slice(0, 6))
      } catch (error) {
        console.error('Blog posts yüklenemedi:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (!mounted) {
    return null // Hydration mismatch'i önlemek için
  }

  return (
    <div className="min-h-screen">
      {/* Hero & About Combined Section */}
      <section id="hakkimda" className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Moving Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-shift"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-indigo-900/50 animate-gradient-shift-reverse"></div>

          {/* Mesh Gradient Overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 via-transparent to-blue-500/20 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-500/20 via-transparent to-pink-500/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 hidden sm:block">
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-8 sm:py-12">
          {/* Hero Content */}
          <div className="text-center animate-fade-in-up">


            {/* Main Heading */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight px-2 sm:px-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Merhaba Ben Elif
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Düşünce Dünyama Hoşgeldiniz
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed font-light px-2 sm:px-4">
              Blogumda <span className="text-blue-300 font-semibold">kişisel yazılarımı</span> paylaşıyorum
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 px-2">
              <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Türkiye
              </div>
              <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                2023'ten beri
              </div>
              <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 text-xs sm:text-sm">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Yazmayı seviyorum
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
            <a href="#blog" className="animate-bounce">
              <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-white/80 transition-colors">
                <div className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white/70 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section id="blog" className="bg-gradient-to-b from-slate-900 to-gray-900 py-16 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Son Yazılar</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Tüm blogum burada
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 animate-pulse">
                  <div className="h-40 sm:h-48 bg-gray-700"></div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="h-6 bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">Henüz blog yazısı yok</p>
                <Link href="/login" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
                  Giriş yaparak ilk yazınızı oluşturun
                </Link>
              </div>
            ) : (
              posts.map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden card-hover border border-white/10 hover:border-white/20 animate-fade-in-up transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Banner Image */}
                  <div className="h-40 sm:h-48 relative overflow-hidden">
                    {(post.image || (post.contentImages && post.contentImages.length > 0)) ? (
                      <img
                        src={post.image || post.contentImages?.[0] || ''}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Banner resmi yüklenemedi:', post.image || post.contentImages?.[0]);
                          // Fallback gradient göster
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback && fallback.classList.contains('fallback-gradient')) {
                            fallback.style.display = 'block';
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full bg-gradient-to-br from-primary-500 to-blue-600 fallback-gradient ${(post.image || (post.contentImages && post.contentImages.length > 0)) ? 'hidden' : 'block'
                        }`}
                    ></div>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center space-x-2">
                      {isAuthenticated && (
                        <Link
                          href={`/panel/edit/${post.id}`}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      )}
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 md:p-8">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                      {post.title}
                    </h4>



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
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo & Name */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h5 className="text-xl font-bold">Biomysticy</h5>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-right">
              &copy; 2021 ∞ M/E
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}