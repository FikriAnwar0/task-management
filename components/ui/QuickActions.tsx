"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ListChecks, AlertTriangle, Star, Clock, CheckCircle2, TrendingUp, Zap, Layers } from "lucide-react"
import type { Task } from "@/types/task"
import { Tooltip } from "@/components/ui/tooltip" // Assuming you have a Tooltip component

interface QuickActionsProps {
  tasks: Task[]
  onFilterChange: (filter: string) => void
  isDarkMode: boolean
}

export const QuickActions = ({ tasks, onFilterChange, isDarkMode }: QuickActionsProps) => {
  const isTaskOverdue = (t: Task) => t.dueDate && t.status !== "selesai" && new Date(t.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
  const isCompletedToday = (t: Task) => {
    if (!t.completedAt || t.status !== "selesai") return false
    const d = new Date(), c = new Date(t.completedAt)
    return d.getFullYear() === c.getFullYear() && d.getMonth() === c.getMonth() && d.getDate() === c.getDate()
  }

  const all = tasks.length,
    overdue = tasks.filter(isTaskOverdue),
    high = tasks.filter(t => t.priority === "tinggi" && t.status !== "selesai"),
    progress = tasks.filter(t => t.status === "proses"),
    doneToday = tasks.filter(isCompletedToday),
    done = tasks.filter(t => t.status === "selesai"),
    rate = all > 0 ? Math.round((done.length / all) * 100) : 0

  const quickActions = [
    { title: "Semua Tugas", count: all, icon: ListChecks, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/30", border: "border-blue-300 dark:border-blue-800", from: "from-blue-500", to: "to-indigo-600", key: "all" },
    { title: "Terlambat", count: overdue.length, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/30", border: "border-red-300 dark:border-red-800", from: "from-red-500", to: "to-rose-600", key: "overdue" },
    { title: "Prioritas Tinggi", count: high.length, icon: Star, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/30", border: "border-orange-300 dark:border-orange-800", from: "from-orange-500", to: "to-amber-600", key: "high-priority" },
    { title: "Sedang Proses", count: progress.length, icon: Clock, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/30", border: "border-purple-300 dark:border-purple-800", from: "from-purple-500", to: "to-violet-600", key: "in-progress" }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className={`${isDarkMode ? "bg-slate-800/70 border-slate-700" : "bg-white border-gray-200"} shadow-xl`}>
        <CardHeader className="pb-4 border-b border-slate-700/30">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Aksi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          {quickActions.map(({ title, count, icon: Icon, color, bg, border, from, to, key }) => (
            <Tooltip key={title} content={title}>
              <Button
                onClick={() => onFilterChange(key)}
                disabled={!count && key !== "all"}
                variant="ghost"
                className={`relative flex flex-col items-center gap-3 p-4 border-2 rounded-xl transition-all group ${bg} ${border} ${!count && key !== "all" ? "opacity-50" : ""} hover:scale-105`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${from} ${to} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className={`relative p-3 rounded-xl border ${border} ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div className="relative z-10 text-center">
                  <div className={`text-2xl font-bold ${title === "Terlambat" && count ? "text-red-600 animate-pulse" : ""}`}>{count}</div>
                  <div className={`text-sm font-medium ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>{title}</div>
                </div>
                {title === "Terlambat" && count > 0 && <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping" />}
              </Button>
            </Tooltip>
          ))}
        </CardContent>
      </Card>

      <Card className={`${isDarkMode ? "bg-slate-800/70 border-slate-700" : "bg-white border-gray-200"} shadow-xl flex flex-col`}>
        <CardHeader className="pb-4 border-b border-slate-700/30">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            Dashboard Produktivitas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex p-4 gap-6">
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-40 rounded-2xl border overflow-hidden bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-green-600 to-emerald-400 transition-all" style={{ height: `${rate}%` }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{rate}%</span>
                </div>
              </div>
            </div>
            <span className={`mt-3 text-sm font-medium ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>Progress</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            {[{
              icon: CheckCircle2, label: "Selesai Hari Ini", value: doneToday.length, color: "green"
            }, {
              icon: Layers, label: "Total Tugas", value: all, color: "blue"
            }, {
              icon: AlertTriangle, label: "Terlambat", value: overdue.length, color: "red"
            }].map(({ icon: Icon, label, value, color }, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-xl border shadow-md bg-${color}-50 dark:bg-${color}-900/20 border-${color}-200 dark:border-${color}-800`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-600`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base font-semibold">{label}</span>
                </div>
                <Badge className={`font-bold text-lg px-3 py-1 ${value > 0 ? `bg-${color}-100 text-${color}-700 dark:bg-${color}-900/40 dark:text-${color}-400` : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                  {value}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}