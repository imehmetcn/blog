import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Basit authentication - gerçek uygulamada hash'lenmiş şifre kullanılmalı
    if (username === 'admin' && password === 'admin123') {
      return NextResponse.json(
        { success: true, message: 'Giriş başarılı' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı!' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}