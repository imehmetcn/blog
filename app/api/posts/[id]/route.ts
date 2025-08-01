import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts } from '../../../../lib/blog-data'

// GET - ID ile post getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await getBlogPosts()
    const post = posts.find(p => p.id.toString() === params.id)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Post getirme hatası:', error)
    return NextResponse.json(
      { error: 'Post getirilemedi' },
      { status: 500 }
    )
  }
}

// PUT - Post güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, excerpt, content, status, contentImages } = body

    // Validation
    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Başlık, özet ve içerik gereklidir' },
        { status: 400 }
      )
    }

    // Mevcut postları yükle
    const posts = await getBlogPosts()
    const postIndex = posts.findIndex(p => p.id.toString() === params.id)
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post bulunamadı' },
        { status: 404 }
      )
    }

    // Slug oluştur
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')

    // Post'u güncelle
    const updatedPost = {
      ...posts[postIndex],
      title,
      excerpt,
      content,
      slug,
      status: status || 'draft',
      readTime: Math.ceil(content.split(' ').length / 200) + ' dk',
      contentImages: contentImages || [],
      updatedAt: new Date()
    }

    posts[postIndex] = updatedPost

    // localStorage'a kaydet (geçici çözüm)
    if (typeof window !== 'undefined') {
      localStorage.setItem('blogPosts', JSON.stringify(posts))
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Post güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Post güncellenemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Post sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Mevcut postları yükle
    const posts = await getBlogPosts()
    const postIndex = posts.findIndex(p => p.id.toString() === params.id)
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post bulunamadı' },
        { status: 404 }
      )
    }

    // Post'u sil
    const deletedPost = posts.splice(postIndex, 1)[0]

    // localStorage'a kaydet (geçici çözüm)
    if (typeof window !== 'undefined') {
      localStorage.setItem('blogPosts', JSON.stringify(posts))
    }

    return NextResponse.json({ 
      message: 'Post başarıyla silindi',
      deletedPost 
    })
  } catch (error) {
    console.error('Post silme hatası:', error)
    return NextResponse.json(
      { error: 'Post silinemedi' },
      { status: 500 }
    )
  }
}