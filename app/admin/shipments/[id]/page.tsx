"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Package,
  Trash,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { STRAPI_URL, getAuthHeaders } from "@/lib/config";
import { fetchShipment, deleteStatusUpdate } from "@/lib/api";

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

const statusOptions = [
  { value: "yet_to_be_picked", label: "Yet to be picked" },
  { value: "picked_up", label: "Picked up" },
  { value: "intransit", label: "In Transit" },
  { value: "on_the_way", label: "On the way" },
  { value: "terminal_shipping", label: "Terminal shipping" },
  { value: "delivered", label: "Delivered" },
  { value: "delivery_rejected", label: "Delivery rejected" },
  { value: "onhold", label: "On hold" },
];

export default function ShipmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateDetails, setUpdateDetails] = useState("");
  const [updateTime, setUpdateTime] = useState("");

  useEffect(() => {
    const getShipment = async () => {
      try {
        const data = await fetchShipment(params.id);

        if (data) {
          setShipment(data);
          setNewStatus(data?.order_status || "");
        } else {
          toast({
            title: "Error",
            description: "Shipment not found",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to fetch shipment details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getShipment();
  }, [params.id, toast]);

  const handleDeleteStatus = async (statusUpdateId: string) => {
    try {
      await deleteStatusUpdate(statusUpdateId);

      // Refresh the shipment data
      const updatedShipment = await fetchShipment(params.id);
      setShipment(updatedShipment);

      toast({
        title: "Status Update Deleted",
        description: "The status update has been successfully deleted",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete status update. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // First, create or update the location
      // const locationResponse = await fetch(`${STRAPI_URL}/api/locations`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     ...getAuthHeaders(),
      //   },
      //   body: JSON.stringify({
      //     data: {
      //       name: updateLocation,
      //     },
      //   }),
      // });

      // if (!locationResponse.ok)
      //   throw new Error("Failed to create/update location");

      // const locationData = await locationResponse.json();

      // Create a new status update with the location reference and shipment ID
      const statusUpdateResponse = await fetch(
        `${STRAPI_URL}/api/status-updates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            data: {
              order_status: newStatus,
              details: updateDetails,
              shipment: shipment.id,
              // location: locationData.data.documentId,
              timestamp: updateTime,
            },
          }),
        }
      );

      if (!statusUpdateResponse.ok)
        throw new Error("Failed to create status update");

      // Update the shipment's order_status
      const shipmentUpdateResponse = await fetch(
        `${STRAPI_URL}/api/shipment/${shipment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            data: {
              order_status: newStatus,
            },
          }),
        }
      );

      if (!shipmentUpdateResponse.ok)
        throw new Error("Failed to update shipment status");

      const updatedShipment = await fetchShipment(params.id);
      setShipment(updatedShipment);

      setUpdateLocation("");
      setUpdateDetails("");

      toast({
        title: "Status Updated",
        description: "The shipment status has been updated successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  console.log("shipment1233", shipment);

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Shipment Details</h1>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : shipment ? (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>
                      Shipment {shipment.attributes.orderId}
                    </CardTitle>
                    <CardDescription>
                      Tracking ID: {shipment.attributes.trackingId}
                    </CardDescription>
                  </div>
                  <Badge
                    className={
                      statusMap[shipment.attributes.order_status]?.color || ""
                    }
                  >
                    <span className="flex items-center gap-1">
                      {statusMap[shipment.attributes.order_status]?.icon}
                      {statusMap[shipment.attributes.order_status]?.label ||
                        shipment.attributes.order_status ||
                        "Unknown"}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Order Information</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {/* <div className="text-sm text-muted-foreground">
                        Order Date:
                      </div>
                      <div className="text-sm">
                        {new Date(
                          shipment.attributes.orderDate
                        ).toLocaleDateString()}
                      </div> */}
                      <div className="text-sm text-muted-foreground">
                        Estimated Delivery:
                      </div>
                      <div className="text-sm">
                        {new Date(
                          shipment.attributes.estimatedDelivery
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Customer Information</h3>
                    <div className="grid gap-2">
                      <div className="text-sm text-muted-foreground">Name:</div>
                      <div className="text-sm">
                        {shipment.attributes.customer?.data?.attributes?.name ||
                          "N/A"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Address:
                      </div>
                      <div className="text-sm">
                        {shipment.attributes.customer?.data?.attributes
                          ?.address || "N/A"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Phone:
                      </div>
                      <div className="text-sm">
                        {shipment.attributes.customer?.data?.attributes
                          ?.phone || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
                <CardDescription>
                  Update the current status of this shipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateStatus} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newStatus}
                        onValueChange={setNewStatus}
                        required
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter current location"
                        value={updateLocation}
                        onChange={(e) => setUpdateLocation(e.target.value)}
                        required
                      />
                    </div> */}

                    <div className="space-y-2">
                      <Label htmlFor="orderDate">Update Date & Time</Label>
                      <Input
                        id="updateDate"
                        name="updateDate"
                        type="datetime-local"
                        onChange={(e) => setUpdateTime(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details">Details</Label>
                      <Textarea
                        id="details"
                        placeholder="Enter update details"
                        value={updateDetails}
                        onChange={(e) => setUpdateDetails(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update Status"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
                <CardDescription>
                  Complete history of status updates for this shipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {shipment?.attributes?.status_updates?.data?.map(
                    (update: any, index: number) => (
                      <div
                        key={update?.attributes?.id}
                        className="relative pl-6 pb-6"
                      >
                        {index !==
                          shipment.attributes?.status_updates?.length - 1 && (
                          <div className="absolute top-0 left-2 h-full w-px bg-muted-foreground/20"></div>
                        )}
                        <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-primary"></div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">
                                {statusOptions.find(
                                  (option) =>
                                    option.value ===
                                    update?.attributes?.order_status
                                )?.label || update?.attributes?.order_status}
                              </span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {update.attributes?.timestamp
                                  ? new Date(
                                      update?.attributes?.timestamp
                                    ).toLocaleString()
                                  : "N/A"}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteStatus(update?.attributes?.id)
                              }
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                          {/* <div className="text-sm">
                            {update?.attributes?.details || "N/A"}
                          </div> */}
                          <div className="text-sm text-muted-foreground">
                            {update.attributes?.details}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center">
            <p>No shipment found with tracking ID: {params.id}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
