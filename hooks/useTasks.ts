"use client"

import { useState, useEffect } from "react"
import type { Task, TaskFormData } from "@/types/task"
import { generateId } from "@/utils/taskUtils"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskflow-tasks")
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error("Error loading tasks:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save tasks to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = (formData: TaskFormData): Task => {
    const now = new Date().toISOString()
    const newTask: Task = {
      id: generateId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      category: formData.category.trim() || "Umum",
      dueDate: formData.dueDate,
      createdAt: now,
      updatedAt: now,
      timeSpent: 0,
      tags: formData.tags.filter((tag) => tag.trim() !== ""),
    }

    setTasks((prev) => [newTask, ...prev])
    return newTask
  }

  const updateTask = (taskId: string, updates: Partial<Task>): void => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task)),
    )
  }

  const deleteTask = (taskId: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const deleteTasks = (taskIds: string[]): void => {
    setTasks((prev) => prev.filter((task) => !taskIds.includes(task.id)))
  }

  const updateTaskStatus = (taskId: string, status: Task["status"]): void => {
    const now = new Date().toISOString()
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
              updatedAt: now,
              ...(status === "selesai" && { completedAt: now }),
            }
          : task,
      ),
    )
  }

  const reorderTasks = (startIndex: number, endIndex: number): void => {
    setTasks((prev) => {
      const result = Array.from(prev)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    })
  }

  const importTasks = (importedTasks: Task[]): void => {
    // Merge imported tasks with existing tasks, avoiding duplicates
    setTasks((prev) => {
      const existingIds = new Set(prev.map((task) => task.id))
      const newTasks = importedTasks.filter((task) => !existingIds.has(task.id))
      return [...prev, ...newTasks]
    })
  }

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    deleteTasks,
    updateTaskStatus,
    reorderTasks,
    importTasks,
  }
}
