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
              <a 
                href="#hakkimda" 
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-2xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Ana Sayfa</span>
              </a>
              <a 
                href="#blog" 
                className="flex items-center space-x-2 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
              >
                <BookOpen className="w-5 h-5" />
                <span>Blog</span>
              </a>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <a 
                href="#blog" 
                className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg"
              >
                Yazıları Keşfet
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Always Visible Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-black/20 backdrop-blur-md rounded-t-3xl mx-4 mb-4 shadow-2xl border border-white/10">
          <div className="px-4 py-4">
            <nav className="flex justify-center items-center space-x-4">
              {/* Ana Sayfa - Active */}
              <a 
                href="#hakkimda" 
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">Ana Sayfa</span>
              </a>
              
              {/* Keşfet */}
              <a 
                href="/blog" 
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <BookOpen className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">Keşfet</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}