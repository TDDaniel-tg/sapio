"use client"

import { useState } from "react"
import { Order } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Phone, Mail } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface OrdersListProps {
  initialOrders: Order[]
}

export function OrdersList({ initialOrders }: OrdersListProps) {
  const [orders, setOrders] = useState(initialOrders)
  const [filter, setFilter] = useState<string>("all")
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-500 hover:bg-blue-600"
      case "IN_PROGRESS":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "COMPLETED":
        return "bg-green-500 hover:bg-green-600"
      case "CANCELLED":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "PRODUCT":
        return "Product Order"
      case "CONSULTATION":
        return "Consultation"
      case "CUSTOM":
        return "Custom Project"
      case "DESIGN_ONLY":
        return "Design Only"
      default:
        return type
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        setOrders(orders.map(o => 
          o.id === orderId ? { ...o, status: newStatus as any } : o
        ))
        toast({ title: "Status updated successfully" })
      } else {
        throw new Error("Failed to update")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setOrders(orders.filter(o => o.id !== orderId))
        toast({ title: "Order deleted successfully" })
      } else {
        throw new Error("Failed to delete")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      })
    }
  }

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(o => o.status === filter)

  return (
    <>
      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="NEW">New ({orders.filter(o => o.status === "NEW").length})</TabsTrigger>
          <TabsTrigger value="IN_PROGRESS">In Progress ({orders.filter(o => o.status === "IN_PROGRESS").length})</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed ({orders.filter(o => o.status === "COMPLETED").length})</TabsTrigger>
          <TabsTrigger value="CANCELLED">Cancelled ({orders.filter(o => o.status === "CANCELLED").length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No orders found
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{order.name}</CardTitle>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <a href={`tel:${order.phone}`} className="flex items-center gap-1 hover:text-primary">
                        <Phone className="h-3 w-3" />
                        {order.phone}
                      </a>
                      {order.email && (
                        <a href={`mailto:${order.email}`} className="flex items-center gap-1 hover:text-primary">
                          <Mail className="h-3 w-3" />
                          {order.email}
                        </a>
                      )}
                      {order.company && <span>🏢 {order.company}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select 
                      value={order.status} 
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEW">New</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type: </span>
                      <Badge variant="outline">{getTypeLabel(order.type)}</Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground">Date: </span>
                      <span>{formatDate(order.createdAt, "ru")}</span>
                    </div>
                  </div>
                  {order.message && (
                    <div className="pt-3 border-t">
                      <div className="text-sm font-medium mb-1">Message:</div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {order.message}
                      </p>
                    </div>
                  )}
                  {order.notes && (
                    <div className="pt-3 border-t">
                      <div className="text-sm font-medium mb-1">Admin Notes:</div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {order.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  )
}


