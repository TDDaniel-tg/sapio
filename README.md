# 🪑 Furniture Studio - Premium B2B Website

Премиум B2B сайт мебельной студии с каталогом товаров, портфолио, админ-панелью и поддержкой двух языков (RU/EN).

## 🚀 Технологии

- **Next.js 14** (App Router, TypeScript)
- **PostgreSQL** + **Prisma ORM**
- **NextAuth.js v5** (аутентификация)
- **Tailwind CSS** + **Shadcn/ui**
- **Framer Motion** (анимации)
- **next-intl** (RU/EN локализация)
- **React Hook Form** + **Zod**

## 📦 Установка

### 1. Клонируйте репозиторий
```bash
git clone <repository-url>
cd furniture-studio
```

### 2. Установите зависимости
```bash
npm install --ignore-scripts
```

### 3. Настройте переменные окружения
Создайте файл `.env` в корне проекта:

```bash
# Database (Railway PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl"

# Cloudinary (для загрузки изображений в админке)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

**⚙️ Настройка Cloudinary:**
1. Зарегистрируйтесь на https://cloudinary.com (бесплатно)
2. Перейдите: **Settings** → **Upload** → **Add upload preset**
3. Создайте preset:
   - Preset name: `furniture_studio`
   - Signing Mode: `Unsigned`
   - Folder: `furniture-studio` (опционально)
4. Скопируйте **Cloud Name** из Dashboard
5. Вставьте в `.env` как `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

Теперь в админке можно загружать фото кнопкой **Upload Image**!

### 4. Инициализируйте базу данных
```bash
# Сгенерируйте Prisma Client
node node_modules/prisma/build/index.js generate

# Создайте таблицы
node node_modules/prisma/build/index.js db push

# Заполните тестовыми данными
node node_modules/tsx/dist/cli.mjs prisma/seed.ts
```

### 5. Запустите проект
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 🔐 Админ-панель

После выполнения seed скрипта будет создан администратор:

- **URL:** http://localhost:3000/admin/login
- **Email:** `admin@furniture-studio.com`
- **Пароль:** `admin123`

**⚠️ ВАЖНО:** Измените пароль после первого входа!

### Функционал админки:
- ✅ **Dashboard** - Статистика и последние заявки
- ✅ **Products** - CRUD для товаров (создание, редактирование, удаление)
- ✅ **Portfolio** - CRUD для проектов портфолио
- ✅ **Orders** - Просмотр всех заявок от клиентов
- ✅ **Settings** - Настройки сайта (контакты, соцсети, Hero секция)

## 📁 Структура проекта

```
furniture-studio/
├── app/
│   ├── [locale]/          # Страницы с локализацией (RU/EN)
│   │   ├── page.tsx       # Главная страница
│   │   ├── catalog/       # Каталог товаров
│   │   ├── portfolio/     # Портфолио проектов
│   │   ├── about/         # О компании
│   │   ├── process/       # Процесс работы
│   │   └── contact/       # Контакты
│   ├── admin/             # Админ-панель
│   └── api/               # API маршруты
├── components/
│   ├── ui/                # Базовые UI компоненты (Shadcn)
│   ├── home/              # Компоненты главной страницы
│   ├── catalog/           # Компоненты каталога
│   ├── portfolio/         # Компоненты портфолио
│   └── shared/            # Общие компоненты (Header, Footer)
├── lib/
│   ├── prisma.ts          # Prisma client
│   ├── auth.ts            # NextAuth конфигурация
│   ├── utils.ts           # Утилиты
│   └── validations/       # Схемы валидации Zod
├── messages/
│   ├── ru.json            # Русские переводы
│   └── en.json            # Английские переводы
├── prisma/
│   ├── schema.prisma      # База данных схема
│   └── seed.ts            # Тестовые данные
└── public/                # Статические файлы
```

## 🎨 Основные функции

### Для посетителей:
- ✅ Главная страница с 9 секциями
- ✅ Каталог товаров с фильтрами
- ✅ Детальные страницы товаров
- ✅ Портфолио проектов
- ✅ Форма обратной связи
- ✅ Переключение языка (RU/EN)
- ✅ Темная/светлая тема
- ✅ Адаптивный дизайн

### Для администраторов:
- ✅ Управление товарами (CRUD)
- ✅ Управление портфолио (CRUD)
- ✅ Просмотр заявок
- ✅ Настройки сайта

## 🗄️ База данных

Проект использует PostgreSQL через Prisma ORM. Основные модели:

- **User** - Пользователи/администраторы
- **Product** - Товары каталога
- **Portfolio** - Проекты портфолио
- **Order** - Заявки от клиентов
- **Testimonial** - Отзывы клиентов
- **Settings** - Настройки сайта

Для просмотра и редактирования базы данных:
```bash
npx prisma studio
```

## 🌍 Локализация

