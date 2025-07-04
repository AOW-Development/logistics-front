"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Home, LogOut, Package, PlusCircle, Search, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  // Check if user is authenticated
  useEffect(() => {
    setIsMounted(true);

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });

    router.push("/login");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6" />
                    <span className="text-xl font-bold">AOW Logistics</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/admin/dashboard">
                      <Button
                        variant={
                          pathname === "/admin/dashboard" ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                      >
                        <Home className="mr-2 h-5 w-5" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/admin/shipments/create">
                      <Button
                        variant={
                          pathname === "/admin/shipments/create"
                            ? "default"
                            : "ghost"
                        }
                        className="w-full justify-start"
                      >
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Create Shipment
                      </Button>
                    </Link>
                    <Link href="/admin/shipments">
                      <Button
                        variant={
                          pathname === "/admin/shipments" ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                      >
                        <Truck className="mr-2 h-5 w-5" />
                        Shipments
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/admin/dashboard">
              <span className="text-xl font-bold">AOW Logistics</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/admin/dashboard">
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6" />
                <span className="text-xl font-bold">AOW Logistics</span>
              </div>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button
                  variant={
                    pathname === "/admin/dashboard" ? "default" : "ghost"
                  }
                >
                  <Home className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/shipments/create">
                <Button
                  variant={
                    pathname === "/admin/shipments/create" ? "default" : "ghost"
                  }
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Shipment
                </Button>
              </Link>
              <Link href="/admin/shipments">
                <Button
                  variant={
                    pathname === "/admin/shipments" ? "default" : "ghost"
                  }
                >
                  <Truck className="mr-2 h-5 w-5" />
                  Shipments
                </Button>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <form className="hidden md:flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 mr-2"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
