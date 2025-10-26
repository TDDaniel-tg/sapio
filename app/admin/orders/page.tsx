import { prisma } from "@/lib/prisma"
import { OrdersList } from "@/components/admin/orders-list"

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  })

  const stats = {
    total: orders.length,
    new: orders.filter(o => o.status === "NEW").length,
    inProgress: orders.filter(o => o.status === "IN_PROGRESS").length,
    completed: orders.filter(o => o.status === "COMPLETED").length,
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Customer inquiries and orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Orders</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-500">{stats.new}</div>
          <div className="text-sm text-muted-foreground">New</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-500">{stats.inProgress}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
      </div>

      <OrdersList initialOrders={orders} />
    </div>
  )
}


