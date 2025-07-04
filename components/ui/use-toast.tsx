"use client"

import type React from "react"

// Simplified version of the shadcn/ui toast component
import { createContext, useContext, useState } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toast: (props: ToastProps) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    setToasts((prev) => [...prev, props])
    // In a real implementation, we would show the toast UI and handle removal
    console.log("Toast:", props)
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* In a real implementation, we would render the toast UI here */}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

