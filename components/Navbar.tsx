'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Github, Twitter, Mail } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4 md:py-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">B</span>
            </div>
            <div>
              <Link href="/">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white hover:text-blue-200 transition-colors">
                  BiomysticY
                </h1>
              </Link>
              <p className="text-white/70 text-xs sm:text-sm hidden sm:block">Kişisel Blog & Düşünceler</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/90 hover:text-white transition-all duration-200 font-medium relative group">
              Ana Sayfa
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/blog" className="text-white/90 hover:text-white transition-all duration-200 font-medium relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/hakkimda" className="text-white/90 hover:text-white transition-all duration-200 font-medium relative group">
              Hakkımda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/iletisim" className="text-white/90 hover:text-white transition-all duration-200 font-medium relative group">
              İletişim
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-white/20">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 animate-fade-in-up bg-black/40 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium px-2 py-1">
                Ana Sayfa
              </Link>
              <Link href="/blog" className="text-white/90 hover:text-white transition-colors font-medium px-2 py-1">
                Blog
              </Link>
              <Link href="/hakkimda" className="text-white/90 hover:text-white transition-colors font-medium px-2 py-1">
                Hakkımda
              </Link>
              <Link href="/iletisim" className="text-white/90 hover:text-white transition-colors font-medium px-2 py-1">
                İletişim
              </Link>
              <div className="flex items-center space-x-4 px-2 pt-4 border-t border-white/20">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}