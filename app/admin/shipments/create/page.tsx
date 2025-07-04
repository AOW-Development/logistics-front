"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createShipment } from "@/lib/api";
import DatePicker from "react-datepicker";
import { format as formatTZ } from "date-fns-tz";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateShipmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const shipmentData = {
        orderId: formData.get("orderId"),
        trackingId: formData.get("trackingId"),
        orderDate: orderDate
          ? formatTZ(orderDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
              timeZone: "America/New_York",
            })
          : null,
        estimatedDelivery: estimatedDelivery
          ? formatTZ(estimatedDelivery, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
              timeZone: "America/New_York",
            })
          : null,
        order_status: "yet_to_be_picked",
        originName: formData.get("originName"),
        originAddress: formData.get("originAddress"),
        customer: {
          name: formData.get("recipientName"),
          address: formData.get("deliveryAddress"),
          phone: formData.get("recipientPhone"),
        },
      };

      await createShipment(shipmentData);

      toast({
        title: "Shipment Created",
        description: "The shipment has been created successfully",
      });

      router.push("/admin/shipments");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create shipment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Create Shipment</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
                <CardDescription>
                  Enter the basic details for the new shipment
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="orderId">Order ID</Label>
                    <Input
                      id="orderId"
                      name="orderId"
                      placeholder="Enter order ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trackingId">Tracking ID</Label>
                    <Input
                      id="trackingId"
                      name="trackingId"
                      placeholder="Enter tracking ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderDate">Order Date (EST)</Label>
                    <div className="relative">
                      <DatePicker
                        id="orderDate"
                        name="orderDate"
                        selected={orderDate}
                        onChange={(date: Date | null) => setOrderDate(date)}
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="MM/dd/yyyy hh:mm aa"
                        placeholderText="Select order date and time"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      />
                      {orderDate && (
                        <div className="text-xs text-muted-foreground mt-1">
                          EST:{" "}
                          {formatTZ(orderDate, "MM/dd/yyyy hh:mm aa", {
                            timeZone: "America/New_York",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedDelivery">
                      Estimated Delivery Date (EST)
                    </Label>
                    <div className="relative">
                      <DatePicker
                        id="estimatedDelivery"
                        name="estimatedDelivery"
                        selected={estimatedDelivery}
                        onChange={(date: Date | null) =>
                          setEstimatedDelivery(date)
                        }
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="MM/dd/yyyy hh:mm aa"
                        placeholderText="Select estimated delivery date and time"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        minDate={orderDate || undefined}
                        required
                      />
                      {estimatedDelivery && (
                        <div className="text-xs text-muted-foreground mt-1">
                          EST:{" "}
                          {formatTZ(estimatedDelivery, "MM/dd/yyyy hh:mm aa", {
                            timeZone: "America/New_York",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
                <CardDescription>
                  Enter the delivery details for this shipment
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      name="recipientName"
                      placeholder="Enter recipient name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientPhone">Recipient Phone</Label>
                    <Input
                      id="recipientPhone"
                      name="recipientPhone"
                      placeholder="Enter recipient phone"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    placeholder="Enter delivery address"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pickup Information</CardTitle>
                <CardDescription>
                  Enter the pickup details for this shipment
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {/* <div className="space-y-2">
                  <Label htmlFor="originName">Origin Name</Label>
                  <Input
                    id="originName"
                    name="originName"
                    placeholder="Enter origin name"
                    required
                  />
                </div> */}
                <div className="space-y-2">
                  <Label htmlFor="originAddress">Origin Address</Label>
                  <Textarea
                    id="originAddress"
                    name="originAddress"
                    placeholder="Enter origin address"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Shipment"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
