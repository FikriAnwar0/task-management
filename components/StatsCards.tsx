import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  List, Circle, Clock, CheckCircle2, AlertTriangle, TrendingUp, Target,
} from "lucide-react"
import type { TaskStats } from "@/types/task"

interface StatsCardsProps {
  stats: TaskStats
  isDarkMode: boolean
}

const colorMap = (rate: number) => {
  if (rate >= 80) return ["emerald", "emerald-600"]
  if (rate >= 60) return ["blue", "blue-600"]
  if (rate >= 40) return ["yellow", "yellow-600"]
  if (rate >= 20) return ["orange", "orange-600"]
  return ["red", "red-600"]
}

export const StatsCards = ({ stats, isDarkMode }: StatsCardsProps) => {
  const [bg, text] = colorMap(stats.completionRate)

  const items = [
    {
      label: "Progress", count: `${stats.completionRate}%`, subtitle: `${stats.selesai}/${stats.total} selesai`,
      icon: TrendingUp, isProgress: true, color: `text-${text}`,
      bg: `bg-${bg}-50 dark:bg-${bg}-900/20 border-${bg}-200 dark:border-${bg}-800`
    },
    { label: "Total Tugas", count: stats.total, subtitle: "Total keseluruhan", icon: List, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" },
    { label: "Belum Mulai", count: stats.belum, subtitle: "Siap dikerjakan", icon: Circle, color: "text-gray-600", bg: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800" },
    { label: "Sedang Proses", count: stats.proses, subtitle: "Sedang dikerjakan", icon: Clock, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" },
    { label: "Selesai", count: stats.selesai, subtitle: "Telah diselesaikan", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" },
    { label: "Terlambat", count: stats.overdue, subtitle: "Perlu perhatian", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map(({ label, count, subtitle, icon: Icon, isProgress, color, bg }, i) => (
        <Card
          key={label}
          className={`shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 opacity-0 animate-fade-in
            ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-gray-200"}`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex justify-between mb-3">
              <div className={`p-2 rounded-lg border ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              {isProgress && <Target className={`h-4 w-4 ${color}`} />}
            </div>
            <div className="space-y-1">
              <p className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>{label}</p>
              <p className="text-2xl font-bold">{count}</p>
              <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-gray-500"}`}>{subtitle}</p>
            </div>
            {isProgress ? (
              <div className="mt-3 space-y-1">
                <Progress value={stats.completionRate} className="h-1.5" />
                <div className="flex justify-between text-xs">
                  <span className={isDarkMode ? "text-slate-400" : "text-gray-500"}>0%</span>
                  <span className={isDarkMode ? "text-slate-400" : "text-gray-500"}>100%</span>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <Badge variant="secondary" className={`${color} text-xs`}>
                  {+count > 0 ? "Aktif" : "Kosong"}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
