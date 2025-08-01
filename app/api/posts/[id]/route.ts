import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - ID veya slug ile post getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let post = null
    
    // Önce ID ile ara (sayısal ise)
    if (!isNaN(Number(params.id))) {
      post = await prisma.post.findUnique({
        where: { id: parseInt(params.id) },
        include: {
          author: {
            select: { username: true }
          }
        }
      })
    }
    
    // ID ile bulunamadıysa slug ile ara
    if (!post) {
      post = await prisma.post.findUnique({
        where: { slug: params.id },
        include: {
          author: {
            select: { username: true }
          }
        }
      })
    }
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post bulunamadı' },
        { status: 404 }
      )
    }

    // Frontend için format düzenle
    const formattedPost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      category: post.category,
      tags: post.tags,
      readTime: post.readTime,
      image: post.image,
      contentImages: post.contentImages,
      status: post.status,
      createdAt: post.createdAt,
      author: post.author.username
    }

    return NextResponse.json(formattedPost)
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
    const { title, content, status, contentImages } = body

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Başlık ve içerik gereklidir' },
        { status: 400 }
      )
    }

    // Slug oluştur
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')

    // Post'u güncelle
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        content,
        slug,
        status: status || 'draft',
        readTime: Math.ceil(content.split(' ').length / 200) + ' dk',
        contentImages: contentImages || []
      },
      include: {
        author: {
          select: { username: true }
        }
      }
    })

    // Frontend için format düzenle
    const formattedPost = {
      id: updatedPost.id,
      title: updatedPost.title,
      slug: updatedPost.slug,
      content: updatedPost.content,
      category: updatedPost.category,
      tags: updatedPost.tags,
      readTime: updatedPost.readTime,
      image: updatedPost.image,
      contentImages: updatedPost.contentImages,
      status: updatedPost.status,
      createdAt: updatedPost.createdAt,
      author: updatedPost.author.username
    }

    return NextResponse.json(formattedPost)
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
    // Post'u sil
    const deletedPost = await prisma.post.delete({
      where: { id: parseInt(params.id) },
      include: {
        author: {
          select: { username: true }
        }
      }
    })

    return NextResponse.json({ 
      message: 'Post başarıyla silindi',
      deletedPost: {
        id: deletedPost.id,
        title: deletedPost.title,
        slug: deletedPost.slug,
        author: deletedPost.author.username
      }
    })
  } catch (error) {
    console.error('Post silme hatası:', error)
    return NextResponse.json(
      { error: 'Post silinemedi' },
      { status: 500 }
    )
  }
}