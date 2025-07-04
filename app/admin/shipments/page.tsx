"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  CheckCircle2,
  Clock,
  PlusCircle,
  Search,
  Truck,
  ChevronLeft,
  ChevronRight,
  Trash2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteShipment, fetchShipments } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const statusMap = {
  yet_to_be_picked: {
    label: "Yet to be picked",
    color: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-4 w-4" />,
  },
  picked_up: {
    label: "Picked up",
    color: "bg-blue-100 text-blue-800",
    icon: <Truck className="h-4 w-4" />,
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
    icon: <Truck className="h-4 w-4" />,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  delivery_rejected: {
    label: "Delivery rejected",
    color: "bg-red-100 text-red-800",
    icon: <Truck className="h-4 w-4" />,
  },
  onhold: {
    label: "On hold",
    color: "bg-gray-100 text-gray-800",
    icon: <Clock className="h-4 w-4" />,
  },
};

interface Shipment {
  attributes: any;
  id: number;
  documentId: string;
  orderId: string;
  trackingId: string;
  orderDate: string;
  estimatedDelivery: string;
  order_status: string;
  originName: string | null;
  originAddress: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  customer: any | null;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [deleteShipmentId, setDeleteShipmentId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getShipments = async () => {
      try {
        setLoading(true);
        const data = await fetchShipments({
          page,
          pageSize,
          filters: {
            ...(searchQuery && {
              $or: [
                { trackingId: { $containsi: searchQuery } },
                { orderId: { $containsi: searchQuery } },
                { "customer.name": { $containsi: searchQuery } },
              ],
            }),
            ...(statusFilter !== "all" && { order_status: statusFilter }),
          },
        });
        console.log("Shipments data:", JSON.stringify(data, null, 2));
        setShipments(data.data);
        setTotalPages(data.meta.pagination.pageCount);
        setTotalItems(data.meta.pagination.total);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!deleteShipmentId) getShipments();
  }, [page, searchQuery, statusFilter, deleteShipmentId]);

  const handlePageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Generate page numbers to display (e.g., show 5 pages at a time)
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, page - halfRange);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if endPage is at the limit
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipses if necessary
    const result = [];
    if (startPage > 1) {
      result.push(1);
      if (startPage > 2) result.push("...");
    }
    result.push(...pages);
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) result.push("...");
      result.push(totalPages);
    }

    return result;
  };

  const handleDeleteShipment = async (id: string) => {
    try {
      setDeleteShipmentId(parseFloat(id));
      await deleteShipment(id);

      // Refresh the shipment data
      toast({
        title: "Shipment has been Deleted",
        description: `Shipment ${id} deleted successfully`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete shipment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteShipmentId(null);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Shipments</h1>
          <Link href="/admin/shipments/create">
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Shipment
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Shipments</CardTitle>
            <CardDescription>
              View and manage all shipments in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full items-center gap-2 md:w-auto">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by tracking ID, order ID or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-[300px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {Object.entries(statusMap).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <Button variant="ghost" className="p-0 font-medium">
                              S.No
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button variant="ghost" className="p-0 font-medium">
                              Order ID
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button variant="ghost" className="p-0 font-medium">
                              Tracking ID
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button variant="ghost" className="p-0 font-medium">
                              Customer
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button variant="ghost" className="p-0 font-medium">
                              Status
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead>
                            <Button variant="ghost" className="p-0 font-medium">
                              Date
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {shipments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No shipments found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          shipments.map((shipment) => {
                            const status =
                              statusMap[shipment.attributes.order_status] ||
                              statusMap.intransit;
                            return (
                              <TableRow key={shipment.id}>
                                <TableCell className="font-medium">
                                  {shipment.id}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {shipment.attributes.orderId}
                                </TableCell>
                                <TableCell>
                                  {shipment.attributes.trackingId}
                                </TableCell>
                                <TableCell>
                                  {shipment.attributes.customer?.name || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <Badge className={status.color}>
                                    <span className="flex items-center gap-1">
                                      {status.icon}
                                      {status.label}
                                    </span>
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {new Date(
                                    shipment.attributes.orderDate
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Link
                                      href={`/admin/shipments/${shipment.attributes.trackingId}`}
                                    >
                                      <Button variant="ghost" size="sm">
                                        Update
                                      </Button>
                                    </Link>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                        >
                                          <Trash2 className="h-4 w-4 mr-1" />
                                          Delete
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete the shipment
                                            with tracking ID{" "}
                                            {shipment.attributes.trackingId}.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleDeleteShipment(shipment.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination Controls with Page Numbers */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {(page - 1) * pageSize + 1} to{" "}
                      {Math.min(page * pageSize, totalItems)} of {totalItems}{" "}
                      shipments
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      {getPageNumbers().map((pageNum, index) => (
                        <Button
                          key={index}
                          variant={pageNum === page ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            typeof pageNum === "number" &&
                            handlePageChange(pageNum)
                          }
                          disabled={typeof pageNum !== "number"}
                        >
                          {pageNum}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
