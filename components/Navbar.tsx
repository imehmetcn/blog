'use client'

import Link from 'next/link'
import { Home, BookOpen } from 'lucide-react'

export default function Navbar() {
  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
                  BiomysticY
                </h1>
                <p className="text-white/70 text-sm">Kişisel Blog & Düşünceler</p>
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

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="bg-orange-600/20 backdrop-blur-md text-orange-300 px-4 py-2 rounded-lg font-medium hover:bg-orange-600/30 transition-all duration-300 border border-orange-500/30 text-sm"
              >
                Admin
              </Link>
              <Link 
                href="/#blog" 
                className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg"
              >
                Yazıları Keşfet
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">BiomysticY</h1>
              </div>
            </Link>

            {/* Mobile Navigation */}
            <nav className="flex items-center space-x-2">
              <Link 
                href="/" 
                className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-lg text-white text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                <span>Ana Sayfa</span>
              </Link>
              <Link 
                href="/#blog" 
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}