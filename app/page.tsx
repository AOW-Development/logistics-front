"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  Globe,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import TrackingForm from "@/components/tracking-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ContactForm from "@/components/contact-form";
import { Logo } from "@/components/logo";

export default function HomePage() {
  // Add smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    // Handle navigation click events
    const handleLinkClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Add click event listeners to all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = "";
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#home"
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Home
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Services
            </Link>
            <Link
              href="#tracking"
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Tracking
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Contact
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="bg-transparent text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Admin Login
              </Button>
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="md:hidden bg-transparent text-orange-500 border-orange-500"
              >
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 py-4">
                <Logo />
                <Link
                  href="#home"
                  className="text-lg font-medium hover:text-orange-500"
                >
                  Home
                </Link>
                <Link
                  href="#services"
                  className="text-lg font-medium hover:text-orange-500"
                >
                  Services
                </Link>
                <Link
                  href="#tracking"
                  className="text-lg font-medium hover:text-orange-500"
                >
                  Tracking
                </Link>
                <Link
                  href="#about"
                  className="text-lg font-medium hover:text-orange-500"
                >
                  About
                </Link>
                <Link
                  href="#contact"
                  className="text-lg font-medium hover:text-orange-500"
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section
          id="home"
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary  bg-[url('/porsche.jpg?height=300&width=400')] bg-cover md:bg-center bg-no-repeat "
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Fast & Reliable{" "}
                  <span className="text-primary">Global Shipping</span>
                </h1>
                <p className="mx-auto text-white max-w-[700px]  md:text-xl">
                  Track your shipment in real-time and get updates on your
                  delivery status.
                </p>
              </div>
              <div className="w-full max-w-[700px]">
                <Card className="border-primary/20">
                  <CardHeader className="bg-primary/10">
                    <CardTitle className="text-primary">
                      Track Your Order
                    </CardTitle>
                    <CardDescription>
                      Enter your tracking ID to see the status of your shipment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
                      <TrackingForm />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="w-full py-12 md:py-16 lg:py-20 bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our <span className="text-primary">Services</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Comprehensive logistics solutions for businesses and individuals
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              <Card className="border-primary/10 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="inline-block rounded-lg bg-primary/10 p-3 mb-2">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Express Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Same-day and next-day delivery options for urgent shipments.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/services/express"
                    className="text-primary flex items-center text-sm"
                  >
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-primary/10 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="inline-block rounded-lg bg-primary/10 p-3 mb-2">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>International Shipping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reliable global shipping to over 200 countries worldwide.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/services/international"
                    className="text-primary flex items-center text-sm"
                  >
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-primary/10 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="inline-block rounded-lg bg-primary/10 p-3 mb-2">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Freight Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Air, sea, and land freight solutions for businesses of all
                    sizes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/services/freight"
                    className="text-primary flex items-center text-sm"
                  >
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-primary/10 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="inline-block rounded-lg bg-primary/10 p-3 mb-2">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure Warehousing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Safe storage solutions with 24/7 security and inventory
                    management.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/services/warehousing"
                    className="text-primary flex items-center text-sm"
                  >
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="tracking"
          className="w-full py-12 md:py-16 lg:py-20 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                How <span className="text-primary">It Works</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Simple steps to track and manage your shipments
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4 relative">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Enter Tracking Number</h3>
                <p className="text-muted-foreground">
                  Input your tracking ID in our tracking form to begin.
                </p>
                <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-primary/30"></div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 relative">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">Get Real-Time Updates</h3>
                <p className="text-muted-foreground">
                  View detailed information about your shipment's journey.
                </p>
                <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-primary/30"></div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Receive Your Package</h3>
                <p className="text-muted-foreground">
                  Get notified when your package is out for delivery and
                  delivered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="w-full py-12 md:py-16 lg:py-20 bg-secondary"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                  Global <span className="text-primary">Coverage</span>
                </h2>
                <p className="text-gray-400 md:text-xl">
                  Our extensive network covers over 200 countries and
                  territories worldwide, ensuring your packages reach their
                  destination safely and on time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" /> 24/7
                    tracking capabilities
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" /> Local
                    delivery partners in every region
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />{" "}
                    Customs clearance assistance
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />{" "}
                    Multiple shipping speed options
                  </li>
                </ul>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  View Coverage Map
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Global coverage map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                What Our <span className="text-primary">Customers Say</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Trusted by thousands of businesses and individuals worldwide
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic">
                    "AOW Logistics has been our shipping partner for over 3
                    years. Their tracking system is excellent and their customer
                    service is top-notch."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                      JD
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        CEO, TechCorp
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic">
                    "I love how easy it is to track my packages. The real-time
                    updates are accurate and the delivery is always on time."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                      JS
                    </div>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">
                        Regular Customer
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/10 md:col-span-2 lg:col-span-1">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic">
                    "As an e-commerce business, reliable shipping is crucial.
                    AOW Logistics has never let us down. Their tracking system
                    helps us keep our customers informed."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                      RJ
                    </div>
                    <div>
                      <p className="font-medium">Robert Johnson</p>
                      <p className="text-sm text-muted-foreground">
                        Founder, ShopEasy
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 lg:py-20 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Download Our <span className="text-primary">Mobile App</span>
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Track your shipments on the go with our mobile app. Available
                  for iOS and Android devices.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />{" "}
                    Real-time tracking notifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" /> Scan
                    QR codes for quick tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" /> Save
                    multiple tracking numbers
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />{" "}
                    Contact customer support directly
                  </li>
                </ul>
                {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="bg-secondary hover:bg-secondary/90 text-white">
                    <Smartphone className="h-5 w-5 mr-2" /> Download for iOS
                  </Button>
                  <Button className="bg-secondary hover:bg-secondary/90 text-white">
                    <Smartphone className="h-5 w-5 mr-2" /> Download for Android
                  </Button>
                </div> */}
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Mobile app screenshot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Shipping <span className="text-primary">Calculator</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Get an estimate for your shipping costs
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate Shipping Cost</CardTitle>
                  <CardDescription>
                    Enter package details to get an estimated shipping cost
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="domestic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="domestic">Domestic</TabsTrigger>
                      <TabsTrigger value="international">
                        International
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="domestic" className="space-y-4 pt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Origin Zip Code
                          </label>
                          <input
                            type="text"
                            placeholder="Enter origin zip code"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Destination Zip Code
                          </label>
                          <input
                            type="text"
                            placeholder="Enter destination zip code"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Weight (lbs)
                          </label>
                          <input
                            type="number"
                            placeholder="Weight"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Length (in)
                          </label>
                          <input
                            type="number"
                            placeholder="Length"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Width (in)
                          </label>
                          <input
                            type="number"
                            placeholder="Width"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Calculate
                      </Button>
                    </TabsContent>
                    <TabsContent
                      value="international"
                      className="space-y-4 pt-4"
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Origin Country
                          </label>
                          <select className="w-full p-2 border rounded-md">
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Destination Country
                          </label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Select country</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Weight (lbs)
                          </label>
                          <input
                            type="number"
                            placeholder="Weight"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Package Type
                          </label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Document</option>
                            <option>Package</option>
                            <option>Pallet</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Service Type
                          </label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Standard</option>
                            <option>Express</option>
                            <option>Priority</option>
                          </select>
                        </div>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Calculate
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="w-full py-12 md:py-16 lg:py-20 bg-secondary"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                  Contact <span className="text-primary">Us</span>
                </h2>
                <p className="text-gray-400 md:text-xl">
                  Have questions about your shipment? Our customer service team
                  is here to help.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span className="text-white">(650)-414-4085</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span className="text-white">support@aowlogistics.com</span>
                  </div>
                  {/* <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span className="text-white">
                      Orland
                    </span>
                  </div> */}
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <span className="text-white">
                      Monday - Friday: 8am - 8pm EST
                    </span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Live Chat <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon
                      as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find answers to common questions about our shipping services
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card>
                <CardHeader className="cursor-pointer bg-primary/5 hover:bg-primary/10">
                  <CardTitle className="text-lg flex justify-between items-center">
                    How do I track my package?
                    <ChevronRight className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">
                    You can track your package by entering your tracking number
                    in the tracking form on our homepage. You'll receive
                    real-time updates on your shipment's status and location.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="cursor-pointer bg-primary/5 hover:bg-primary/10">
                  <CardTitle className="text-lg flex justify-between items-center">
                    What shipping options do you offer?
                    <ChevronRight className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">
                    We offer a variety of shipping options including standard
                    delivery, express delivery, and international shipping. Each
                    option has different delivery timeframes and pricing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="cursor-pointer bg-primary/5 hover:bg-primary/10">
                  <CardTitle className="text-lg flex justify-between items-center">
                    How long will it take for my package to arrive?
                    <ChevronRight className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">
                    Delivery times vary depending on the shipping method chosen
                    and the destination. Standard domestic deliveries typically
                    take 3-5 business days, while express deliveries can arrive
                    within 1-2 business days. International shipping times vary
                    by country.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="cursor-pointer bg-primary/5 hover:bg-primary/10">
                  <CardTitle className="text-lg flex justify-between items-center">
                    What should I do if my package is delayed?
                    <ChevronRight className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">
                    If your package is delayed, you can check the tracking
                    information for updates. If there's no update or the delay
                    is significant, please contact our customer service team
                    with your tracking number for assistance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo />
              <p className="text-gray-400 mt-2">
                Your trusted partner for global shipping and logistics
                solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#home"
                    className="text-gray-400 hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-primary"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#tracking"
                    className="text-gray-400 hover:text-primary"
                  >
                    Tracking
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-gray-400 hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-gray-400 hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-primary">
                    Express Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-primary">
                    International Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-primary">
                    Freight Services
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-primary">
                    Warehousing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-gray-400 hover:text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Subscribe to our newsletter</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full p-2 rounded-l-md"
                  />
                  <Button className="rounded-l-none bg-primary hover:bg-primary/90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} AOW Logistics. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-primary"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
