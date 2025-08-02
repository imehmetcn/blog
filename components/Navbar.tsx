'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Home, BookOpen, Settings } from 'lucide-react'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Authentication durumunu kontrol et
    const authStatus = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(authStatus === 'true')
    
    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      const authStatus = localStorage.getItem('isAuthenticated')
      setIsAuthenticated(authStatus === 'true')
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Login/logout işlemlerini dinlemek için custom event
    const handleAuthChange = () => {
      const authStatus = localStorage.getItem('isAuthenticated')
      setIsAuthenticated(authStatus === 'true')
    }
    
    window.addEventListener('authChange', handleAuthChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])

  if (!mounted) {
    return null // Hydration mismatch'i önlemek için
  }
  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="text-white font-bold text-lg">E</span>
                <p>Biomysticy</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-2">
              <Link 
                href="/" 
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-2xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </Link>
              <Link 
                href="/#blog" 
                className="flex items-center space-x-2 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
              >
                <BookOpen className="w-5 h-5" />
                <span>Blog</span>
              </Link>
            </nav>

            {/* Auth Button */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link 
                  href="/panel" 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <Settings className="w-5 h-5" />
                  <span>Panel</span>
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg"
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <span className="text-white font-bold text-sm">B</span>
              </div>
            </Link>

            {/* Mobile Navigation */}
            <nav className="flex items-center space-x-2">
              <Link 
                href="/" 
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                title="Ana Sayfa"
              >
                <Home className="w-4 h-4" />
              </Link>
              <Link 
                href="/#blog" 
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                title="Blog"
              >
                <BookOpen className="w-4 h-4" />
              </Link>
              {isAuthenticated && (
                <Link 
                  href="/panel" 
                  className="flex items-center space-x-1 bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Settings className="w-4 h-4" />
                  <span>Panel</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}