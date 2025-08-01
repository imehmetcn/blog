import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Varsayılan admin kullanıcısı oluştur
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin123', // Gerçek uygulamada hash'lenmiş olmalı
      email: 'admin@biomysticy.com'
    }
  })

  console.log('Admin kullanıcısı oluşturuldu:', admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })