"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Edit,
  Trash2,
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  Calendar,
  Tag,
  AlertTriangle,
  Timer,
  Star,
  Sparkles,
  Zap,
  Flame,
} from "lucide-react"
import type { Task } from "@/types/task"
import { formatDate, isOverdue, getDaysUntilDue, formatTime } from "@/utils/taskUtils"

interface TaskCardProps {
  task: Task
  isSelected: boolean
  onSelect: (checked: boolean) => void
  onEdit: () => void
  onDelete: () => void
  onNextStatus: () => void
  onTogglePriority: () => void
  index: number
}

export const TaskCard = ({
  task,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onNextStatus,
  onTogglePriority,
  index,
}: TaskCardProps) => {
  const overdue = isOverdue(task.dueDate)
  const daysUntilDue = getDaysUntilDue(task.dueDate)

  const statusIcons = {
    belum: <Circle className="h-4 w-4" />,
    proses: <Clock className="h-4 w-4" />,
    selesai: <CheckCircle2 className="h-4 w-4" />,
  }

  const priorityIcons = {
    tinggi: <Star className="h-4 w-4 text-red-500" />,
    sedang: <Zap className="h-4 w-4 text-yellow-500" />,
    rendah: <Sparkles className="h-4 w-4 text-green-400" />,
  }

  const dueBadgeColor = overdue
    ? "bg-red-100 text-red-600"
    : daysUntilDue <= 3
    ? "bg-yellow-100 text-yellow-700"
    : "bg-gray-100 text-gray-700"

  return (
    <Card
      className={`transition transform hover:scale-[1.02] hover:-translate-y-1 rounded-lg shadow-sm w-full flex-1 min-w-0 bg-white text-gray-900 border border-gray-200
      ${isSelected ? "ring-2 ring-blue-500/50 shadow-blue-500/20" : ""}
      ${overdue && task.status !== "selesai" ? "ring-2 ring-red-500/50 shadow-red-500/20" : ""}
      opacity-0 animate-fade-in`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {task.priority === "tinggi" && (
        <div className="absolute top-0 right-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-red-500 z-10 shadow-lg">
          <Star className="absolute -top-4 -right-1 h-4 w-4 text-white drop-shadow" />
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Checkbox checked={isSelected} onCheckedChange={onSelect} className="mt-1.5 w-5 h-5" />
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex justify-between items-start gap-3">
              <h3 className="font-semibold text-lg truncate">{task.title}</h3>
              {overdue && task.status !== "selesai" && (
                <Badge variant="destructive" className="flex items-center gap-1 text-xs font-bold px-2 py-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>TERLAMBAT</span>
                </Badge>
              )}
            </div>
            {task.description && <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {task.tags.slice(0, 2).map((tag, i) => (
                  <Badge key={i} className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
                {task.tags.length > 2 && (
                  <Badge className="text-xs px-2 py-0.5 border bg-gray-200 text-gray-700">+{task.tags.length - 2}</Badge>
                )}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                {statusIcons[task.status]}
                <span>{task.status}</span>
              </Badge>
              <Badge
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200"
                onClick={onTogglePriority}
              >
                {priorityIcons[task.priority]}
                <span>{task.priority}</span>
              </Badge>
              <Badge className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                📁 {task.category}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
              {task.dueDate && (
                <Badge className={`flex items-center gap-1 px-2 py-1 rounded ${dueBadgeColor}`}>
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(task.dueDate)}</span>
                </Badge>
              )}
              {task.timeSpent > 0 && (
                <Badge className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100">
                  <Timer className="h-3.5 w-3.5" />
                  <span>{formatTime(task.timeSpent)}</span>
                </Badge>
              )}
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Button variant="ghost" size="sm" onClick={onTogglePriority} className="text-orange-500 hover:bg-orange-50 flex items-center gap-1">
                <Flame className="w-4 h-4" /> Prioritas
              </Button>
              <Button variant="ghost" size="sm" onClick={onNextStatus} className="text-blue-500 hover:bg-blue-50 flex items-center gap-1">
                <ArrowRight className="w-4 h-4" /> Status
              </Button>
              <Button variant="ghost" size="sm" onClick={onEdit} className="text-yellow-500 hover:bg-yellow-50 flex items-center gap-1">
                <Edit className="w-4 h-4" /> Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-500 hover:bg-red-50 flex items-center gap-1">
                <Trash2 className="w-4 h-4" /> Hapus
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}