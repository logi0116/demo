"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Copy, RefreshCw, Wand2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { paraphraseText } from "@/lib/api"

interface ParaphrasePanelProps {
  inputText: string
  setInputText: (text: string) => void
}

export function ParaphrasePanel({ inputText, setInputText }: ParaphrasePanelProps) {
  const [outputText, setOutputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [paraphraseStyle, setParaphraseStyle] = useState("formal")
  const [creativity, setCreativity] = useState(50)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const paraphraseStyles = [
    { value: "formal", label: "격식체", description: "공식적이고 정중한 표현" },
    { value: "casual", label: "구어체", description: "친근하고 자연스러운 표현" },
    { value: "academic", label: "학술체", description: "논문이나 보고서 스타일" },
    { value: "creative", label: "창의적", description: "독창적이고 흥미로운 표현" },
    { value: "simple", label: "간결체", description: "명확하고 간단한 표현" },
  ]

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      toast({
        title: "텍스트를 입력해주세요",
        description: "의역할 텍스트를 먼저 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setError("")
    setProgress(0)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const result = await paraphraseText({
        text: inputText,
        style: paraphraseStyle,
        creativity: creativity,
      })

      setProgress(100)
      setTimeout(() => {
        setOutputText(result.paraphrasedText)
        setIsLoading(false)
        setProgress(0)
        clearInterval(progressInterval)

        toast({
          title: "의역 완료",
          description: `${paraphraseStyle} 스타일로 의역되었습니다.`,
        })
      }, 500)
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : "의역 중 오류가 발생했습니다.")
      setIsLoading(false)
      setProgress(0)

      toast({
        title: "의역 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "복사 완료",
        description: "클립보드에 복사되었습니다.",
      })
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "클립보드 복사에 실패했습니다.",
        variant: "destructive",
      })
    }
  }

  const selectedStyle = paraphraseStyles.find((style) => style.value === paraphraseStyle)

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wand2 className="w-5 h-5 text-primary" />
            텍스트 의역
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="의역할 텍스트를 입력하세요..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px] resize-none focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
          />

          {/* Style and Creativity Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">의역 스타일</label>
              <Select value={paraphraseStyle} onValueChange={setParaphraseStyle} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paraphraseStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{style.label}</span>
                        <span className="text-xs text-muted-foreground">{style.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">창의성 수준: {creativity}%</label>
              <div className="px-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={creativity}
                  onChange={(e) => setCreativity(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  disabled={isLoading}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>보수적</span>
                  <span>창의적</span>
                </div>
              </div>
            </div>
          </div>

          {selectedStyle && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {selectedStyle.label}
              </Badge>
              <span className="text-xs text-muted-foreground">{selectedStyle.description}</span>
            </div>
          )}

          <Button onClick={handleParaphrase} disabled={isLoading || !inputText.trim()} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                의역 중...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                의역하기
              </>
            )}
          </Button>

          {isLoading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground text-center">AI가 텍스트를 분석하고 의역하고 있습니다...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output Section */}
      {(outputText || error) && (
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wand2 className="w-5 h-5 text-primary" />
                의역 결과
              </CardTitle>
              {outputText && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(outputText)}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  복사
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[120px] resize-none bg-muted/30 focus:ring-2 focus:ring-primary/20"
                />

                {/* Statistics */}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">원본:</span>
                    <span>{inputText.length}자</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">의역본:</span>
                    <span>{outputText.length}자</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">변화율:</span>
                    <span>
                      {inputText.length > 0
                        ? `${Math.round(((outputText.length - inputText.length) / inputText.length) * 100)}%`
                        : "0%"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
