'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Send, MessageCircle, Globe } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Gerçek uygulamada burada form gönderimi yapılacak
    console.log('Form submitted:', formData)
    
    // Simulated submission
    setTimeout(() => {
      alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağım.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900">
            İletişim
          </h1>
          <p className="text-gray-600 mt-2">
            Benimle iletişime geçmek için aşağıdaki formu kullanabilirsiniz.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mesaj Gönder</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Adınız *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Adınızı girin"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="E-posta adresinizi girin"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Konu
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Konu seçin</option>
                  <option value="genel">Genel Soru</option>
                  <option value="yazı">Yazı Hakkında</option>
                  <option value="işbirliği">İşbirliği Teklifi</option>
                  <option value="geri-bildirim">Geri Bildirim</option>
                  <option value="diğer">Diğer</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajınız *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Gönderiliyor...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    Mesajı Gönder
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">İletişim Bilgileri</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                    <p className="text-gray-600">
                      En hızlı iletişim yolu e-posta göndermektir. 
                      Genellikle 24 saat içinde yanıtlarım.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageCircle className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Geri Bildirim</h3>
                    <p className="text-gray-600">
                      Yazılarım hakkında düşüncelerinizi, eleştirilerinizi 
                      ve önerilerinizi paylaşabilirsiniz.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Eski Blog</h3>
                    <p className="text-gray-600 mb-2">
                      Daha önceki yazılarıma eski blog adresimden ulaşabilirsiniz.
                    </p>
                    <a 
                      href="https://biomysticy.blogspot.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      biomysticy.blogspot.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Sıkça Sorulan Sorular
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900">Ne kadar sürede yanıt veriyorsunuz?</h4>
                  <p className="text-gray-600">Genellikle 24-48 saat içinde yanıtlarım.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Misafir yazı kabul ediyor musunuz?</h4>
                  <p className="text-gray-600">Kaliteli içerikler için açığım, detayları konuşabiliriz.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">İşbirliği yapıyor musunuz?</h4>
                  <p className="text-gray-600">Uygun projeler için işbirliğine açığım.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}