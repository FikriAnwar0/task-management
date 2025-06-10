export interface Task {
  id: string
  title: string
  description: string
  priority: "rendah" | "sedang" | "tinggi"
  status: "belum" | "proses" | "selesai"
  category: string
  dueDate?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
  timeSpent: number
  tags: string[]
}

export type FilterType = "semua" | "belum" | "proses" | "selesai"
export type SortType = "created" | "priority" | "dueDate" | "title"

export interface TaskFormData {
  title: string
  description: string
  priority: Task["priority"]
  status: Task["status"]
  category: string
  dueDate?: string
  tags: string[]
}

export interface TaskStats {
  total: number
  belum: number
  proses: number
  selesai: number
  overdue: number
  completionRate: number
  avgTimeSpent: number
}
