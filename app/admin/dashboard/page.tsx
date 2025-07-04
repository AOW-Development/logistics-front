"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Clock,
  PlusCircle,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import OrderStatusChart from "@/components/order-status-chart";
import { STRAPI_URL } from "@/lib/config";

// Mock data for the dashboard
const mockDashboardData = {
  totalOrders: 156,
  ordersDelivered: 89,
  ordersInTransit: 42,
  ordersYetToBePicked: 25,
  recentOrders: [
    {
      id: "ORD-12345",
      trackingId: "TRK-789012",
      customer: "John Doe",
      status: "delivered",
      date: "2023-10-15",
    },
    {
      id: "ORD-12346",
      trackingId: "TRK-789013",
      customer: "Jane Smith",
      status: "intransit",
      date: "2023-10-16",
    },
    {
      id: "ORD-12347",
      trackingId: "TRK-789014",
      customer: "Bob Johnson",
      status: "yet_to_be_picked",
      date: "2023-10-17",
    },
  ],
  orderStatusData: [
    { name: "Delivered", value: 89 },
    { name: "In Transit", value: 42 },
    { name: "Yet to be Picked", value: 25 },
  ],
};

const statusMap: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  yet_to_be_picked: {
    label: "Yet to be picked",
    color: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-4 w-4" />,
  },
  intransit: {
    label: "In Transit",
    color: "bg-indigo-100 text-indigo-800",
    icon: <Truck className="h-4 w-4" />,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<
    typeof mockDashboardData | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the dashboard data from your API
    // const fetchDashboardData = async () => {
    //   try {
    //     const response = await fetch('/api/admin/dashboard')
    //     if (!response.ok) throw new Error('Failed to fetch dashboard data')
    //     const data = await response.json()
    //     setDashboardData(data)
    //   } catch (error) {
    //     console.error(error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // fetchDashboardData()

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/shipments/dashboard`); // Strapi endpoint
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
    // For demo purposes, we'll use mock data
    // const timer = setTimeout(() => {
    //   setDashboardData(mockDashboardData);
    //   setLoading(false);
    // }, 1000);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/admin/shipments/create">
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Shipment
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <Box className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData?.totalOrders}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All orders in the system
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Orders Delivered
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData?.ordersDelivered}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successfully delivered orders
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Orders In Transit
                  </CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData?.ordersInTransit}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Orders currently in transit
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Yet to be Picked
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData?.ordersYetToBePicked}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Orders waiting to be picked up
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>
                Distribution of orders by status
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              {loading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <OrderStatusChart data={dashboardData?.orderStatusData || []} />
              )}
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders in the system</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  {dashboardData?.recentOrders.map((order) => {
                    const status =
                      statusMap[order.status] || statusMap.intransit;
                    return (
                      <div
                        key={order.id}
                        className="flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{order.id}</p>
                          <div className="flex items-center gap-2">
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.color}`}
                            >
                              {status.icon}
                              <span className="ml-1">{status.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Link href={`/admin/shipments/${order.trackingId}`}>
                          <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href="/admin/shipments">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
