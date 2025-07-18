import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDistanceToNow, format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, User, ArrowLeft, Share2, Heart, MessageCircle, Tag } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { getBlogPost, getBlogPosts } from '../../../lib/blog-data'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900/30 to-slate-900 border-b border-white/10 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-300 hover:text-white font-medium mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Tüm Yazılara Dön
          </Link>

          <div className="mb-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">B</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-500">Yazar</div>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{format(post.createdAt, 'dd MMMM yyyy', { locale: tr })}</span>
            </div>

            <div className="flex items-center">
              <span className="text-sm">{post.readTime} okuma</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <article className="prose prose-lg max-w-none p-8 md:p-12 prose-invert">
            <ReactMarkdown className="prose-custom text-gray-200">
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          <div className="px-8 md:px-12 pb-8">
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Etiketler
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 md:px-12 pb-8">
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Beğen</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Yorum Yap</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Paylaş</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl font-bold">B</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">BiomysticY</h3>
              <p className="text-gray-600 leading-relaxed">
                Teknoloji, yaşam ve kişisel gelişim konularında yazılar yazan bir blog yazarı. 
                Deneyimlerimi ve öğrendiklerimi sizlerle paylaşmayı seviyorum.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
                  Tüm Yazıları
                </a>
                <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
                  İletişim
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">İlgili Yazılar</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bu kısım diğer blog yazıları eklendikten sonra doldurulacak */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-2">Yakında...</h4>
              <p className="text-gray-600">Daha fazla içerik yakında eklenecek.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}