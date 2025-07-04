import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import TrackingDetails from "@/components/tracking-details"

export default function TrackingPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6" />
                <span className="text-xl font-bold">AOW Logistics</span>
              </div>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tracking Information</CardTitle>
              <CardDescription>Tracking ID: {params.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <TrackingDetails trackingId={params.id} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AOW Logistics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

