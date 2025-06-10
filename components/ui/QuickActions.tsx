"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ListChecks, AlertTriangle, Star, Clock, CheckCircle2, TrendingUp, Zap, Layers } from "lucide-react"
import type { Task } from "@/types/task"

interface QuickActionsProps {
  tasks: Task[]
  onFilterChange: (filter: string) => void
  isDarkMode: boolean
}

export const QuickActions = ({ tasks, onFilterChange, isDarkMode }: QuickActionsProps) => {
  const isTaskOverdue = (task: Task): boolean => {
    if (!task.dueDate) return false
    if (task.status === "selesai") return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)

    return dueDate < today
  }

  const isCompletedToday = (task: Task): boolean => {
    if (!task.completedAt || task.status !== "selesai") return false

    const today = new Date()
    const completedDate = new Date(task.completedAt)

    return (
      today.getFullYear() === completedDate.getFullYear() &&
      today.getMonth() === completedDate.getMonth() &&
      today.getDate() === completedDate.getDate()
    )
  }

  const allTasks = tasks.length
  const overdueTasks = tasks.filter(isTaskOverdue)
  const highPriorityTasks = tasks.filter((task) => task.priority === "tinggi" && task.status !== "selesai")
  const inProgressTasks = tasks.filter((task) => task.status === "proses")
  const completedToday = tasks.filter(isCompletedToday)
  const completedTasks = tasks.filter((task) => task.status === "selesai")
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  const quickActions = [
    {
      title: "Semua Tugas",
      count: allTasks,
      icon: ListChecks,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-300 dark:border-blue-800",
      gradientFrom: "from-blue-500",
      gradientTo: "to-indigo-600",
      action: () => onFilterChange("all"),
      description: "Tampilkan semua tugas",
    },
    {
      title: "Terlambat",
      count: overdueTasks.length,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/30",
      borderColor: "border-red-300 dark:border-red-800",
      gradientFrom: "from-red-500",
      gradientTo: "to-rose-600",
      action: () => onFilterChange("overdue"),
      description: "Tugas yang melewati batas waktu",
    },
    {
      title: "Prioritas Tinggi",
      count: highPriorityTasks.length,
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
      borderColor: "border-orange-300 dark:border-orange-800",
      gradientFrom: "from-orange-500",
      gradientTo: "to-amber-600",
      action: () => onFilterChange("high-priority"),
      description: "Tugas dengan prioritas tinggi",
    },
    {
      title: "Sedang Proses",
      count: inProgressTasks.length,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      borderColor: "border-purple-300 dark:border-purple-800",
      gradientFrom: "from-purple-500",
      gradientTo: "to-violet-600",
      action: () => onFilterChange("in-progress"),
      description: "Tugas yang sedang dikerjakan",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      {/* Quick Actions Grid - Enhanced Design */}
      <Card
        className={`${
          isDarkMode ? "bg-slate-800/70 border-slate-700" : "bg-white border-gray-200"
        } shadow-xl rounded-xl overflow-hidden`}
      >
        <CardHeader className="pb-4 border-b border-slate-700/30 dark:border-slate-700/30 border-gray-200">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Aksi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              const isActive = action.count > 0

              return (
                <Button
                  key={action.title}
                  onClick={action.action}
                  variant="ghost"
                  disabled={!isActive && action.title !== "Semua Tugas"}
                  className={`
                    relative h-auto p-4 flex-col items-center justify-center gap-3 transition-all duration-300
                    hover:scale-[1.03] hover:shadow-lg group overflow-hidden
                    ${action.bgColor} border-2 ${action.borderColor} rounded-xl
                    ${!isActive && action.title !== "Semua Tugas" ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  title={action.description}
                >
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${action.gradientFrom} ${action.gradientTo} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  {/* Icon with enhanced styling */}
                  <div
                    className={`
                    relative z-10 p-3 rounded-xl ${action.bgColor} border ${action.borderColor}
                    shadow-lg group-hover:shadow-xl transition-all duration-300
                    group-hover:scale-110 group-hover:-translate-y-1
                  `}
                  >
                    <Icon className={`h-6 w-6 ${action.color}`} />
                  </div>

                  {/* Count with enhanced styling */}
                  <div className="relative z-10 text-center">
                    <div
                      className={`font-bold text-2xl mb-1 group-hover:scale-110 transition-transform duration-300 ${
                        action.title === "Terlambat" && action.count > 0 ? "text-red-600 animate-pulse" : ""
                      }`}
                    >
                      {action.count}
                    </div>
                    <div className={`text-sm font-medium ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                      {action.title}
                    </div>
                  </div>

                  {/* Indicator untuk tugas terlambat */}
                  {action.title === "Terlambat" && action.count > 0 && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  )}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Produktivitas - Enhanced Design */}
      <Card
        className={`${
          isDarkMode ? "bg-slate-800/70 border-slate-700" : "bg-white border-gray-200"
        } shadow-xl rounded-xl overflow-hidden flex flex-col`}
      >
        <CardHeader className="pb-4 border-b border-slate-700/30 dark:border-slate-700/30 border-gray-200">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            Dashboard Produktivitas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="flex items-center gap-6 h-full">
            {/* Vertical Progress Bar - Enhanced */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <div className="relative w-14 h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-inner border border-gray-300 dark:border-gray-600">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-green-600 to-emerald-400 rounded-xl transition-all duration-1000 ease-out"
                  style={{ height: `${completionRate}%` }}
                ></div>

                {/* Progress markers */}
                <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
                  <div className="w-4 h-0.5 bg-gray-400 dark:bg-gray-500 rounded-full ml-1"></div>
                  <div className="w-4 h-0.5 bg-gray-400 dark:bg-gray-500 rounded-full ml-1"></div>
                  <div className="w-4 h-0.5 bg-gray-400 dark:bg-gray-500 rounded-full ml-1"></div>
                  <div className="w-4 h-0.5 bg-gray-400 dark:bg-gray-500 rounded-full ml-1"></div>
                </div>

                {/* Percentage indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white dark:bg-slate-800 rounded-full h-10 w-10 flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-bold text-green-600 dark:text-green-400">{completionRate}%</div>
                  </div>
                </div>
              </div>
              <div className={`text-sm mt-3 ${isDarkMode ? "text-slate-300" : "text-gray-700"} font-medium`}>
                Progress
              </div>
            </div>

            {/* Stats - Full Height with Larger Items - Enhanced */}
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base font-semibold">Selesai Hari Ini</span>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 font-bold text-lg px-3 py-1 shadow-sm">
                  {completedToday.length}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <Layers className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base font-semibold">Total Tugas</span>
                </div>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 font-bold text-lg px-3 py-1 shadow-sm">
                  {tasks.length}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base font-semibold">Terlambat</span>
                </div>
                <Badge
                  className={`font-bold text-lg px-3 py-1 shadow-sm ${
                    overdueTasks.length > 0
                      ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 animate-pulse"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {overdueTasks.length}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}