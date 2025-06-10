import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { List, Circle, Clock, CheckCircle2, AlertTriangle, TrendingUp, Target } from "lucide-react"
import type { TaskStats } from "@/types/task"

interface StatsCardsProps {
  stats: TaskStats
  isDarkMode: boolean
}

export const StatsCards = ({ stats, isDarkMode }: StatsCardsProps) => {
  const getProgressColor = (rate: number) => {
    if (rate >= 80) return "text-emerald-600"
    if (rate >= 60) return "text-blue-600"
    if (rate >= 40) return "text-yellow-600"
    if (rate >= 20) return "text-orange-600"
    return "text-red-600"
  }

  const getProgressBg = (rate: number) => {
    if (rate >= 80) return "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
    if (rate >= 60) return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    if (rate >= 40) return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
    if (rate >= 20) return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
    return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
  }

  const statsData = [
    {
      label: "Progress",
      count: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: getProgressColor(stats.completionRate),
      bgColor: getProgressBg(stats.completionRate),
      subtitle: `${stats.selesai}/${stats.total} selesai`,
      isProgress: true,
    },
    {
      label: "Total Tugas",
      count: stats.total,
      icon: List,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      subtitle: "Total keseluruhan",
    },
    {
      label: "Belum Mulai",
      count: stats.belum,
      icon: Circle,
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800",
      subtitle: "Siap dikerjakan",
    },
    {
      label: "Sedang Proses",
      count: stats.proses,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      subtitle: "Sedang dikerjakan",
    },
    {
      label: "Selesai",
      count: stats.selesai,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      subtitle: "Telah diselesaikan",
    },
    {
      label: "Terlambat",
      count: stats.overdue,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      subtitle: "Perlu perhatian",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className={`
              ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-gray-200"} 
              shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
              opacity-0 animate-fade-in
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor} border`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                {stat.isProgress && <Target className={`h-4 w-4 ${stat.color}`} />}
              </div>

              <div className="space-y-1">
                <p
                  className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}
                >
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.count}</p>
                <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-gray-500"}`}>{stat.subtitle}</p>
              </div>

              {/* Progress Bar for Progress Card */}
              {stat.isProgress && (
                <div className="mt-3 space-y-1">
                  <Progress value={stats.completionRate} className="h-1.5" />
                  <div className="flex justify-between text-xs">
                    <span className={isDarkMode ? "text-slate-400" : "text-gray-500"}>0%</span>
                    <span className={isDarkMode ? "text-slate-400" : "text-gray-500"}>100%</span>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              {!stat.isProgress && (
                <div className="mt-3">
                  <Badge variant="secondary" className={`${stat.color} text-xs`}>
                    {stat.count > 0 ? "Aktif" : "Kosong"}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
