import { Github, Twitter, Mail, MapPin, Calendar, Heart } from 'lucide-react'

export default function HakkimdaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-blue-900/20"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <span className="text-white text-4xl font-bold">B</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Merhaba, Ben <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">BiomysticY</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Teknoloji tutkunu bir yazılım geliştirici ve blog yazarı
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
                <MapPin className="w-4 h-4 mr-2" />
                Türkiye
              </div>
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
                <Calendar className="w-4 h-4 mr-2" />
                2024'ten beri
              </div>
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
                <Heart className="w-4 h-4 mr-2" />
                Yazmayı seviyorum
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors border border-white/20">
                <Github className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors border border-white/20">
                <Twitter className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors border border-white/20">
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Hikayem</h3>
                <p className="text-gray-300 leading-relaxed">
                  Teknoloji dünyasına olan tutkum çocukluktan beri var. Yazılım geliştirme, 
                  web teknolojileri ve dijital dünyada yaşanan gelişmeleri takip etmeyi seviyorum. 
                  Bu blogda deneyimlerimi, öğrendiklerimi ve düşüncelerimi sizlerle paylaşıyorum.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">İlgi Alanlarım</h3>
                <div className="flex flex-wrap gap-3">
                  {['JavaScript', 'React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Blog Yazarlığı', 'Teknoloji'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm border border-primary-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Neden Blog Yazıyorum?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Öğrendiğim şeyleri paylaşmak, deneyimlerimi aktarmak ve teknoloji 
                  dünyasındaki gelişmeleri yorumlamak için yazıyorum. Aynı zamanda 
                  yazma sürecinin kendimi geliştirmeme yardımcı olduğunu düşünüyorum.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">İletişim</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Benimle iletişime geçmek isterseniz, sosyal medya hesaplarımdan 
                  veya e-posta yoluyla ulaşabilirsiniz. Sorularınızı, önerilerinizi 
                  ve geri bildirimlerinizi bekliyorum.
                </p>
                <a href="/iletisim" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  İletişim sayfasına git →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}