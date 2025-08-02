'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, ArrowLeft, Edit } from 'lucide-react'
import { getBlogPost, BlogPost } from '../../../lib/blog-data'
import { marked } from 'marked'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [processedContent, setProcessedContent] = useState('')

  useEffect(() => {
    // Authentication durumunu kontrol et
    const authStatus = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(authStatus === 'true')
    
    const loadPost = async () => {
      try {
        const foundPost = await getBlogPost(params.slug)
        if (foundPost) {
          setPost(foundPost)
          
          // Markdown içeriği doğrudan HTML'e çevir
          const htmlContent = await marked(foundPost.content)
          setProcessedContent(htmlContent)
        }
      } catch (error) {
        console.error('Blog post yüklenemedi:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Yazı Bulunamadı</h1>
          <Link href="/#blog" className="text-blue-400 hover:text-blue-300">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900/30 to-slate-900 border-b border-white/10 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/#blog"
            className="inline-flex items-center text-blue-300 hover:text-white font-medium mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Tüm Yazılara Dön
          </Link>

          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <div>
                  <div className="font-medium text-white">{post.author}</div>
                  <div className="text-sm text-gray-400">Yazar</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{format(post.createdAt, 'dd MMMM yyyy', { locale: tr })}</span>
              </div>
              <div>
                <span className="text-sm">{post.readTime} okuma</span>
              </div>
            </div>
            
            {isAuthenticated && (
              <Link
                href={`/panel/edit/${post.id}`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                title="Yazıyı Düzenle"
              >
                <Edit className="w-4 h-4 mr-2" />
                Düzenle
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <article className="p-8 md:p-12">
            {/* Markdown İçerik */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: processedContent
              }}
            />
          </article>
        </div>
      </div>
    </div>
  )
}