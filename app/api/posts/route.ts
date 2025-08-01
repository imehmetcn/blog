import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Tüm blog yazılarını getir
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Frontend için format düzenle
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      readTime: post.readTime,
      image: post.image,
      contentImages: post.contentImages,
      status: post.status,
      createdAt: post.createdAt,
      author: post.author.username
    }))

    return NextResponse.json(formattedPosts)
  } catch (error) {
    console.error('Posts fetch error:', error)
    return NextResponse.json(
      { error: 'Blog yazıları getirilemedi' },
      { status: 500 }
    )
  }
}

// POST - Yeni blog yazısı oluştur
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Slug oluştur
    const slug = data.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    // Varsayılan user ID (şimdilik 1, sonra auth'dan alınacak)
    const defaultUserId = 1

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category || 'Genel',
        tags: data.tags || [],
        readTime: data.readTime || '5 dk',
        image: data.image,
        contentImages: data.contentImages || [],
        status: data.status || 'draft',
        authorId: defaultUserId
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    })

    return NextResponse.json({
      ...post,
      author: post.author.username
    })
  } catch (error) {
    console.error('Post creation error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı oluşturulamadı' },
      { status: 500 }
    )
  }
}