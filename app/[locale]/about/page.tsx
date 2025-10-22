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
              {isRu ? "О нашем производстве" : "About Our Production"}
            </h1>
            <p className="text-xl">
              {isRu 
                ? "2 года создаём надёжную мебель на каждый день"
                : "2 years creating reliable furniture for everyday use"}
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
                  ? "Мы начали наш путь в 2023 году с простой идеи: создавать надёжную и качественную мебель на каждый день по справедливой цене. Мы не гонимся за премиум-статусом — мы делаем мебель, которая просто работает."
                  : "We started our journey in 2023 with a simple idea: to create reliable and quality furniture for everyday use at a fair price. We don't chase premium status - we make furniture that simply works."}
              </p>
              <p>
                {isRu
                  ? "Наша философия — простота и надёжность. Мы отточили каждую деталь до совершенства: продуманная конструкция, легкая сборка, проверенные материалы. Никаких излишеств, только то, что нужно."
                  : "Our philosophy is simplicity and reliability. We've perfected every detail: thoughtful design, easy assembly, proven materials. No frills, just what you need."}
              </p>
              <p>
                {isRu
                  ? "Мы работаем только оптом (от 5 единиц), что позволяет нам предлагать честные цены для бизнеса. Более 50 компаний уже выбрали нашу мебель для своих кафе, офисов и магазинов."
                  : "We work wholesale only (from 5 units), which allows us to offer fair prices for businesses. Over 50 companies have already chosen our furniture for their cafes, offices and stores."}
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
                {isRu ? "Простая сборка" : "Easy Assembly"}
              </h3>
              <p className="text-muted-foreground">
                {isRu
                  ? "Продуманная конструкция — легко собрать самостоятельно за 10-15 минут"
                  : "Thoughtful design - easy to assemble yourself in 10-15 minutes"}
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
                  ? "Контроль качества на каждом этапе производства"
                  : "Quality control at every stage of production"}
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
                {isRu ? "Оптовые продажи" : "Wholesale Sales"}
              </h3>
              <p className="text-muted-foreground">
                {isRu
                  ? "Минимальный заказ от 5 единиц. Выгодные цены для бизнеса"
                  : "Minimum order from 5 units. Great prices for business"}
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
                title: isRu ? "Надёжность" : "Reliability",
                description: isRu
                  ? "Проверенные материалы и технологии. Мебель, которая служит годами"
                  : "Proven materials and technologies. Furniture that lasts for years",
              },
              {
                icon: Palette,
                title: isRu ? "Простота" : "Simplicity",
                description: isRu
                  ? "Легкая сборка за 10-15 минут. Никаких сложных инструкций"
                  : "Easy assembly in 10-15 minutes. No complicated instructions",
              },
              {
                icon: Truck,
                title: isRu ? "Доступность" : "Affordability",
                description: isRu
                  ? "Честные оптовые цены без накруток. От 5 единиц"
                  : "Fair wholesale prices without markup. From 5 units",
              },
              {
                icon: Factory,
                title: isRu ? "Качество" : "Quality",
                description: isRu
                  ? "Контроль на каждом этапе производства. Собственный цех"
                  : "Control at every production stage. Own workshop",
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

