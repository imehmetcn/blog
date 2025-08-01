import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Veritabanından kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    // Kullanıcı kontrolü ve şifre kontrolü
    if (user && user.password === password) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Giriş başarılı',
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı!' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}