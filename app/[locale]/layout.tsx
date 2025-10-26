import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { TranslationsProvider } from "@/components/shared/translations-provider";
import { Preloader } from "@/components/shared/preloader";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  
  if (!["ru", "en"].includes(locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Preloader />
        <TranslationsProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header locale={locale} />
            <main className="min-h-screen">{children}</main>
            <Footer locale={locale} />
            <Toaster />
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}

