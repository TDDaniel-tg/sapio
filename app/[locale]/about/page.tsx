import Image from "next/image"
import { Factory, Palette, Truck, Award } from "lucide-react"

interface AboutPageProps {
  params: {
    locale: string
  }
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = params
  const isRu = locale === "ru"

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <section className="relative h-[50vh] mb-16">
        <Image
          src="/images/about-hero.jpg"
          alt="About Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {isRu ? "О нашей студии" : "About Our Studio"}
            </h1>
            <p className="text-xl">
              {isRu 
                ? "2 года создаём уникальную мебель для бизнеса"
                : "2 years creating unique furniture for business"}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isRu ? "Наша история" : "Our Story"}
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                {isRu
                  ? "Мы начали наш путь в 2023 году с простой идеи: создавать качественную мебель для бизнеса, которая будет радовать владельцев и их клиентов. Сегодня мы — команда профессионалов, которая реализовала более 50 проектов."
                  : "We started our journey in 2023 with a simple idea: to create quality furniture for businesses that will delight owners and their clients. Today we are a team of professionals who have completed over 50 projects."}
              </p>
              <p>
                {isRu
                  ? "Наша миссия — делать мебель, которая не только выполняет свои функции, но и создаёт атмосферу, формирует образ бренда и остаётся актуальной долгие годы."
                  : "Our mission is to make furniture that not only performs its functions, but also creates an atmosphere, shapes brand image and remains relevant for years to come."}
              </p>
              <p>
                {isRu
                  ? "Мы гордимся своей работой и каждым проектом. От первой встречи до финальной сборки — мы вовлечены на 100%."
                  : "We are proud of our work and every project. From first meeting to final assembly - we are 100% involved."}
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {isRu ? "Что мы умеем" : "What We Do"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/3d-modeling.jpg"
                  alt="3D Modeling"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isRu ? "3D-моделирование" : "3D Modeling"}
              </h3>
              <p className="text-muted-foreground">
                {isRu
                  ? "Создаём реалистичные визуализации перед производством"
                  : "Create realistic visualizations before production"}
              </p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/production.jpg"
                  alt="Production"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isRu ? "Производство" : "Production"}
              </h3>
              <p className="text-muted-foreground">
                {isRu
                  ? "Собственный цех с профессиональным оборудованием"
                  : "Own workshop with professional equipment"}
              </p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/delivery.jpg"
                  alt="Delivery"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isRu ? "Логистика" : "Logistics"}
              </h3>
              <p className="text-muted-foreground">
                {isRu
                  ? "Доставка и сборка в любую точку СНГ и Европы"
                  : "Delivery and assembly anywhere in CIS and Europe"}
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {isRu ? "Наши ценности" : "Our Values"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: isRu ? "Качество" : "Quality",
                description: isRu
                  ? "Используем только лучшие материалы и проверенные технологии"
                  : "We use only the best materials and proven technologies",
              },
              {
                icon: Palette,
                title: isRu ? "Инновации" : "Innovation",
                description: isRu
                  ? "Следим за трендами и внедряем новые решения"
                  : "We follow trends and implement new solutions",
              },
              {
                icon: Truck,
                title: isRu ? "Сервис" : "Service",
                description: isRu
                  ? "Полное сопровождение от заявки до доставки"
                  : "Full support from request to delivery",
              },
              {
                icon: Factory,
                title: isRu ? "Честность" : "Honesty",
                description: isRu
                  ? "Прозрачные цены и реальные сроки"
                  : "Transparent prices and realistic timelines",
              },
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="p-6 bg-muted/30 rounded-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Geography */}
        <section className="mb-20 bg-muted/30 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {isRu ? "География работы" : "Our Geography"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/map.jpg"
                  alt="Map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                {isRu
                  ? "Мы работаем с клиентами по всему миру:"
                  : "We work with clients worldwide:"}
              </p>
              <ul className="space-y-2 text-lg">
                <li>🇰🇿 {isRu ? "Казахстан" : "Kazakhstan"}</li>
                <li>🇷🇺 {isRu ? "Россия" : "Russia"}</li>
                <li>🇺🇦 {isRu ? "Украина" : "Ukraine"}</li>
                <li>🇬🇪 {isRu ? "Грузия" : "Georgia"}</li>
                <li>🇪🇺 {isRu ? "Страны Европы" : "European Countries"}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {isRu ? "Наша команда" : "Our Team"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: isRu ? "Иван Петров" : "Ivan Petrov",
                position: isRu ? "Основатель, дизайнер" : "Founder, Designer",
                avatar: "/images/team-1.jpg",
              },
              {
                name: isRu ? "Мария Сидорова" : "Maria Sidorova",
                position: isRu ? "Менеджер проектов" : "Project Manager",
                avatar: "/images/team-2.jpg",
              },
              {
                name: isRu ? "Алексей Козлов" : "Alexey Kozlov",
                position: isRu ? "Мастер производства" : "Production Master",
                avatar: "/images/team-3.jpg",
              },
              {
                name: isRu ? "Анна Волкова" : "Anna Volkova",
                position: isRu ? "3D-дизайнер" : "3D Designer",
                avatar: "/images/team-4.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.position}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

