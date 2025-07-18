import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react'
import { getBlogPosts, getCategories, getTags } from '@/lib/blog-data'

export default function BlogPage() {
  const blogPosts = getBlogPosts()
  const categories = getCategories()
  const tags = getTags()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Blog Yazıları
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Düşüncelerim, deneyimlerim ve ilginç bulduğum konular hakkında yazılar
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: tr })}
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-primary-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">B</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{post.author}</div>
                          <div className="text-sm text-gray-500">Yazar</div>
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
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Arama</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Yazı ara..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
                <ul className="space-y-2">
                  {categories.map((category) => {
                    const count = blogPosts.filter(post => post.category === category).length
                    return (
                      <li key={category}>
                        <a href="#" className="flex items-center justify-between text-gray-600 hover:text-primary-600 transition-colors">
                          <span>{category}</span>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">{count}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Popüler Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-pointer"
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
    </div>
  )
}