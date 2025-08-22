"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Languages, Copy, Volume2, RefreshCw } from "lucide-react"
import { useToast } from "../hooks/useToast"
import apiService from "../services/apiService"
import { handleApiError, validateTextInput } from "../utils/apiHelpers"

const languages = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ru", name: "Русский" },
]

export function TranslationPanel({ inputText, setInputText }) {
  const [sourceLang, setSourceLang] = useState("ko")
  const [targetLang, setTargetLang] = useState("en")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")
  const [translationStats, setTranslationStats] = useState(null)
  const { toast } = useToast()

  const handleTranslate = async () => {
    try {
      const validatedText = validateTextInput(inputText)

      if (sourceLang === targetLang) {
        setError("소스 언어와 타겟 언어가 같습니다.")
        return
      }

      setIsTranslating(true)
      setError("")
      setProgress(0)

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 150)

      const result = await apiService.translateText({
        text: validatedText,
        sourceLang,
        targetLang,
      })

      setProgress(100)
      setTranslatedText(result.translatedText)
      setTranslationStats({
        originalLength: result.originalLength,
        translatedLength: result.translatedLength,
      })

      toast({
        title: "번역 완료",
        description: "텍스트가 성공적으로 번역되었습니다.",
      })

      clearInterval(progressInterval)
    } catch (err) {
      const errorMessage = handleApiError(err)
      setError(errorMessage)
      console.error("Translation error:", err)
    } finally {
      setIsTranslating(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const handleCopy = async () => {
    if (translatedText) {
      try {
        await navigator.clipboard.writeText(translatedText)
        toast({
          title: "복사 완료",
          description: "번역된 텍스트가 클립보드에 복사되었습니다.",
        })
      } catch (err) {
        toast({
          title: "복사 실패",
          description: "클립보드 복사에 실패했습니다.",
          variant: "destructive",
        })
      }
    }
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    if (translatedText) {
      setInputText(translatedText)
      setTranslatedText("")
      setTranslationStats(null)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Language Selection */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Languages className="w-5 h-5 text-primary" />
            언어 설정
          </CardTitle>
          <CardDescription>번역할 언어를 선택하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">소스 언어</label>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapLanguages}
              className="mt-6 sm:mt-6 transition-transform hover:scale-105 shrink-0 bg-transparent"
              title="언어 교체"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>

            <div className="flex-1 w-full">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">타겟 언어</label>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">텍스트 입력</CardTitle>
          <CardDescription>번역하고 싶은 텍스트를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="번역할 텍스트를 입력하세요..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px] resize-none transition-all duration-200 focus:ring-2"
          />

          {isTranslating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">번역 진행 중...</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                {inputText.length} 글자
              </Badge>
              {inputText.length > 1000 && (
                <Badge variant="outline" className="text-xs text-amber-600">
                  긴 텍스트
                </Badge>
              )}
            </div>
            <Button
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating || sourceLang === targetLang}
              className="min-w-[100px] transition-all duration-200"
            >
              {isTranslating ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  번역 중...
                </div>
              ) : (
                "번역하기"
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
      {translatedText && (
        <Card className="transition-all duration-200 hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-4">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Languages className="w-5 h-5 text-primary" />
                번역 결과
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="transition-all duration-200 hover:scale-105 bg-transparent"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  복사
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all duration-200 hover:scale-105 bg-transparent"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  듣기
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg transition-colors duration-200">
              <p className="text-foreground leading-relaxed">{translatedText}</p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {languages.find((l) => l.code === sourceLang)?.name} →{" "}
                {languages.find((l) => l.code === targetLang)?.name}
              </Badge>
              {translationStats && (
                <Badge variant="secondary" className="text-xs">
                  {translationStats.translatedLength} 글자
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
