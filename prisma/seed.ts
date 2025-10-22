import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@furniture-studio.com' },
    update: {},
    create: {
      email: 'admin@furniture-studio.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ Admin user created')

  // Create settings
  const settings = await prisma.settings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      email: 'info@furniture-studio.com',
      phone: '+7 (700) 123-45-67',
      whatsapp: '+77001234567',
      telegram: '@furniturestudio',
      address: 'Almaty, Kazakhstan',
      instagram: 'https://instagram.com/furniturestudio',
      facebook: 'https://facebook.com/furniturestudio',
      youtube: 'https://youtube.com/@furniturestudio',
      heroVideoUrl: '/videos/hero-video.mp4',
      heroTitleRu: 'Надёжная мебель на каждый день',
      heroTitleEn: 'Reliable Furniture for Everyday Use',
      heroSubtitleRu: 'Простая в сборке, отточенная до совершенства. Оптовые продажи от 5 единиц. Собственное производство.',
      heroSubtitleEn: 'Easy to assemble, perfected to excellence. Wholesale from 5 units. Own production.',
    },
  })
  console.log('✅ Settings created')

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        slug: 'rocking-chair-classic',
        nameRu: 'Кресло-качалка классическое',
        nameEn: 'Classic Rocking Chair',
        descriptionRu: 'Надёжное кресло-качалка из массива дуба с качественной обивкой. Простая в сборке конструкция. Идеально подходит для кафе, террас и домашних интерьеров. Минимальный заказ - 5 единиц.',
        descriptionEn: 'Reliable rocking chair made of solid oak with quality upholstery. Easy to assemble design. Perfect for cafes, terraces and home interiors. Minimum order - 5 units.',
        shortDescRu: 'Массив дуба, качественная обивка. Легко собирается',
        shortDescEn: 'Solid oak, quality upholstery. Easy to assemble',
        category: 'ROCKING_CHAIRS',
        materials: ['Oak', 'Fabric'],
        dimensions: '120 x 80 x 95 cm',
        weight: '15 kg',
        price: 500,
        currency: 'USD',
        images: ['/images/rocking-chair-1.jpg', '/images/rocking-chair-2.jpg', '/images/rocking-chair-3.jpg'],
        mainImage: '/images/rocking-chair-1.jpg',
        published: true,
        featured: true,
      },
    }),
    prisma.product.create({
      data: {
        slug: 'dining-chair-modern',
        nameRu: 'Обеденный стул Modern',
        nameEn: 'Modern Dining Chair',
        descriptionRu: 'Современный обеденный стул с металлическим каркасом и мягким сиденьем. Отлично подходит для ресторанов и кафе.',
        descriptionEn: 'Modern dining chair with metal frame and soft seat. Perfect for restaurants and cafes.',
        shortDescRu: 'Металл + экокожа',
        shortDescEn: 'Metal + eco-leather',
        category: 'CHAIRS',
        materials: ['Metal', 'Fabric'],
        dimensions: '45 x 50 x 85 cm',
        weight: '6 kg',
        price: 150,
        currency: 'USD',
        images: ['/images/chair-modern-1.jpg'],
        mainImage: '/images/chair-modern-1.jpg',
        published: true,
        featured: false,
      },
    }),
    prisma.product.create({
      data: {
        slug: 'office-table-oak',
        nameRu: 'Офисный стол Oak',
        nameEn: 'Oak Office Table',
        descriptionRu: 'Массивный офисный стол из дуба с металлическими ножками. Идеален для современных офисов.',
        descriptionEn: 'Solid oak office table with metal legs. Ideal for modern offices.',
        shortDescRu: 'Дуб + металл',
        shortDescEn: 'Oak + metal',
        category: 'TABLES',
        materials: ['Oak', 'Metal'],
        dimensions: '180 x 80 x 75 cm',
        weight: '45 kg',
        price: 800,
        currency: 'USD',
        images: ['/images/table-oak-1.jpg'],
        mainImage: '/images/table-oak-1.jpg',
        published: true,
        featured: true,
      },
    }),
    prisma.product.create({
      data: {
        slug: 'bookshelf-industrial',
        nameRu: 'Стеллаж Industrial',
        nameEn: 'Industrial Bookshelf',
        descriptionRu: 'Стеллаж в индустриальном стиле из массива дерева и металла.',
        descriptionEn: 'Industrial style bookshelf made of solid wood and metal.',
        shortDescRu: 'Сосна + металл',
        shortDescEn: 'Pine + metal',
        category: 'SHELVES',
        materials: ['Pine', 'Metal'],
        dimensions: '200 x 40 x 180 cm',
        weight: '35 kg',
        price: 600,
        currency: 'USD',
        images: ['/images/shelf-industrial-1.jpg'],
        mainImage: '/images/shelf-industrial-1.jpg',
        published: true,
        featured: false,
      },
    }),
    prisma.product.create({
      data: {
        slug: 'custom-bar-counter',
        nameRu: 'Барная стойка (на заказ)',
        nameEn: 'Custom Bar Counter',
        descriptionRu: 'Изготовим барную стойку по вашим размерам и дизайну.',
        descriptionEn: "We'll make a bar counter according to your size and design.",
        shortDescRu: 'Индивидуальный проект',
        shortDescEn: 'Custom project',
        category: 'OTHER',
        materials: ['Oak', 'Metal'],
        priceOnRequest: true,
        images: ['/images/bar-counter-1.jpg'],
        mainImage: '/images/bar-counter-1.jpg',
        published: true,
        featured: false,
      },
    }),
  ])
  console.log('✅ Products created:', products.length)

  // Create portfolio projects
  const portfolio = await Promise.all([
    prisma.portfolio.create({
      data: {
        slug: 'cafe-cozy-almaty',
        titleRu: "Кафе 'Уют', Алматы",
        titleEn: "Cafe 'Cozy', Almaty",
        descriptionRu: 'Полная меблировка кафе на 50 мест с индивидуальным дизайном',
        descriptionEn: 'Complete furnishing of a 50-seat cafe with individual design',
        clientName: "Cafe 'Cozy'",
        location: 'Almaty, Kazakhstan',
        problemRu: 'Клиент открывал кафе и искал уникальную мебель, которая создаст уютную атмосферу и выделит заведение среди конкурентов.',
        problemEn: 'The client was opening a cafe and was looking for unique furniture that would create a cozy atmosphere and distinguish the establishment among competitors.',
        solutionRu: 'Разработали концепцию в скандинавском стиле с элементами лофта. Изготовили 20 кресел-качалок, 10 обеденных столов и барную стойку.',
        solutionEn: 'We developed a concept in Scandinavian style with loft elements. Made 20 rocking chairs, 10 dining tables and a bar counter.',
        resultRu: 'Кафе стало одним из самых популярных в районе. Гости часто делают фото интерьера и отмечают необычную мебель.',
        resultEn: 'The cafe has become one of the most popular in the area. Guests often take photos of the interior and note the unusual furniture.',
        images: ['/images/portfolio-cafe-1.jpg', '/images/portfolio-cafe-2.jpg', '/images/portfolio-cafe-3.jpg'],
        coverImage: '/images/portfolio-cafe-1.jpg',
        category: 'cafe',
        completedAt: new Date('2024-06-15'),
        published: true,
        featured: true,
      },
    }),
    prisma.portfolio.create({
      data: {
        slug: 'office-tech-company',
        titleRu: 'Офис IT-компании',
        titleEn: 'Tech Company Office',
        descriptionRu: 'Столы и стеллажи для open space офиса на 30 сотрудников',
        descriptionEn: 'Tables and shelves for open space office for 30 employees',
        clientName: 'TechCorp',
        location: 'Almaty, Kazakhstan',
        problemRu: 'Нужна была функциональная мебель для open space, которая бы соответствовала корпоративному стилю.',
        problemEn: 'Functional furniture was needed for open space that would match the corporate style.',
        solutionRu: 'Создали модульную систему столов и стеллажей, которую можно легко трансформировать под разные задачи.',
        solutionEn: 'Created a modular system of tables and shelves that can be easily transformed for different tasks.',
        resultRu: 'Сотрудники отметили удобство рабочих мест. Мебель прослужила год без нареканий.',
        resultEn: 'Employees noted the convenience of workplaces. The furniture served for a year without complaints.',
        images: ['/images/portfolio-office-1.jpg', '/images/portfolio-office-2.jpg'],
        coverImage: '/images/portfolio-office-1.jpg',
        category: 'office',
        completedAt: new Date('2024-08-20'),
        published: true,
        featured: false,
      },
    }),
    prisma.portfolio.create({
      data: {
        slug: 'restaurant-terrace',
        titleRu: 'Терраса ресторана',
        titleEn: 'Restaurant Terrace',
        descriptionRu: 'Надёжная уличная мебель для летней террасы',
        descriptionEn: 'Reliable outdoor furniture for summer terrace',
        clientName: 'Restaurant Garden',
        location: 'Almaty, Kazakhstan',
        problemRu: 'Требовалась уличная мебель, устойчивая к погодным условиям, но при этом стильная.',
        problemEn: 'Outdoor furniture was required that is resistant to weather conditions, but at the same time stylish.',
        solutionRu: 'Использовали специально обработанную древесину и влагостойкую обивку. Разработали уникальный дизайн.',
        solutionEn: 'We used specially treated wood and moisture-resistant upholstery. Developed a unique design.',
        resultRu: 'Мебель отлично выдержала летний сезон. Терраса стала самым популярным местом в ресторане.',
        resultEn: 'The furniture withstood the summer season well. The terrace became the most popular place in the restaurant.',
        images: ['/images/portfolio-terrace-1.jpg', '/images/portfolio-terrace-2.jpg'],
        coverImage: '/images/portfolio-terrace-1.jpg',
        category: 'cafe',
        completedAt: new Date('2024-05-10'),
        published: true,
        featured: true,
      },
    }),
  ])
  console.log('✅ Portfolio projects created:', portfolio.length)

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: 'Алексей Петров',
        position: 'Владелец',
        company: "Кафе 'Уют'",
        avatar: '/images/avatar-1.jpg',
        textRu: 'Отличная работа! Мебель сделали точно в срок, качество на высоте. Гости постоянно спрашивают где заказывали.',
        textEn: 'Excellent work! Furniture was delivered on time, quality is top-notch. Guests constantly ask where we ordered from.',
        rating: 5,
        published: true,
        featured: true,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Мария Иванова',
        position: 'Дизайнер интерьеров',
        company: 'Design Studio',
        avatar: '/images/avatar-2.jpg',
        textRu: 'Работаем с этой студией уже год. Всегда довольны результатом. 3D-визуализация помогает клиентам принять решение.',
        textEn: "We've been working with this studio for a year now. Always satisfied with the result. 3D visualization helps clients make decisions.",
        rating: 5,
        published: true,
        featured: true,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Дмитрий Смирнов',
        position: 'Директор',
        company: 'TechCorp',
        avatar: '/images/avatar-3.jpg',
        textRu: 'Заказывали мебель для офиса. Стильно, качественно, функционально. Рекомендую!',
        textEn: 'Ordered furniture for the office. Stylish, high-quality, functional. Highly recommend!',
        rating: 5,
        published: true,
        featured: false,
      },
    }),
  ])
  console.log('✅ Testimonials created:', testimonials.length)

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

