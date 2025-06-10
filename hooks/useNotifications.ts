"use client"

import { useState, useEffect } from "react"

export type NotificationType = "success" | "error" | "warning" | "info"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  timestamp: number
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem("taskflow-notifications")
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications))
      } catch (error) {
        console.error("Error loading notifications:", error)
      }
    }
  }, [])

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem("taskflow-notifications", JSON.stringify(notifications))
  }, [notifications])

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  const addNotification = (title: string, message: string, type: NotificationType = "info") => {
    const newNotification: Notification = {
      id: generateId(),
      title,
      message,
      type,
      read: false,
      timestamp: Date.now(),
    }

    setNotifications((prev) => [newNotification, ...prev])
    return newNotification
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  }
}
