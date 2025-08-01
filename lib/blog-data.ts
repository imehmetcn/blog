export interface BlogPost {
  id: number
  title: string
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

// Client-side için API çağrıları
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/api/posts')
    if (response.ok) {
      const posts = await response.json()
      return posts.map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt)
      }))
    }
  } catch (error) {
    console.error('Blog posts fetch error:', error)
  }
  
  return []
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // API endpoint artık hem ID hem slug kabul ediyor
    const response = await fetch(`/api/posts/${slug}`)
    if (response.ok) {
      const post = await response.json()
      return {
        ...post,
        createdAt: new Date(post.createdAt)
      }
    }
  } catch (error) {
    console.error('Blog post fetch error:', error)
  }
  
  return null
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