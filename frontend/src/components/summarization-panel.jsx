"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Slider } from "./ui/slider"
import { Progress } from "./ui/progress"
import { FileText, Copy, BarChart3, List, Hash, RefreshCw } from "lucide-react"
import { useToast } from "../hooks/use-toast"
import { demoSummarizationData } from "../lib/mock-data" // 목업 데이터 가져오기

const summaryTypes = [
  { value: "brief", label: "간단 요약", icon: FileText, description: "핵심 내용만 간단히" },
  { value: "detailed", label: "상세 요약", icon: List, description: "주요 포인트를 자세히" },
  { value: "keywords", label: "키워드 추출", icon: Hash, description: "중요 키워드만 추출" },
  { value: "bullets", label: "불릿 포인트", icon: BarChart3, description: "요점을 목록으로" },
]

export function SummarizationPanel({ inputText, setInputText }) {
  const [summaryType, setSummaryType] = useState("brief")
  const [summaryLength, setSummaryLength] = useState([50])
  const [mappedSentences, setMappedSentences] = useState([])
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const { toast } = useToast()

  const handleSummarize = async () => {
    // 목업 데이터를 사용하므로 실제 API 호출 로직은 주석 처리하거나 제거합니다.
    setIsSummarizing(true)
    setError("")
    setProgress(30)

    // 원본 텍스트를 목업 데이터의 원본 텍스트로 설정
    setInputText(demoSummarizationData.original_text)
    
    setTimeout(() => {
      setProgress(100)
      setMappedSentences(demoSummarizationData.mappedSentences)
      setIsSummarizing(false)
      toast({
        title: "요약 완료",
        description: "목업 데이터로 요약 결과를 표시합니다.",
      })
    }, 500)
  }

  const getSummarizedText = () => {
    return mappedSentences.map(s => s.summary).filter(Boolean).join(" ")
  }

  const handleCopy = async () => {
    const summary = getSummarizedText()
    if (summary) {
      await navigator.clipboard.writeText(summary)
      toast({
        title: "복사 완료",
        description: "요약된 텍스트가 클립보드에 복사되었습니다.",
      })
    }
  }

  const selectedTypeInfo = summaryTypes.find((t) => t.value === summaryType)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 요약 설정 카드 */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>요약 설정</CardTitle>
          <CardDescription>요약 방식과 길이를 선택하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* ... 기존 설정 UI ... */}
        </CardContent>
      </Card>

      {/* 원본 텍스트 및 요약 실행 */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>텍스트 입력</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg transition-colors duration-200 min-h-[150px]">
            {mappedSentences.length > 0 ? (
              mappedSentences.map((sentence, index) => (
                <span
                  key={`original-${index}`}
                  className={`sentence cursor-pointer ${highlightedIndex === index ? 'highlight' : ''}`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(null)}
                >
                  {sentence.original}{' '}
                </span>
              ))
            ) : (
              <p className="text-muted-foreground">요약하기 버튼을 눌러주세요.</p>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleSummarize} disabled={isSummarizing}>
              {isSummarizing ? "요약 중..." : "요약하기"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 요약 결과 */}
      {mappedSentences.length > 0 && (
        <Card className="transition-all duration-200 hover:shadow-md animate-in fade-in-50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>요약 결과</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                복사
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg transition-colors duration-200">
              {mappedSentences.map((sentence, index) => (
                sentence.summary && (
                  <span
                    key={`summary-${index}`}
                    className={`sentence cursor-pointer ${highlightedIndex === index ? 'highlight' : ''}`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseLeave={() => setHighlightedIndex(null)}
                  >
                    {sentence.summary}{' '}
                  </span>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
