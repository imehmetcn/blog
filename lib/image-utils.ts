// Resim yardımcı fonksiyonları

export const optimizeImage = (file: File, maxWidth: number = 600, maxHeight: number = 400, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Canvas context oluşturulamadı'))
          return
        }

        let { width, height } = img

        // Basit boyut küçültme
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        canvas.width = width
        canvas.height = height

        // Resmi çiz
        ctx.drawImage(img, 0, 0, width, height)

        // JPEG olarak kaydet
        const optimizedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(optimizedBase64)
      }

      img.onerror = () => {
        reject(new Error('Resim yüklenemedi'))
      }

      img.src = event.target?.result as string
    }

    reader.onerror = () => {
      reject(new Error('Dosya okunamadı'))
    }

    reader.readAsDataURL(file)
  })
}

export const validateImageFile = (file: File, maxSizeMB: number = 5): { isValid: boolean; error?: string } => {
  // Dosya tipi kontrolü
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'Lütfen sadece resim dosyası seçin!' }
  }

  // Dosya boyutu kontrolü
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { isValid: false, error: `Dosya boyutu ${maxSizeMB}MB'dan büyük olamaz!` }
  }

  // Desteklenen formatları kontrol et
  const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!supportedTypes.includes(file.type)) {
    return { isValid: false, error: 'Desteklenen formatlar: JPEG, PNG, WebP, GIF' }
  }

  return { isValid: true }
}

export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }

    img.onerror = () => {
      reject(new Error('Resim boyutları alınamadı'))
    }

    img.src = src
  })
}

export const isValidImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()

    // Timeout ekle - 10 saniye sonra false döndür
    const timeout = setTimeout(() => {
      resolve(false)
    }, 10000)

    img.onload = () => {
      clearTimeout(timeout)
      resolve(true)
    }

    img.onerror = () => {
      clearTimeout(timeout)
      resolve(false)
    }

    img.src = url
  })
}

// Resim boyutunu kontrol et ve gerekirse küçült
export const resizeImageIfNeeded = async (base64: string, maxWidth: number = 400, maxHeight: number = 300): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Canvas context oluşturulamadı'))
        return
      }

      let { width, height } = img

      // Eğer resim zaten küçükse, olduğu gibi döndür
      if (width <= maxWidth && height <= maxHeight && base64.length < 100000) {
        resolve(base64)
        return
      }

      // Oranı koru ve boyutu küçült
      const ratio = Math.min(maxWidth / width, maxHeight / height)
      width *= ratio
      height *= ratio

      canvas.width = Math.round(width)
      canvas.height = Math.round(height)

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, Math.round(width), Math.round(height))

      let resizedBase64 = canvas.toDataURL('image/jpeg', 0.6)

      // Hala çok büyükse daha da sıkıştır
      if (resizedBase64.length > 150000) {
        resizedBase64 = canvas.toDataURL('image/jpeg', 0.4)
      }

      resolve(resizedBase64)
    }

    img.onerror = () => {
      reject(new Error('Resim yüklenemedi'))
    }

    img.src = base64
  })
}

// Mevcut büyük resimleri optimize et
export const optimizeExistingImages = async (): Promise<void> => {
  if (typeof window === 'undefined') return

  const savedPosts = localStorage.getItem('blogPosts')
  if (!savedPosts) return

  const posts = JSON.parse(savedPosts)
  let hasChanges = false

  for (const post of posts) {
    // Banner resmi optimize et
    if (post.image && post.image.length > 200000) {
      try {
        post.image = await resizeImageIfNeeded(post.image, 600, 400)
        hasChanges = true
        console.log(`✅ Banner resmi optimize edildi: ${post.title}`)
      } catch (error) {
        console.error(`❌ Banner resmi optimize edilemedi: ${post.title}`, error)
      }
    }

    // İçerik resimlerini optimize et
    if (post.content && post.content.includes('data:image/')) {
      const imageMatches = post.content.match(/!\[.*?\]\(data:image\/[^)]+\)/g)
      if (imageMatches) {
        for (const match of imageMatches) {
          const base64Match = match.match(/data:image\/[^)]+/)
          if (base64Match && base64Match[0].length > 150000) {
            try {
              const optimizedImage = await resizeImageIfNeeded(base64Match[0], 400, 300)
              post.content = post.content.replace(base64Match[0], optimizedImage)
              hasChanges = true
              console.log(`✅ İçerik resmi optimize edildi: ${post.title}`)
            } catch (error) {
              console.error(`❌ İçerik resmi optimize edilemedi: ${post.title}`, error)
            }
          }
        }
      }
    }
  }

  if (hasChanges) {
    localStorage.setItem('blogPosts', JSON.stringify(posts))
    console.log('✅ Tüm resimler optimize edildi!')
  }
}