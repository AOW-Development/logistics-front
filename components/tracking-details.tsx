"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchShipment } from "@/lib/api";

// This would come from your API in a real application
// const mockOrderData = {
//   orderId: "ORD-12345",
//   trackingId: "TRK-789012",
//   status: "intransit",
//   orderDate: "2023-10-15",
//   estimatedDelivery: "2023-10-20",
//   customer: {
//     name: "John Doe",
//     address: "123 Main St, Anytown, CA 12345",
//     phone: "+1 (555) 123-4567",
//   },
//   origin: {
//     name: "Central Warehouse",
//     address: "456 Warehouse Blvd, Shipping City, CA 67890",
//   },
//   updates: [
//     {
//       status: "order_placed",
//       timestamp: "2023-10-15T10:30:00Z",
//       location: "Online",
//       details: "Order has been placed",
//     },
//     {
//       status: "picked_up",
//       timestamp: "2023-10-16T14:45:00Z",
//       location: "Central Warehouse",
//       details: "Package has been picked up from the warehouse",
//     },
//     {
//       status: "intransit",
//       timestamp: "2023-10-17T09:15:00Z",
//       location: "Shipping Hub",
//       details: "Package is in transit to the destination",
//     },
//   ],
// }

const statusMap: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  yet_to_be_picked: {
    label: "Yet to be picked",
    color: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-4 w-4" />,
  },
  picked_up: {
    label: "Picked up",
    color: "bg-blue-100 text-blue-800",
    icon: <Package className="h-4 w-4" />,
  },
  intransit: {
    label: "In Transit",
    color: "bg-indigo-100 text-indigo-800",
    icon: <Truck className="h-4 w-4" />,
  },
  on_the_way: {
    label: "On the way",
    color: "bg-purple-100 text-purple-800",
    icon: <Truck className="h-4 w-4" />,
  },
  terminal_shipping: {
    label: "Terminal shipping",
    color: "bg-orange-100 text-orange-800",
    icon: <Package className="h-4 w-4" />,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  delivery_rejected: {
    label: "Delivery rejected",
    color: "bg-red-100 text-red-800",
    icon: <Package className="h-4 w-4" />,
  },
  onhold: {
    label: "On hold",
    color: "bg-gray-100 text-gray-800",
    icon: <Clock className="h-4 w-4" />,
  },
};

export default function TrackingDetails({
  trackingId,
}: {
  trackingId: string;
}) {
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShipment = async () => {
      try {
        const data = await fetchShipment(trackingId);
        setShipment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getShipment();
  }, [trackingId]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!shipment) {
    return <div>No shipment found with tracking ID: {trackingId}</div>;
  }

  const order_status = shipment.attributes?.order_status
    ?.toLowerCase()
    .replace(/ /g, "_");
  const statusInfo = statusMap[order_status] || statusMap.intransit;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Shipment Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-muted-foreground">Order ID:</div>
                <div className="text-sm font-medium">
                  {shipment.attributes.orderId}
                </div>
                <div className="text-sm text-muted-foreground">
                  Tracking ID:
                </div>
                <div className="text-sm font-medium">
                  {shipment.attributes.trackingId}
                </div>
                {/* <div className="text-sm text-muted-foreground">Order Date:</div>
                <div className="text-sm font-medium">
                  {new Date(shipment.attributes.orderDate).toLocaleDateString()}
                </div> */}
                <div className="text-sm text-muted-foreground">
                  Estimated Delivery:
                </div>
                <div className="text-sm font-medium">
                  {new Date(
                    shipment.attributes.estimatedDelivery
                  ).toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">Status:</div>
                <div>
                  <Badge className={statusInfo.color}>
                    <span className="flex items-center gap-1">
                      {statusInfo.icon}
                      {statusInfo.label}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Delivery Information</h3>
              <div className="grid gap-2">
                {/* <div className="text-sm text-muted-foreground">Recipient:</div>
                <div className="text-sm font-medium">
                  {shipment.attributes.customer?.data?.attributes?.name}
                </div> */}
                <div className="text-sm text-muted-foreground">
                  Delivery Address:
                </div>
                <div className="text-sm font-medium">
                  {shipment.attributes.customer?.data?.attributes?.address}
                </div>
                {/* <div className="text-sm text-muted-foreground">Contact:</div>
                <div className="text-sm font-medium">
                  {shipment.attributes.customer.data?.attributes?.phone}
                </div> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Tracking History</h3>
          <div className="space-y-6">
            {shipment?.attributes?.status_updates?.data?.map(
              (update: any, index: number) => (
                <div key={index} className="relative pl-6 pb-6">
                  {index !==
                    shipment?.attributes?.status_updates?.length - 1 && (
                    <div className="absolute top-0 left-2 h-full w-px bg-muted-foreground/20"></div>
                  )}
                  <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {statusMap[update.attributes?.order_status]?.label ||
                          update.order_status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(
                          update.attributes?.timestamp
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm">{update.attributes?.details}</div>
                    {/* <div className="text-sm text-muted-foreground">
                      {update.details}
                    </div> */}
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