Сайт поддерживает два языка: русский (ru) и английский (en).

Переводы находятся в:
- `messages/ru.json`
- `messages/en.json`

Для добавления новых переводов:
1. Добавьте ключ в оба файла
2. Используйте `useTranslations()` в компонентах

```tsx
import { useTranslations } from 'next-intl'

export function Component() {
  const t = useTranslations('namespace')
  return <div>{t('key')}</div>
}
```

## 🎭 Компоненты

Проект использует компоненты из [Shadcn/ui](https://ui.shadcn.com/):
- Button, Input, Textarea
- Card, Dialog, Select
- Tabs, Switch, Toast
- и другие...

Для добавления новых компонентов:
```bash
npx shadcn-ui@latest add <component-name>
```

## 📝 Скрипты

```bash
# Разработка
node node_modules/next/dist/bin/next dev

# Сборка для продакшена
npm run build

# Запуск продакшен сборки
npm run start

# Обновление базы данных
node node_modules/prisma/build/index.js db push

# Генерация Prisma Client
node node_modules/prisma/build/index.js generate

# Заполнение БД тестовыми данными
node node_modules/tsx/dist/cli.mjs prisma/seed.ts

# Просмотр базы данных
node node_modules/prisma/build/index.js studio
```

**⚠️ Примечание:** Используйте `node` напрямую вместо `npm` из-за конфликтов с Java в системе.

## 🚀 Деплой

### Railway (рекомендуется)

1. Создайте аккаунт на [Railway.app](https://railway.app)
2. Создайте PostgreSQL базу данных
3. Создайте новый проект и подключите GitHub
4. Добавьте переменные окружения
5. Railway автоматически соберет и задеплоит проект

### Vercel

1. Загрузите проект на GitHub
2. Импортируйте в [Vercel](https://vercel.com)
3. Добавьте переменные окружения
4. Подключите PostgreSQL базу (Railway/Supabase)
5. Деплой!

## 📸 Изображения

Создайте папки `public/images/` и `public/videos/` и добавьте:

### Видео:
- `public/videos/hero-video.mp4` - Фоновое видео для Hero секции

### Изображения (public/images/):

**Товары:**
- `rocking-chair-1.jpg`, `rocking-chair-2.jpg`, `rocking-chair-3.jpg`
- `chair-modern-1.jpg`, `table-oak-1.jpg`
- `shelf-industrial-1.jpg`, `bar-counter-1.jpg`
- `rocking-chair-featured.jpg`

**Категории:**
- `category-rocking-chairs.jpg`, `category-chairs.jpg`
- `category-tables.jpg`, `category-shelves.jpg`, `category-other.jpg`

**Портфолио:**
- `portfolio-cafe-1.jpg`, `portfolio-cafe-2.jpg`, `portfolio-cafe-3.jpg`
- `portfolio-office-1.jpg`, `portfolio-office-2.jpg`
- `portfolio-terrace-1.jpg`, `portfolio-terrace-2.jpg`
- `portfolio-cafe-cozy.jpg`, `portfolio-office.jpg`, `portfolio-terrace.jpg`

**О компании:**
- `about-hero.jpg`, `3d-modeling.jpg`, `production.jpg`, `delivery.jpg`
- `map.jpg`, `team-1.jpg`, `team-2.jpg`, `team-3.jpg`, `team-4.jpg`

**Отзывы:**
- `avatar-1.jpg`, `avatar-2.jpg`, `avatar-3.jpg`

**Плейсхолдеры:**
- `placeholder-product.jpg`, `placeholder-portfolio.jpg`

**Быстрое решение:** 
- Загружайте изображения через админку (кнопка Upload в формах) - они автоматически сохранятся в Cloudinary
- Или используйте https://unsplash.com для красивых фото
- Для плейсхолдеров: https://placehold.co/800x600

## 🎨 Кастомизация

### Цвета
Измените цвета в `app/globals.css`:

```css
:root {
  --primary: 27 50% 50%;    /* Основной цвет */
  --accent: 45 100% 51%;    /* Акцентный цвет */
}
```

### Шрифты
Измените шрифты в `app/[locale]/layout.tsx`:

```tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin', 'cyrillic'] })
```

## 🔧 Troubleshooting

### Ошибка подключения к БД
```bash
# Проверьте DATABASE_URL в .env
# Убедитесь что PostgreSQL запущен
npx prisma db push
```

### Ошибки TypeScript
```bash
# Очистите кэш и пересоберите
rm -rf .next
npm run build
```

### Проблемы с зависимостями
```bash
# Удалите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install
```

## 📄 Лицензия

MIT License - используйте свободно в коммерческих и некоммерческих проектах.

## 🤝 Контакты

Если у вас есть вопросы или предложения:
- Email: info@furniture-studio.com
- Website: https://furniture-studio.com

---

Сделано с ❤️ для мебельного бизнеса

