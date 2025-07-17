import Link from 'next/link'
import { ArrowLeft, Mail, Globe, Heart } from 'lucide-react'

export default function About() {
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
            Hakkımda
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose-custom">
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">B</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">BiomysticY</h2>
              <p className="text-xl text-gray-600">Blog Yazarı & İçerik Üreticisi</p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Merhaba!</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bu blog sayfasında sizlerle düşüncelerimi, deneyimlerimi ve ilginç bulduğum konuları 
                  paylaşıyorum. Teknolojiden günlük yaşama, kişisel gelişimden sosyal konulara kadar 
                  geniş bir yelpazede yazılar bulabilirsiniz.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Amacım, okuduğunuz her yazıda size yeni bir bakış açısı sunmak ve belki de 
                  düşüncelerinizi tetikleyecek konulara değinmek. Her yazımda samimi ve içten 
                  olmaya özen gösteriyorum.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Neler Yazıyorum?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Teknoloji</h4>
                    <p className="text-gray-600 text-sm">
                      Güncel teknoloji trendleri, dijital dönüşüm ve teknolojinin yaşamımıza etkileri
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Kişisel Gelişim</h4>
                    <p className="text-gray-600 text-sm">
                      Öz gelişim, motivasyon ve yaşam kalitesini artırmaya yönelik düşünceler
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Güncel Konular</h4>
                    <p className="text-gray-600 text-sm">
                      Toplumsal olaylar, gündem ve sosyal medya üzerine yorumlar
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Yaşam</h4>
                    <p className="text-gray-600 text-sm">
                      Günlük yaşam deneyimleri, gözlemler ve kişisel hikayeler
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">İletişim</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Yazılarım hakkında düşüncelerinizi, sorularınızı veya önerilerinizi 
                  benimle paylaşmaktan çekinmeyin. Her geri bildirim benim için değerli.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/iletisim"
                    className="inline-flex items-center btn-primary"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    İletişime Geç
                  </Link>
                  
                  <a 
                    href="https://biomysticy.blogspot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center btn-secondary"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Eski Blog
                  </a>
                </div>
              </section>

              <section className="bg-primary-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Teşekkür</h3>
                </div>
                <p className="text-gray-700">
                  Bu blogu okuduğunuz ve zamanınızı ayırdığınız için teşekkür ederim. 
                  Sizlerin desteği ve ilgisi beni yazmaya devam etmeye motive ediyor.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}