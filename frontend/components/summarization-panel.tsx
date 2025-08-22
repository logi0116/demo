"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { FileText, Copy, BarChart3, List, Hash, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { summarizeText } from "@/lib/api"

interface SummarizationPanelProps {
  inputText: string
  setInputText: (text: string) => void
}

const summaryTypes = [
  { value: "brief", label: "간단 요약", icon: FileText, description: "핵심 내용만 간단히" },
  { value: "detailed", label: "상세 요약", icon: List, description: "주요 포인트를 자세히" },
  { value: "keywords", label: "키워드 추출", icon: Hash, description: "중요 키워드만 추출" },
  { value: "bullets", label: "불릿 포인트", icon: BarChart3, description: "요점을 목록으로" },
]

export function SummarizationPanel({ inputText, setInputText }: SummarizationPanelProps) {
  const [summaryType, setSummaryType] = useState("brief")
  const [summaryLength, setSummaryLength] = useState([50])
  const [summarizedText, setSummarizedText] = useState("")
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")
  const [summaryStats, setSummaryStats] = useState<{
    originalLength: number
    summarizedLength: number
    compressionRatio: number
    keywordCount?: number
  } | null>(null)
  const { toast } = useToast()

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError("요약할 텍스트를 입력해주세요.")
      return
    }

    if (inputText.length < 50) {
      setError("요약하기에는 텍스트가 너무 짧습니다. (최소 50자)")
      return
    }

    setIsSummarizing(true)
    setError("")
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 8
      })
    }, 200)

    try {
      const result = await summarizeText({
        text: inputText,
        summaryType,
        summaryLength: summaryLength[0],
      })

      setProgress(100)
      setSummarizedText(result.summarizedText)
      setSummaryStats({
        originalLength: result.originalLength,
        summarizedLength: result.summarizedLength,
        compressionRatio: result.compressionRatio,
        keywordCount: result.keywordCount,
      })

      const selectedType = summaryTypes.find((t) => t.value === summaryType)
      toast({
        title: "요약 완료",
        description: `${selectedType?.label}이 성공적으로 완료되었습니다.`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "요약 중 오류가 발생했습니다."
      setError(errorMessage)
      console.error("Summarization error:", err)
    } finally {
      clearInterval(progressInterval)
      setIsSummarizing(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const handleCopy = async () => {
    if (summarizedText) {
      await navigator.clipboard.writeText(summarizedText)
      toast({
        title: "복사 완료",
        description: "요약된 텍스트가 클립보드에 복사되었습니다.",
      })
    }
  }

  const selectedTypeInfo = summaryTypes.find((t) => t.value === summaryType)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Settings */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            요약 설정
          </CardTitle>
          <CardDescription>요약 방식과 길이를 선택하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary Type Selection */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">요약 방식</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {summaryTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    onClick={() => setSummaryType(type.value)}
                    className={`p-3 rounded-lg border text-left transition-all duration-200 hover:scale-[1.02] ${
                      summaryType === type.value
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{type.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Summary Length Slider (only for brief and detailed) */}
          {(summaryType === "brief" || summaryType === "detailed") && (
            <div className="animate-in fade-in-50 duration-300">
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                요약 길이: {summaryLength[0]}%
              </label>
              <Slider
                value={summaryLength}
                onValueChange={setSummaryLength}
                max={80}
                min={20}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>간단</span>
                <span>상세</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">텍스트 입력</CardTitle>
          <CardDescription>요약하고 싶은 텍스트를 입력하세요 (최소 50자)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="요약할 텍스트를 입력하세요..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px] resize-none transition-all duration-200 focus:ring-2"
          />

          {isSummarizing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">요약 진행 중...</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {inputText.length} 글자
              </Badge>
              {inputText.length >= 50 && (
                <Badge variant="outline" className="text-xs text-green-600">
                  요약 가능
                </Badge>
              )}
              {inputText.length > 2000 && (
                <Badge variant="outline" className="text-xs text-amber-600">
                  긴 텍스트
                </Badge>
              )}
            </div>
            <Button
              onClick={handleSummarize}
              disabled={!inputText.trim() || inputText.length < 50 || isSummarizing}
              className="min-w-[100px] transition-all duration-200"
            >
              {isSummarizing ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  요약 중...
                </div>
              ) : (
                "요약하기"
              )}
            </Button>
          </div>
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 animate-in fade-in-50">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {summarizedText && (
        <Card className="transition-all duration-200 hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-4">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {selectedTypeInfo && <selectedTypeInfo.icon className="w-5 h-5 text-primary" />}
                {selectedTypeInfo?.label} 결과
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="transition-all duration-200 hover:scale-105 bg-transparent"
              >
                <Copy className="w-4 h-4 mr-2" />
                복사
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg transition-colors duration-200">
              <pre className="text-foreground leading-relaxed whitespace-pre-wrap font-sans">{summarizedText}</pre>
            </div>
            {summaryStats && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {selectedTypeInfo?.label}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {summaryStats.summarizedLength} 글자
                </Badge>
                {summaryStats.keywordCount && summaryStats.keywordCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {summaryStats.keywordCount}개 키워드
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  압축률: {summaryStats.compressionRatio}%
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
