"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Tag, Flame, Zap, Save, X, Plus } from "lucide-react"
import type { Task } from "@/types/task"

interface EditTaskDialogProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onSave: (updates: Partial<Task>) => void
  isDarkMode: boolean
}

export const EditTaskDialog = ({ task, isOpen, onClose, onSave, isDarkMode }: EditTaskDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "sedang" as Task["priority"],
    status: "belum" as Task["status"],
    category: "",
    dueDate: "",
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        category: task.category,
        dueDate: task.dueDate || "",
        tags: [...task.tags],
      })
    }
  }, [task])

  const handleSave = () => {
    if (!task || !formData.title.trim()) return

    onSave({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      category: formData.category.trim() || "Umum",
      dueDate: formData.dueDate || undefined,
      tags: formData.tags.filter((tag) => tag.trim() !== ""),
    })
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }
  
  const inputClasses = isDarkMode
    ? "bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
    : "bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-500"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          ${isDarkMode ? "bg-slate-800/95 border-slate-700" : "bg-white/95 border-gray-200"} 
          backdrop-blur-xl max-w-md transition-all duration-300 p-6
        `}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Edit Tugas
          </DialogTitle>
          <DialogDescription className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Perbarui detail tugas Anda dengan informasi terbaru
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Judul Tugas
            </Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Masukkan judul tugas..."
              className={`${inputClasses} transition-all duration-200 focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-sm font-medium">
              Deskripsi
            </Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Jelaskan detail tugas..."
              rows={3}
              className={`${inputClasses} transition-all duration-200 resize-none`}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="edit-category" className="text-sm font-medium">
              Kategori
            </Label>
            <Input
              id="edit-category"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Contoh: Pekerjaan, Pribadi, Belajar..."
              className={`${inputClasses} transition-all duration-200`}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="edit-dueDate" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Tanggal Deadline
            </Label>
            <Input
              id="edit-dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
              className={`${inputClasses} transition-all duration-200`}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Tag className="h-4 w-4 text-purple-500" />
              Tags
            </Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Tambah tag..."
                className={`${inputClasses} flex-1 transition-all duration-200`}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button
                type="button"
                onClick={addTag}
                size="sm"
                variant="outline"
                className="transition-all duration-200 hover:scale-105"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 cursor-pointer hover:bg-red-500/20 transition-all duration-200"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Prioritas
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className={`${inputClasses} transition-all duration-200`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className={`${isDarkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"} backdrop-blur-xl`}
                >
                  <SelectItem value="rendah">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Rendah
                    </div>
                  </SelectItem>
                  <SelectItem value="sedang">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Sedang
                    </div>
                  </SelectItem>
                  <SelectItem value="tinggi">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Tinggi
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-500" />
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className={`${inputClasses} transition-all duration-200`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className={`${isDarkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"} backdrop-blur-xl`}
                >
                  <SelectItem value="belum">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Belum
                    </div>
                  </SelectItem>
                  <SelectItem value="proses">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Proses
                    </div>
                  </SelectItem>
                  <SelectItem value="selesai">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Selesai
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className={`${isDarkMode ? "border-slate-600 hover:bg-slate-700" : "border-gray-200 hover:bg-gray-50"} transition-all duration-200`}
          >
            <X className="h-4 w-4 mr-2" />
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.title.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Save className="h-4 w-4 mr-2" />
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}