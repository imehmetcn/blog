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
}

// Eski Blogspot sitenizden aktarılan blog yazıları
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Blog Sitemize Hoş Geldiniz",
    excerpt: "Yeni blog sitemizde sizlerle düşüncelerimi, deneyimlerimi ve ilginç konuları paylaşacağım.",
    content: `# Blog Sitemize Hoş Geldiniz

Merhaba değerli okuyucular! Bu yeni blog sitesinde sizlerle düşüncelerimi, deneyimlerimi ve ilginç bulduğum konuları paylaşacağım.

## Neler Bulacaksınız?

Bu blogda şu konularda yazılar bulabilirsiniz:

- **Teknoloji**: Güncel teknoloji haberleri ve yorumları
- **Yaşam**: Günlük yaşamdan deneyimler ve öneriler  
- **Kişisel Gelişim**: Kendimi geliştirme yolculuğum
- **Düşünceler**: Hayat hakkında düşüncelerim

## Hedefim

Amacım, okuduğunuz her yazıdan bir şeyler öğrenmenizi sağlamak ve belki de sizin de benzer deneyimler yaşadığınızı hissettirmek.

Yorumlarınızı ve geri bildirimlerinizi bekliyorum!`,
    createdAt: new Date('2024-01-15'),
    author: "BiomysticY",
    slug: "blog-sitemize-hos-geldiniz",
    category: "Genel",
    tags: ["hoşgeldin", "blog", "yeni"],
    readTime: "3 dk"
  },
  
  // Buraya eski Blogspot yazılarınızı ekleyeceğiz
  // Örnek format:
  /*
  {
    id: 2,
    title: "Yazı Başlığı",
    excerpt: "Yazının kısa özeti...",
    content: `# Yazı Başlığı
    
Yazının tam içeriği buraya gelecek...`,
    createdAt: new Date('2023-12-01'),
    author: "BiomysticY",
    slug: "yazi-basligi",
    category: "Kategori",
    tags: ["etiket1", "etiket2"],
    readTime: "5 dk"
  },
  */
]

export function getBlogPosts() {
  return blogPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug)
}

export function getCategories() {
  const categories = blogPosts.map(post => post.category)
  return [...new Set(categories)]
}

export function getTags() {
  const tags = blogPosts.flatMap(post => post.tags)
  return [...new Set(tags)]
}