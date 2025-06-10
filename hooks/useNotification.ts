"use client"

import { useToast } from "@/hooks/use-toast"

export const useNotification = () => {
  const { toast } = useToast()

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 2000,
      className: "bg-green-50 border-green-200 text-green-800",
    })
  }

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
      duration: 2000,
    })
  }

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 2000,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    })
  }

  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 2000,
      className: "bg-yellow-50 border-yellow-200 text-yellow-800",
    })
  }

  return { showSuccess, showError, showInfo, showWarning }
}
