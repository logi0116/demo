interface TranslationRequest {
  text: string
  sourceLang: string
  targetLang: string
}

interface TranslationResponse {
  translatedText: string
  sourceLang: string
  targetLang: string
  originalLength: number
  translatedLength: number
}

interface SummarizationRequest {
  text: string
  summaryType: string
  summaryLength?: number
}

interface SummarizationResponse {
  summarizedText: string
  summaryType: string
  originalLength: number
  summarizedLength: number
  compressionRatio: number
  keywordCount?: number
}

interface ParaphraseRequest {
  text: string
  style: string
  creativity: number
}

interface ParaphraseResponse {
  paraphrasedText: string
  originalLength: number
  paraphrasedLength: number
  style: string
  creativity: number
  timestamp: string
}

export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "번역 요청에 실패했습니다.")
  }

  return response.json()
}

export async function summarizeText(request: SummarizationRequest): Promise<SummarizationResponse> {
  const response = await fetch("/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "요약 요청에 실패했습니다.")
  }

  return response.json()
}

export async function paraphraseText(request: ParaphraseRequest): Promise<ParaphraseResponse> {
  const response = await fetch("/api/paraphrase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "의역 요청에 실패했습니다.")
  }

  return response.json()
}
