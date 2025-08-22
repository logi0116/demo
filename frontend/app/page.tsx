"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Languages, FileText, Sparkles, Keyboard, Wand2 } from "lucide-react"
import { TranslationPanel } from "@/components/translation-panel"
import { SummarizationPanel } from "@/components/summarization-panel"
import { ParaphrasePanel } from "@/components/paraphrase-panel"
import { ThemeToggle } from "@/components/theme-toggle"
import { TranslationSkeleton, SummarizationSkeleton } from "@/components/loading-skeleton"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [inputText, setInputText] = useState("")
  const [activeTab, setActiveTab] = useState("translate")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "1":
            event.preventDefault()
            setActiveTab("translate")
            toast({
              title: "번역 탭으로 전환",
              description: "Ctrl/Cmd + 1",
            })
            break
          case "2":
            event.preventDefault()
            setActiveTab("summarize")
            toast({
              title: "요약 탭으로 전환",
              description: "Ctrl/Cmd + 2",
            })
            break
          case "3":
            event.preventDefault()
            setActiveTab("paraphrase")
            toast({
              title: "의역 탭으로 전환",
              description: "Ctrl/Cmd + 3",
            })
            break
          case "k":
            event.preventDefault()
            toast({
              title: "키보드 단축키",
              description: "Ctrl/Cmd + 1: 번역, Ctrl/Cmd + 2: 요약, Ctrl/Cmd + 3: 의역",
            })
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toast])

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg transition-transform hover:scale-105">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">TextAI</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  번역, 요약, 의역을 위한 AI 도구
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                <Keyboard className="w-3 h-3" />
                <span>Ctrl+K</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="h-10 bg-muted rounded-lg w-80 animate-pulse"></div>
              </div>
              {activeTab === "translate" ? <TranslationSkeleton /> : <SummarizationSkeleton />}
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {/* Feature Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-12 sm:h-auto">
                  <TabsTrigger value="translate" className="flex items-center gap-2 text-sm sm:text-base py-2 sm:py-3">
                    <Languages className="w-4 h-4" />
                    <span className="hidden sm:inline">번역</span>
                    <span className="sm:hidden">번역</span>
                  </TabsTrigger>
                  <TabsTrigger value="summarize" className="flex items-center gap-2 text-sm sm:text-base py-2 sm:py-3">
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">요약</span>
                    <span className="sm:hidden">요약</span>
                  </TabsTrigger>
                  <TabsTrigger value="paraphrase" className="flex items-center gap-2 text-sm sm:text-base py-2 sm:py-3">
                    <Wand2 className="w-4 h-4" />
                    <span className="hidden sm:inline">의역</span>
                    <span className="sm:hidden">의역</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="translate" className="mt-0 focus-visible:outline-none">
                  <div className="animate-in fade-in-50 duration-300">
                    <TranslationPanel inputText={inputText} setInputText={setInputText} />
                  </div>
                </TabsContent>

                <TabsContent value="summarize" className="mt-0 focus-visible:outline-none">
                  <div className="animate-in fade-in-50 duration-300">
                    <SummarizationPanel inputText={inputText} setInputText={setInputText} />
                  </div>
                </TabsContent>

                <TabsContent value="paraphrase" className="mt-0 focus-visible:outline-none">
                  <div className="animate-in fade-in-50 duration-300">
                    <ParaphrasePanel inputText={inputText} setInputText={setInputText} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>TextAI - AI 기반 텍스트 처리 도구</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">
                키보드 단축키: Ctrl+1 (번역), Ctrl+2 (요약), Ctrl+3 (의역), Ctrl+K (도움말)
              </span>
              <span className="text-xs">v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toaster component for notifications */}
      <Toaster />
    </div>
  )
}
