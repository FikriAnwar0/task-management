import type { Task, TaskStats } from "@/types/task"

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export const formatTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export const isOverdue = (dueDate?: string): boolean => {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

export const getDaysUntilDue = (dueDate?: string): number => {
  if (!dueDate) return 0
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const getPriorityColor = (priority: Task["priority"]): string => {
  switch (priority) {
    case "tinggi":
      return "from-red-500 to-red-600"
    case "sedang":
      return "from-yellow-500 to-yellow-600"
    case "rendah":
      return "from-green-500 to-green-600"
    default:
      return "from-gray-500 to-gray-600"
  }
}

export const getPriorityWeight = (priority: Task["priority"]): number => {
  switch (priority) {
    case "tinggi":
      return 3
    case "sedang":
      return 2
    case "rendah":
      return 1
    default:
      return 0
  }
}

export const getTaskStats = (tasks: Task[]): TaskStats => {
  const total = tasks.length
  const belum = tasks.filter((t) => t.status === "belum").length
  const proses = tasks.filter((t) => t.status === "proses").length
  const selesai = tasks.filter((t) => t.status === "selesai").length
  const overdue = tasks.filter((t) => isOverdue(t.dueDate) && t.status !== "selesai").length
  const completionRate = total > 0 ? Math.round((selesai / total) * 100) : 0
  const avgTimeSpent = total > 0 ? Math.round(tasks.reduce((acc, t) => acc + t.timeSpent, 0) / total) : 0

  return { total, belum, proses, selesai, overdue, completionRate, avgTimeSpent }
}

export const sortTasks = (tasks: Task[], sortBy: string): Task[] => {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        return getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
      case "dueDate":
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      case "created":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
}

export const filterTasks = (tasks: Task[], filter: string, searchQuery: string): Task[] => {
  let filtered = tasks

  if (filter !== "semua") {
    filtered = filtered.filter((task) => task.status === filter)
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query) ||
        task.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  return filtered
}

export const exportTasksToJSON = (tasks: Task[]): void => {
  const dataStr = JSON.stringify(tasks, null, 2)
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
  const exportFileDefaultName = `taskflow-backup-${new Date().toISOString().split("T")[0]}.json`

  const linkElement = document.createElement("a")
  linkElement.setAttribute("href", dataUri)
  linkElement.setAttribute("download", exportFileDefaultName)
  linkElement.click()
}