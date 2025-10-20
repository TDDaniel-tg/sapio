import { MessageSquare, Phone, FileText, Palette, FileCheck, Factory, CheckCircle, Truck, Shield } from "lucide-react"

interface ProcessPageProps {
  params: {
    locale: string
  }
}

export default function ProcessPage({ params }: ProcessPageProps) {
  const { locale } = params
  const isRu = locale === "ru"

  const steps = [
    {
      icon: MessageSquare,
      title: isRu ? "Заявка" : "Request",
      description: isRu
        ? "Оставляете заявку на сайте, в WhatsApp или звоните. Мы отвечаем за 1 час в рабочее время"
        : "You submit a request on the website, WhatsApp, or call. We respond within 1 hour during business hours",
      requirements: isRu
        ? "Что нужно от клиента: Имя, контакт, описание задачи"
        : "What we need: Name, contact, task description",
    },
    {
      icon: Phone,
      title: isRu ? "Обсуждение" : "Discussion",
      description: isRu
        ? "Созваниваемся, обсуждаем детали: что нужно, сроки, бюджет, материалы"
        : "We call, discuss details: what you need, timeline, budget, materials",
      duration: isRu ? "Срок: 1 день" : "Duration: 1 day",
    },
    {
      icon: FileText,
      title: isRu ? "Коммерческое предложение" : "Commercial Proposal",
      description: isRu
        ? "Отправляем КП с ценой, сроками, вариантами"
        : "We send a proposal with price, timeline, options",
      duration: isRu ? "Срок: 1-2 дня" : "Duration: 1-2 days",
    },
    {
      icon: Palette,
      title: isRu ? "3D-проект (если нужно)" : "3D Project (if needed)",
      description: isRu
        ? "Создаём 3D-визуализацию. Вы видите как будет выглядеть мебель ДО производства. Можем внести правки"
        : "We create 3D visualization. You see how the furniture will look BEFORE production. We can make adjustments",
      duration: isRu ? "Срок: 2-3 дня" : "Duration: 2-3 days",
      cost: isRu ? "Стоимость: бесплатно при заказе" : "Cost: free with order",
    },
    {
      icon: FileCheck,
      title: isRu ? "Договор + предоплата" : "Contract + Prepayment",
      description: isRu
        ? "Подписываем договор (онлайн), вы вносите предоплату (50%)"
        : "We sign a contract (online), you make a prepayment (50%)",
      duration: isRu ? "Срок: 1 день" : "Duration: 1 day",
    },
    {
      icon: Factory,
      title: isRu ? "Производство" : "Production",
      description: isRu
        ? "Изготавливаем мебель на нашем производстве. Отправляем фото процесса"
        : "We manufacture furniture in our workshop. We send photos of the process",
      duration: isRu ? "Срок: 10-14 дней" : "Duration: 10-14 days",
    },
    {
      icon: CheckCircle,
      title: isRu ? "Контроль качества" : "Quality Control",
      description: isRu
        ? "Проверяем каждую деталь перед отправкой"
        : "We check every detail before shipping",
      duration: isRu ? "Срок: 1 день" : "Duration: 1 day",
    },
    {
      icon: Truck,
      title: isRu ? "Доставка" : "Delivery",
      description: isRu
        ? "Доставляем курьером или транспортной компанией. Собираем на месте (если нужно) или отправляем готовые для сборки детали"
        : "Delivery by courier or transport company. We assemble on site (if needed) or send ready-to-assemble parts",
      duration: isRu ? "Срок: 2-7 дней (зависит от региона)" : "Duration: 2-7 days (depends on region)",
    },
    {
      icon: Shield,
      title: isRu ? "Оплата и гарантия" : "Payment and Warranty",
      description: isRu
        ? "Оплачиваете остаток после получения. Гарантия 2 года"
        : "You pay the balance after receipt. 2-year warranty",
    },
  ]

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRu ? "Процесс работы" : "How We Work"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isRu ? "От заявки до доставки - 14 дней" : "From request to delivery - 14 days"}
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative flex gap-6 pb-12">
                {/* Timeline line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-border" />
                )}

                {/* Number & Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-center text-sm font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 pb-8">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {step.duration && (
                      <div className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">
                        {step.duration}
                      </div>
                    )}
                    {step.cost && (
                      <div className="px-3 py-1 bg-accent/10 rounded-full text-accent-foreground font-medium">
                        {step.cost}
                      </div>
                    )}
                    {step.requirements && (
                      <div className="text-muted-foreground">{step.requirements}</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cooperation Options */}
        <section className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isRu ? "Варианты сотрудничества" : "Cooperation Options"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: isRu ? "Купить готовое изделие" : "Buy ready-made product",
                description: isRu ? "Быстро и удобно" : "Fast and convenient",
              },
              {
                title: isRu ? "Заказать кастомный проект" : "Order custom project",
                description: isRu ? "Уникально под ваш бизнес" : "Unique for your business",
              },
              {
                title: isRu ? "Заказать только 3D-дизайн" : "Order only 3D design",
                description: isRu
                  ? "Для производства у себя"
                  : "For your own production",
              },
              {
                title: isRu ? "Купить детали для самостоятельной сборки" : "Buy parts for self-assembly",
                description: isRu ? "Дешевле с доставкой" : "Cheaper with delivery",
              },
            ].map((option, index) => (
              <div key={index} className="p-6 bg-background rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

