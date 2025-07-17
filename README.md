# BiomysticY Blog

Eşiniz için özel olarak tasarlanmış modern blog sitesi. Next.js ile geliştirilmiş, Vercel'de kolayca deploy edilebilir.

## Özellikler

- ✨ Modern ve responsive tasarım
- 📝 Markdown destekli blog yazma
- 🎛️ Kolay kullanımlı dashboard
- 📱 Mobil uyumlu
- 🚀 Vercel'de kolay deployment
- 🎨 Tailwind CSS ile şık tasarım

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda `http://localhost:3000` adresini açın.

## Sayfalar

- **Ana Sayfa** (`/`) - Blog yazılarının listelendiği ana sayfa
- **Blog Detay** (`/blog/[slug]`) - Tek yazı görüntüleme sayfası
- **Dashboard** (`/dashboard`) - Yazı yönetim paneli
- **Yeni Yazı** (`/dashboard/new`) - Yeni yazı oluşturma
- **Yazı Düzenle** (`/dashboard/edit/[id]`) - Mevcut yazıyı düzenleme
- **Hakkımda** (`/hakkimda`) - Kişisel tanıtım sayfası
- **İletişim** (`/iletisim`) - İletişim formu

## Dashboard Kullanımı

1. `/dashboard` adresine gidin
2. "Yeni Yazı" butonuna tıklayın
3. Başlık, özet ve içerik alanlarını doldurun
4. Markdown formatında yazabilirsiniz
5. "Önizle" butonu ile yazınızı kontrol edin
6. "Taslak Kaydet" veya "Yayınla" butonları ile kaydedin

## Markdown Desteği

Blog yazılarında Markdown formatını kullanabilirsiniz:

- `# Başlık` - Ana başlık
- `## Alt Başlık` - Alt başlık  
- `**kalın**` - Kalın metin
- `*italik*` - İtalik metin
- `- Liste` - Madde işareti
- `> Alıntı` - Alıntı
- ` ```kod``` ` - Kod bloğu

## Vercel'de Deploy

1. GitHub'a projeyi yükleyin
2. Vercel hesabınızla GitHub'ı bağlayın
3. Projeyi import edin
4. Deploy butonuna tıklayın

## Gelecek Özellikler

- [ ] Veritabanı entegrasyonu (Prisma + PostgreSQL)
- [ ] Kullanıcı girişi (NextAuth.js)
- [ ] Yorum sistemi
- [ ] Arama özelliği
- [ ] Kategori sistemi
- [ ] RSS feed
- [ ] SEO optimizasyonları

## Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Lucide React** - İkonlar
- **React Markdown** - Markdown rendering
- **date-fns** - Tarih formatlaması

## Destek

Herhangi bir sorunuz varsa benimle iletişime geçebilirsiniz!