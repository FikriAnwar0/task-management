"use client"
import { useRef } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { CheckSquare, Sun, Moon, Download, Upload, Zap, Shield, Crown } from "lucide-react"
import clsx from "clsx" // Assuming you have clsx installed for cleaner class management

interface HeaderProps {
  isDarkMode: boolean
  onToggleTheme: () => void
  onExport: () => void
  onImport: (data: any) => void
  // completionRate: number // Not used in the provided JSX, so removed
  // totalTasks: number // Not used in the provided JSX, so removed
  // completedTasks: number // Not used in the provided JSX, so removed
}

export const Header = ({ isDarkMode, onToggleTheme, onExport, onImport }: HeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        onImport(data)
      } catch (error) {
        console.error("Error parsing JSON file:", error)
        alert("File JSON tidak valid!")
      }
    }
    reader.readAsText(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const baseButtonClasses =
    "transition-all duration-300 hover:scale-105 hover:shadow-lg px-5 py-2.5 rounded-xl font-semibold group border-2"

  return (
    <header
      className={clsx(
        "backdrop-blur-3xl border-b-2 px-6 py-4 transition-all duration-300 sticky top-0 z-50 shadow-xl shadow-black/5",
        isDarkMode
          ? "bg-gradient-to-r from-slate-900/98 via-slate-800/98 to-slate-900/98 border-slate-700/60"
          : "bg-gradient-to-r from-white/98 via-gray-50/98 to-white/98 border-gray-200/60",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Professional Logo */}
          <div className="relative">
            <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-3 shadow-xl">
              <CheckSquare className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg">
              <Crown className="h-2.5 w-2.5 text-white" />
            </div>
          </div>

          {/* Enhanced Branding */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-3xl font-black text-transparent">
                Task Flow
              </h1>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900/30">
                  EASY
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-yellow-500" />
              <p
                className={clsx(
                  "text-sm font-semibold tracking-wide",
                  isDarkMode ? "text-slate-300" : "text-gray-700",
                )}
              >
                Manajemen Semua Tugas Tugas Kamu!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Professional Import Button */}
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          <Button
            variant="outline"
            size="lg"
            onClick={() => fileInputRef.current?.click()}
            className={clsx(
              baseButtonClasses,
              "hover:shadow-blue-500/20",
              isDarkMode
                ? "border-slate-600 bg-slate-800 hover:border-blue-500 hover:bg-slate-700"
                : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50",
            )}
          >
            <Upload className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:translate-y-[-2px]" />
            <span>Import</span>
          </Button>

          {/* Professional Export Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={onExport}
            className={clsx(
              baseButtonClasses,
              "hover:shadow-green-500/20",
              isDarkMode
                ? "border-slate-600 bg-slate-800 hover:border-green-500 hover:bg-slate-700"
                : "border-gray-300 bg-white hover:border-green-400 hover:bg-green-50",
            )}
          >
            <Download className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:translate-y-[2px]" />
            <span>Export</span>
          </Button>

          {/* Professional Theme Toggle */}
          <Button
            variant="outline"
            size="lg"
            onClick={onToggleTheme}
            className={clsx(
              baseButtonClasses,
              "hover:shadow-yellow-500/20",
              isDarkMode
                ? "border-slate-600 bg-slate-800 hover:border-yellow-500 hover:bg-slate-700"
                : "border-gray-300 bg-white hover:border-yellow-400 hover:bg-yellow-50",
            )}
          >
            <div className="transition-transform duration-300 group-hover:scale-110">
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-blue-600" />}
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}