export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  createdAt: Date
  author: string
  slug: string
  category: string
  tags: string[]
  readTime: string
  image?: string // Banner resmi için
  contentImages?: string[] // İçerik resimleri için
}

// Statik blog yazıları (şimdilik boş, sadece dinamik yazılar kullanılacak)
export const blogPosts: BlogPost[] = []

export function getBlogPosts() {
  // Client-side'da localStorage'dan veri al
  if (typeof window !== 'undefined') {
    const savedPosts = localStorage.getItem('blogPosts')
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt)
      }))
      return [...parsedPosts, ...blogPosts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }
  }
  
  return blogPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function getBlogPost(slug: string) {
  const allPosts = getBlogPosts()
  return allPosts.find(post => post.slug === slug)
}

export function getCategories() {
  const allPosts = getBlogPosts()
  const categories = allPosts.map(post => post.category)
  return [...new Set(categories)]
}

export function getTags() {
  const allPosts = getBlogPosts()
  const tags = allPosts.flatMap(post => post.tags)
  return [...new Set(tags)]
}