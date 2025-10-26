# Медиафайлы проекта

Эта папка содержит все статические медиафайлы (изображения и видео) для сайта мебельной студии.

## Структура папок

```
public/
├── images/
│   ├── products/       # Изображения продуктов (мебель)
│   │   └── Примеры: диваны, столы, стулья, шкафы и т.д.
│   │
│   ├── portfolio/      # Портфолио (фото выполненных проектов)
│   │   └── Примеры: интерьеры, завершенные заказы
│   │
│   ├── hero/           # Главные баннеры для героев секции
│   │   └── Примеры: hero-main.jpg, hero-about.jpg
│   │
│   ├── categories/     # Изображения категорий товаров
│   │   └── Примеры: category-sofas.jpg, category-chairs.jpg
│   │
│   ├── testimonials/   # Фотографии клиентов (отзывы)
│   │   └── Примеры: client-1.jpg, client-2.jpg
│   │
│   └── general/        # Общие изображения (логотипы, иконки)
│       └── Примеры: logo.png, icon.svg, about-us.jpg
│
└── videos/             # Видеофайлы
    └── Примеры: promo.mp4, production-process.mp4
```

## Как использовать в коде

Файлы из папки `public` доступны напрямую по корневому URL:

### Примеры использования в Next.js:

```tsx
// Изображение продукта
<Image 
  src="/images/products/sofa-1.jpg" 
  alt="Диван" 
  width={600} 
  height={400} 
/>

// Главный баннер
<Image 
  src="/images/hero/main-banner.jpg" 
  alt="Главный баннер" 
  width={1920} 
  height={1080} 
/>

// Видео
<video src="/videos/promo.mp4" controls />

// С использованием next/image для оптимизации
import Image from 'next/image';

<Image 
  src="/images/portfolio/project-1.jpg"
  alt="Проект 1"
  width={800}
  height={600}
  quality={85}
  loading="lazy"
/>
```

## Рекомендации по файлам

### Изображения:
- **Формат**: JPG/JPEG для фотографий, PNG для изображений с прозрачностью, WebP для лучшей оптимизации
- **Размер продуктов**: 800x600px - 1200x900px
- **Размер героев**: 1920x1080px (Full HD)
- **Размер портфолио**: 1200x800px
- **Оптимизация**: Сжимайте изображения перед загрузкой (TinyPNG, ImageOptim)

### Видео:
- **Формат**: MP4 (H.264)
- **Размер**: Не более 50MB для веб-версии
- **Разрешение**: 1080p или 720p для оптимальной загрузки

## Примеры названий файлов

```
images/products/sofa-brown-leather-01.jpg
images/products/chair-office-ergonomic-02.jpg
images/portfolio/living-room-modern-2024-01.jpg
images/hero/main-banner-autumn.jpg
images/categories/category-sofas.jpg
images/testimonials/client-ivan-petrov.jpg
videos/company-presentation.mp4
videos/production-process.mp4
```

## Важно

- Используйте **понятные имена файлов** (латиницей)
- Добавляйте **alt текст** для SEO и доступности
- **Оптимизируйте** файлы перед загрузкой
- Для динамических изображений используйте **Cloudinary** (настроено в проекте)


