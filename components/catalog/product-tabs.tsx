"use client"

import { Product } from "@prisma/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductTabsProps {
  product: Product
  locale: string
}

export function ProductTabs({ product, locale }: ProductTabsProps) {
  const description = locale === "ru" ? product.descriptionRu : product.descriptionEn

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="description">
          {locale === "ru" ? "Описание" : "Description"}
        </TabsTrigger>
        <TabsTrigger value="specs">
          {locale === "ru" ? "Характеристики" : "Specifications"}
        </TabsTrigger>
        <TabsTrigger value="delivery">
          {locale === "ru" ? "Доставка" : "Delivery"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="prose max-w-none mt-6">
        <div className="text-muted-foreground whitespace-pre-wrap">
          {description}
        </div>
      </TabsContent>

      <TabsContent value="specs" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="font-semibold mb-2">
              {locale === "ru" ? "Основные характеристики" : "Main Specifications"}
            </div>
            <dl className="space-y-2">
              {product.dimensions && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    {locale === "ru" ? "Размеры:" : "Dimensions:"}
                  </dt>
                  <dd className="font-medium">{product.dimensions}</dd>
                </div>
              )}
              {product.weight && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    {locale === "ru" ? "Вес:" : "Weight:"}
                  </dt>
                  <dd className="font-medium">{product.weight}</dd>
                </div>
              )}
              {product.materials.length > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    {locale === "ru" ? "Материалы:" : "Materials:"}
                  </dt>
                  <dd className="font-medium">{product.materials.join(", ")}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="delivery" className="mt-6">
        <div className="prose max-w-none text-muted-foreground">
          {locale === "ru" ? (
            <>
              <h3 className="text-foreground">Доставка и сборка</h3>
              <p>Мы доставляем мебель по всему СНГ и в Европу. Срок доставки зависит от региона:</p>
              <ul>
                <li>Алматы и область: 2-3 дня</li>
                <li>Казахстан: 3-7 дней</li>
                <li>Россия: 5-10 дней</li>
                <li>Европа: 10-14 дней</li>
              </ul>
              <p>Сборка мебели на месте оплачивается дополнительно. Также мы можем отправить детали для самостоятельной сборки.</p>
            </>
          ) : (
            <>
              <h3 className="text-foreground">Delivery and Assembly</h3>
              <p>We deliver furniture throughout CIS and Europe. Delivery time depends on region:</p>
              <ul>
                <li>Almaty and region: 2-3 days</li>
                <li>Kazakhstan: 3-7 days</li>
                <li>Russia: 5-10 days</li>
                <li>Europe: 10-14 days</li>
              </ul>
              <p>On-site assembly is paid separately. We can also send parts for self-assembly.</p>
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

