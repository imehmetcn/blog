import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Slug ile tek blog yazısını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: params.slug
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Blog yazısı bulunamadı' },
        { status: 404 }
      )
    }

    // Frontend için format düzenle
    const formattedPost = {
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
    }

    return NextResponse.json(formattedPost)
  } catch (error) {
    console.error('Post fetch error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı getirilemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Blog yazısını sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.post.delete({
      where: {
        slug: params.slug
      }
    })

    return NextResponse.json({ message: 'Blog yazısı silindi' })
  } catch (error) {
    console.error('Post deletion error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı silinemedi' },
      { status: 500 }
    )
  }
}