import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  List, Circle, Clock, CheckCircle2, AlertTriangle, TrendingUp, Target,
  Info, ArrowUpRight, ArrowDownLeft,
} from "lucide-react"
import type { TaskStats } from "@/types/task"
import clsx from "clsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StatsCardsProps {
  stats: TaskStats
  isDarkMode: boolean
  lastUpdated?: string
}

const colorMap = (rate: number) => {
  if (rate >= 80) return ["emerald", "emerald-600", "from-emerald-500 to-emerald-700"]
  if (rate >= 60) return ["blue", "blue-600", "from-blue-500 to-blue-700"]
  if (rate >= 40) return ["yellow", "yellow-600", "from-yellow-500 to-yellow-700"]
  if (rate >= 20) return ["orange", "orange-600", "from-orange-500 to-orange-700"]
  return ["red", "red-600", "from-red-500 to-red-700"]
}

export const StatsCards = ({ stats, isDarkMode, lastUpdated }: StatsCardsProps) => {
  const [bg, text, gradient] = colorMap(stats.completionRate)

  const items = [
    {
      label: "Progress",
      count: `${stats.completionRate}%`,
      subtitle: `${stats.selesai}/${stats.total} selesai`,
      icon: TrendingUp,
      isProgress: true,
      color: text,
      gradient,
      trend: "up",
    },
    {
      label: "Total Tugas",
      count: stats.total,
      subtitle: "Total keseluruhan",
      icon: List,
      color: "blue-600",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      label: "Belum Mulai",
      count: stats.belum,
      subtitle: "Siap dikerjakan",
      icon: Circle,
      color: "gray-500",
      gradient: "from-gray-400 to-gray-600",
    },
    {
      label: "Sedang Proses",
      count: stats.proses,
      subtitle: stats.proses > 0 ? "Diperkirakan selesai dalam 1-2 hari" : "Tidak ada aktivitas",
      icon: Clock,
      color: "orange-600",
      gradient: "from-orange-400 to-orange-600",
      statusDot: true,
    },
    {
      label: "Selesai",
      count: stats.selesai,
      subtitle: "Telah diselesaikan",
      icon: CheckCircle2,
      color: "green-600",
      gradient: "from-green-400 to-green-600",
      trend: "up",
    },
    {
      label: "Terlambat",
      count: stats.overdue,
      subtitle: "Perlu perhatian",
      icon: AlertTriangle,
      color: "red-600",
      gradient: "from-red-400 to-red-600",
      trend: stats.overdue > 0 ? "down" : null,
    },
  ]

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {items.map(({ label, count, subtitle, icon: Icon, isProgress, color, gradient, trend, statusDot }, i) => (
          <Card
            key={label}
            onClick={() => alert(`Lihat detail: ${label}`)} // Bisa diganti dengan router.push()
            className={clsx(
              "relative overflow-hidden group cursor-pointer border transition-all duration-300",
              isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200",
              "rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 animate-fade-in opacity-0"
            )}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl group-hover:scale-125 transition-transform bg-gradient-to-tr ${gradient}`}
            ></div>

            <CardContent className="relative z-10 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl bg-gradient-to-tr ${gradient} text-white shadow`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex items-center space-x-1">
                  {statusDot && <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />}
                  {trend === "up" && <ArrowUpRight className={`h-4 w-4 text-green-500`} />}
                  {trend === "down" && <ArrowDownLeft className={`h-4 w-4 text-red-500`} />}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">{subtitle}</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div>
                <p className={clsx("text-xs font-semibold uppercase tracking-wide", isDarkMode ? "text-slate-400" : "text-gray-500")}>{label}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{count}</h3>
                <p className={clsx("text-sm", isDarkMode ? "text-slate-500" : "text-gray-500")}>{subtitle}</p>
              </div>

              {isProgress ? (
                <div className="space-y-1">
                  <Progress value={stats.completionRate} className="h-1.5 rounded-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              ) : (
                <div>
                  <Badge
                    variant="secondary"
                    className={`bg-${color} text-white font-medium px-2 py-0.5 text-xs rounded-full`}
                  >
                    {+count > 0 ? "Aktif" : "Kosong"}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {lastUpdated && (
        <div className="mt-4 text-xs text-muted-foreground text-right">
          Terakhir diperbarui: {lastUpdated}
        </div>
      )}
    </TooltipProvider>
  )
}
