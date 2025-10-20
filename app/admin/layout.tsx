import { Inter } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Package, FileText, ShoppingCart, Settings } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-card border-r flex-shrink-0">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            <nav className="space-y-1 p-3">
              <Link href="/admin/dashboard">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Package className="h-4 w-4" />
                  Products
                </Button>
              </Link>
              <Link href="/admin/portfolio">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  Portfolio
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <div className="pt-4 border-t mt-4">
                <Link href="/ru">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Home className="h-4 w-4" />
                    Back to Site
                  </Button>
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
