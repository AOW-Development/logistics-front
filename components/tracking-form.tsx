"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { STRAPI_URL } from "@/lib/config";

export default function TrackingForm() {
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${STRAPI_URL}/api/shipments?trackingId=${trackingId.toString()}`
      );

      if (!response.ok) throw new Error("Invalid tracking ID");

      router.push(`/tracking/${trackingId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid tracking ID. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="Enter tracking ID"
        value={trackingId}
        onChange={(e) => {
          setTrackingId(e.target.value);
        }}
        className="flex-1 border-primary/20 focus-visible:ring-primary"
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-primary hover:bg-primary/90 text-white"
      >
        {isLoading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Track
          </>
        )}
      </Button>
    </form>
  );
}
