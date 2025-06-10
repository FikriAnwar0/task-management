"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Toaster } from "@/components/ui/toaster"
import { Search, Filter, SortAsc, CheckSquare, Trash2, BarChart3 } from "lucide-react"

import { Header } from "@/components/Header"
import { TaskForm } from "@/components/TaskForm"
import { TaskCard } from "@/components/TaskCard"
import { StatsCards } from "@/components/StatsCards"
import { QuickActions } from "@/components/QuickActions"
import { EditTaskDialog } from "@/components/EditTaskDialog"

import { useTasks } from "@/hooks/useTasks"
import { useTheme } from "@/hooks/useTheme"
import { useNotification } from "@/hooks/useNotification"
import { useNotifications } from "@/hooks/useNotifications"

import type { Task, TaskFormData, FilterType, SortType } from "@/types/task"
import { getTaskStats, sortTasks } from "@/utils/taskUtils"

export default function TaskFlowApp() {
  const { tasks, addTask, updateTask, deleteTask, deleteTasks, updateTaskStatus, importTasks } = useTasks()
  const { isDarkMode, toggleTheme } = useTheme()
  const { showSuccess, showError, showInfo } = useNotification()
  const { addNotification } = useNotifications()

  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [currentFilter, setCurrentFilter] = useState<FilterType>("semua")
  const [currentSort, setCurrentSort] = useState<SortType>("created")
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Enhanced search and filter logic
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks

    // Apply status filter
    if (currentFilter !== "semua") {
      filtered = filtered.filter((task) => task.status === currentFilter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((task) => {
        const titleMatch = task.title.toLowerCase().includes(query)
        const descriptionMatch = task.description?.toLowerCase().includes(query) || false
        const categoryMatch = task.category.toLowerCase().includes(query)
        const tagsMatch = task.tags.some((tag) => tag.toLowerCase().includes(query))
        const priorityMatch = task.priority.toLowerCase().includes(query)
        const statusMatch = task.status.toLowerCase().includes(query)

        return titleMatch || descriptionMatch || categoryMatch || tagsMatch || priorityMatch || statusMatch
      })
    }

    // Apply sorting
    return sortTasks(filtered, currentSort)
  }, [tasks, currentFilter, searchQuery, currentSort])

  // Enhanced notification styling with better visibility in dark mode
  const showEnhancedNotification = (title: string, message: string, type: "success" | "error" | "info" | "warning") => {
    // Define notification styles based on type
    const notificationStyles = {
      success: {
        bgLight: "bg-gradient-to-r from-green-50 to-emerald-50",
        bgDark: "bg-gradient-to-r from-green-900/30 to-emerald-900/40",
        borderLight: "border-green-300",
        borderDark: "border-green-700",
        iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
        textLight: "text-green-800",
        textDark: "text-green-300",
        icon: "✅",
      },
      error: {
        bgLight: "bg-gradient-to-r from-red-50 to-rose-50",
        bgDark: "bg-gradient-to-r from-red-900/30 to-rose-900/40",
        borderLight: "border-red-300",
        borderDark: "border-red-700",
        iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
        textLight: "text-red-800",
        textDark: "text-red-300",
        icon: "❌",
      },
      warning: {
        bgLight: "bg-gradient-to-r from-amber-50 to-yellow-50",
        bgDark: "bg-gradient-to-r from-amber-900/30 to-yellow-900/40",
        borderLight: "border-amber-300",
        borderDark: "border-amber-700",
        iconBg: "bg-gradient-to-br from-amber-500 to-yellow-600",
        textLight: "text-amber-800",
        textDark: "text-amber-300",
        icon: "⚠️",
      },
      info: {
        bgLight: "bg-gradient-to-r from-blue-50 to-indigo-50",
        bgDark: "bg-gradient-to-r from-blue-900/30 to-indigo-900/40",
        borderLight: "border-blue-300",
        borderDark: "border-blue-700",
        iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        textLight: "text-blue-800",
        textDark: "text-blue-300",
        icon: "ℹ️",
      },
    }

    const style = notificationStyles[type]

    switch (type) {
      case "success":
        showSuccess(title, message, {
          className: `
            border-2 shadow-lg animate-in slide-in-from-right 
            ${isDarkMode ? `${style.bgDark} ${style.borderDark} ${style.textDark}` : `${style.bgLight} ${style.borderLight} ${style.textLight}`}
          `,
          duration: 5000,
        })
        break
      case "error":
        showError(title, message, {
          className: `
            border-2 shadow-lg animate-in slide-in-from-right 
            ${isDarkMode ? `${style.bgDark} ${style.borderDark} ${style.textDark}` : `${style.bgLight} ${style.borderLight} ${style.textLight}`}
          `,
          duration: 5000,
        })
        break
      case "info":
      case "warning":
        showInfo(title, message, {
          className: `
            border-2 shadow-lg animate-in slide-in-from-right 
            ${isDarkMode ? `${style.bgDark} ${style.borderDark} ${style.textDark}` : `${style.bgLight} ${style.borderLight} ${style.textLight}`}
          `,
          duration: 5000,
        })
        break
    }

    addNotification(title, message, type)
  }

  const handleAddTask = (formData: TaskFormData) => {
    try {
      const newTask = addTask(formData)
      showEnhancedNotification("🎉 Berhasil!", `Tugas "${newTask.title}" berhasil ditambahkan`, "success")
    } catch (error) {
      showEnhancedNotification("❌ Error!", "Gagal menambahkan tugas", "error")
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleUpdateTask = (updates: Partial<Task>) => {
    if (!editingTask) return

    try {
      updateTask(editingTask.id, updates)
      setEditingTask(null)
      showEnhancedNotification("✨ Berhasil!", "Tugas berhasil diperbarui", "success")
    } catch (error) {
      showEnhancedNotification("❌ Error!", "Gagal memperbarui tugas", "error")
    }
  }

  const handleDeleteTask = (taskId: string) => {
    try {
      const taskToDelete = tasks.find((t) => t.id === taskId)
      deleteTask(taskId)

      // Clear selection if deleted task was selected
      setSelectedTasks((prev) => prev.filter((id) => id !== taskId))

      showEnhancedNotification("🗑️ Berhasil!", "Tugas berhasil dihapus", "info")
    } catch (error) {
      showEnhancedNotification("❌ Error!", "Gagal menghapus tugas", "error")
    }
  }

  const handleDeleteSelected = () => {
    try {
      const selectedTaskTitles = tasks
        .filter((task) => selectedTasks.includes(task.id))
        .map((task) => task.title)
        .join(", ")

      deleteTasks(selectedTasks)
      setSelectedTasks([]) // Clear selection after deletion
      setShowDeleteDialog(false)
      showEnhancedNotification("🗑️ Berhasil!", `${selectedTasks.length} tugas berhasil dihapus`, "info")
    } catch (error) {
      showEnhancedNotification("❌ Error!", "Gagal menghapus tugas", "error")
    }
  }

  const handleNextStatus = (task: Task) => {
    const statusFlow = {
      belum: "proses",
      proses: "selesai",
      selesai: "belum",
    } as const

    const newStatus = statusFlow[task.status]

    try {
      updateTaskStatus(task.id, newStatus)

      const statusEmojis = {
        belum: "⏳",
        proses: "🚀",
        selesai: "🎉",
      }

      showEnhancedNotification(
        `${statusEmojis[newStatus]} Status Diperbarui!`,
        `"${task.title}" sekarang ${newStatus}`,
        newStatus === "selesai" ? "success" : "info",
      )
    } catch (error) {
      showEnhancedNotification("❌ Error!", "Gagal memperbarui status", "error")
    }
  }

  const handleTogglePriority = (task: Task) => {
    try {
      const newPriority = task.priority === "tinggi" ? "sedang" : "tinggi"
      updateTask(task.id, { priority: newPriority })

      const priorityEmojis = {
        tinggi: "🔥",
        sedang: "⚡",
        rendah: "✨",
      }

      showEnhancedNotification(
        `${priorityEmojis[newPriority]} Prioritas Diperbarui!`,
        `"${task.title}" sekarang prioritas ${newPriority}`,
        "info",
      )
    } catch (error) {
      showEnhancedNotification("❌ Error!", "Gagal memperbarui prioritas", "error")
    }
  }

  const handleTaskSelect = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks((prev) => [...prev, taskId])
    } else {
      setSelectedTasks((prev) => prev.filter((id) => id !== taskId))
    }
  }

  const handleClearSelection = () => {
    setSelectedTasks([])
  }

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(tasks, null, 2)
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
      const exportFileDefaultName = `taskflow-backup-${new Date().toISOString().split("T")[0]}.json`

      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      linkElement.click()

      showEnhancedNotification("📥 Export Berhasil!", "Data tugas berhasil diexport", "success")
    } catch (error) {
      showEnhancedNotification("❌ Error!", "Gagal mengexport data", "error")
    }
  }

  const handleImport = (data: Task[]) => {
    try {
      if (!Array.isArray(data)) {
        throw new Error("Format data tidak valid")
      }

      const validTasks = data.filter((task) => {
        return (
          task && typeof task === "object" && task.id && task.title && task.status && task.priority && task.createdAt
        )
      })

      if (validTasks.length === 0) {
        throw new Error("Tidak ada tugas valid yang ditemukan")
      }

      importTasks(validTasks)
      showEnhancedNotification("📤 Import Berhasil!", `${validTasks.length} tugas berhasil diimport`, "success")
    } catch (error) {
      showEnhancedNotification("❌ Error!", "Gagal mengimport data: " + (error as Error).message, "error")
    }
  }

  const handleQuickFilter = (filter: string) => {
    switch (filter) {
      case "all":
        setCurrentFilter("semua")
        setSearchQuery("")
        break
      case "overdue":
        setCurrentFilter("semua")
        setSearchQuery("")
        // Additional logic for overdue tasks can be added here
        break
      case "high-priority":
        setCurrentFilter("semua")
        setSearchQuery("tinggi") // Search for high priority tasks
        break
      case "in-progress":
        setCurrentFilter("proses")
        setSearchQuery("")
        break
      case "completed-today":
        setCurrentFilter("selesai")
        setSearchQuery("")
        break
      default:
        setCurrentFilter("semua")
        setSearchQuery("")
    }
  }

  const stats = getTaskStats(tasks)

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}
    >
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onExport={handleExport}
        onImport={handleImport}
        completionRate={stats.completionRate}
        totalTasks={stats.total}
        completedTasks={stats.selesai}
      />

      <div className="flex">
        <TaskForm onSubmit={handleAddTask} isDarkMode={isDarkMode} />

        {/* Main Content - Full Width */}
        <div className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Daftar Tugas</h2>
                <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
                  Kelola produktivitas Anda
                </p>
              </div>
            </div>

            {selectedTasks.length > 0 && (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleClearSelection}
                  className="transition-all duration-200 hover:scale-105"
                >
                  Batal Pilih
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus ({selectedTasks.length})
                </Button>
              </div>
            )}
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              />
              <Input
                placeholder="Cari tugas, kategori, tag, prioritas, atau status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <Select value={currentFilter} onValueChange={(value: FilterType) => setCurrentFilter(value)}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua</SelectItem>
                <SelectItem value="belum">Belum</SelectItem>
                <SelectItem value="proses">Proses</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>

            <Select value={currentSort} onValueChange={(value: SortType) => setCurrentSort(value)}>
              <SelectTrigger className="w-48">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Terbaru</SelectItem>
                <SelectItem value="priority">Prioritas</SelectItem>
                <SelectItem value="dueDate">Deadline</SelectItem>
                <SelectItem value="title">Judul</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards - Full Width */}
          <div className="w-full">
            <StatsCards stats={stats} isDarkMode={isDarkMode} />
          </div>

          {/* Quick Actions - Below Stats */}
          <div className="w-full">
            <QuickActions tasks={tasks} onFilterChange={handleQuickFilter} isDarkMode={isDarkMode} />
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredAndSortedTasks.length === 0 ? (
              <div className={`${isDarkMode ? "bg-slate-800/50" : "bg-white"} rounded-xl p-12 text-center shadow-lg`}>
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{searchQuery ? "Tidak ada hasil" : "Belum ada tugas"}</h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {searchQuery
                    ? `Tidak ditemukan tugas dengan kata kunci "${searchQuery}"`
                    : "Mulai dengan menambahkan tugas baru untuk memulai produktivitas Anda!"}
                </p>
              </div>
            ) : (
              filteredAndSortedTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isSelected={selectedTasks.includes(task.id)}
                  isDarkMode={isDarkMode}
                  onSelect={(checked) => handleTaskSelect(task.id, checked)}
                  onEdit={() => handleEditTask(task)}
                  onDelete={() => handleDeleteTask(task.id)}
                  onNextStatus={() => handleNextStatus(task)}
                  onTogglePriority={() => handleTogglePriority(task)}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Task Dialog */}
      <EditTaskDialog
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleUpdateTask}
        isDarkMode={isDarkMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className={isDarkMode ? "bg-slate-800 border-slate-700 text-white" : ""}>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              Hapus Tugas Terpilih
            </AlertDialogTitle>
            <AlertDialogDescription className={isDarkMode ? "text-slate-300" : ""}>
              {selectedTasks.length} tugas akan dihapus permanen dan tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={isDarkMode ? "bg-slate-700 text-white hover:bg-slate-600" : ""}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelected} className="bg-red-500 hover:bg-red-600 text-white">
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus {selectedTasks.length}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Enhanced Toaster with better visibility in dark mode */}
      <Toaster
        toastOptions={{
          className: isDarkMode
            ? "bg-slate-800 text-white border-2 border-slate-700 shadow-lg shadow-black/20"
            : "bg-white text-gray-900 border-2 border-gray-200 shadow-lg",
          duration: 5000,
        }}
      />
    </div>
  )
}
