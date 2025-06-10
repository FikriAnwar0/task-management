import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import type { Task } from "@/types/task";
import { formatDate, isOverdue, getDaysUntilDue, formatTime } from "@/utils/taskUtils";

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  isDarkMode: boolean;
  onSelect: (checked: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  onNextStatus: () => void;
  onTogglePriority: () => void;
  index: number;
}

const TaskCard = ({
  task,
  isSelected,
  isDarkMode,
  onSelect,
  onEdit,
  onDelete,
  onNextStatus,
  onTogglePriority,
  index,
}: TaskCardProps) => {
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "belum":
        return <Circle className="h-4 w-4" />;
      case "proses":
        return <Clock className="h-4 w-4" />;
      case "selesai":
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const overdue = isOverdue(task.dueDate);
  const daysUntilDue = getDaysUntilDue(task.dueDate);

  return (
    <Card
      className={`
        transition-all duration-300 rounded-lg shadow-sm hover:shadow-md group relative overflow-hidden
        transform hover:scale-[1.02] hover:-translate-y-1
        w-full flex-1 min-w-0
        ${isDarkMode ? "bg-slate-900 text-white border border-slate-700" : "bg-white text-gray-900 border border-gray-200"}
        ${isSelected ? "ring-2 ring-blue-500/50 shadow-blue-500/20" : ""}
        ${overdue && task.status !== "selesai" ? "ring-2 ring-red-500/50 shadow-red-500/20" : ""}
        opacity-0 animate-fade-in
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {task.priority === "tinggi" && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-red-500 shadow-lg z-10">
          <Star className="absolute -top-4 -right-1 h-3.5 w-3.5 text-white drop-shadow" />
        </div>
      )}

      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className="mt-1.5 w-5 h-5 border-2 hover:scale-110 transition-all flex-shrink-0"
          />

          <div className="flex-1 min-w-0 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-3">
                <h3 className="font-bold text-base leading-tight tracking-tight">{task.title}</h3>
                {overdue && task.status !== "selesai" && (
                  <div className="flex items-center gap-1 text-red-500 animate-pulse bg-red-500/10 px-2 py-1 rounded border text-xs font-bold flex-shrink-0">
                    <AlertTriangle className="h-3 w-3" />
                    <span className="hidden sm:inline">TERLAMBAT</span>
                    <span className="sm:hidden">!</span>
                  </div>
                )}
              </div>

              {task.description && (
                <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-gray-700"} leading-relaxed`}>
                  {task.description}
                </p>
              )}
            </div>

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {task.tags.slice(0, 2).map((tag, idx) => (
                  <Badge key={idx} className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-700 border">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {task.tags.length > 2 && (
                  <Badge className="text-xs px-2 py-0.5 text-gray-600 bg-slate-200 border">
                    +{task.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge className="px-2.5 py-1 font-medium text-xs bg-white dark:bg-slate-700 text-black dark:text-white flex items-center gap-1.5">
                {getStatusIcon(task.status)}
                <span>{task.status}</span>
              </Badge>

              <Badge
                className="px-2.5 py-1 font-medium text-xs bg-white dark:bg-slate-700 text-black dark:text-white flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                onClick={onTogglePriority}
              >
                {task.priority === "tinggi" && <Star className="h-3.5 w-3.5" />}
                {task.priority === "sedang" && <Zap className="h-3.5 w-3.5" />}
                {task.priority === "rendah" && <Sparkles className="h-3.5 w-3.5" />}
                <span>{task.priority}</span>
              </Badge>

              <Badge className="px-2.5 py-1 font-medium text-xs bg-slate-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
                📁 {task.category}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              {task.dueDate && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
                    overdue
                      ? "bg-red-100 text-red-600"
                      : daysUntilDue <= 3
                        ? "bg-yellow-100 text-yellow-700"
                        : isDarkMode
                          ? "bg-slate-800 text-slate-300"
                          : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="font-medium">{formatDate(task.dueDate)}</span>
                </div>
              )}

              {task.timeSpent > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300">
                  <Timer className="h-3.5 w-3.5" />
                  <span className="font-medium">{formatTime(task.timeSpent)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center gap-2 pt-4 mt-1 border-t border-gray-200 dark:border-slate-700">
              <Button
                onClick={onTogglePriority}
                variant="ghost"
                size="sm"
                className="h-10 px-4 text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 flex items-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span className="font-medium">Prioritas</span>
              </Button>
              <Button
                onClick={onNextStatus}
                variant="ghost"
                size="sm"
                className="h-10 px-4 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">Status</span>
              </Button>
              <Button
                onClick={onEdit}
                variant="ghost"
                size="sm"
                className="h-10 px-4 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                <span className="font-medium">Edit</span>
              </Button>
              <Button
                onClick={onDelete}
                variant="ghost"
                size="sm"
                className="h-10 px-4 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-medium">Hapus</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;