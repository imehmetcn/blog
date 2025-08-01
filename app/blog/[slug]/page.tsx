'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, ArrowLeft } from 'lucide-react'
import { getBlogPost, BlogPost } from '../../../lib/blog-data'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const foundPost = await getBlogPost(params.slug)
        setPost(foundPost)
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

          <div className="flex items-center gap-6 text-gray-300 mb-6">
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


        </div>
      </div>





      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <article className="p-8 md:p-12">
            {/* İçerik */}
            <div
              className="prose prose-lg max-w-none text-gray-200"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-white mt-8 mb-4">$1</h3>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mt-10 mb-6">$1</h2>')
                  .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-12 mb-8">$1</h1>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>')
                  .replace(/\n\n/g, '</p><p class="text-gray-200 leading-relaxed mb-4">')
                  .replace(/\n/g, '<br>')
              }}
            />

            {/* İçerik Resimleri */}
            {post.contentImages && post.contentImages.length > 0 && (
              <div className="mt-12">
                <div className="grid gap-6">
                  {post.contentImages.map((image, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={image}
                        alt={`İçerik resmi ${index + 1}`}
                        className="rounded-lg shadow-lg border border-white/20 mx-auto max-w-full h-auto"
                        style={{ maxHeight: '500px' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>


        </div>
      </div>
    </div>
  )
}