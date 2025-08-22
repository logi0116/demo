import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, summaryType, summaryLength } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "요약할 텍스트가 필요합니다." }, { status: 400 })
    }

    if (text.length < 50) {
      return NextResponse.json({ error: "요약하기에는 텍스트가 너무 짧습니다. (최소 50자)" }, { status: 400 })
    }

    // TODO: 실제 요약 API 연동 (OpenAI, Claude, Gemini 등)
    // 현재는 모의 요약 결과를 반환
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let mockSummary = ""
    let keywordCount = 0

    switch (summaryType) {
      case "brief":
        const briefLength = Math.floor((text.length * summaryLength) / 100)
        mockSummary = `[간단 요약 - ${summaryLength}%]\n\n${text.substring(0, briefLength)}...`
        break
      case "detailed":
        mockSummary = `[상세 요약]\n\n주요 내용:\n• ${text.substring(0, 100)}...\n• 추가 세부사항들이 포함된 상세한 요약입니다.\n• 원문의 핵심 논점들을 체계적으로 정리했습니다.\n• 결론 및 시사점을 명확히 제시합니다.`
        break
      case "keywords":
        const words = text
          .split(/\s+/)
          .filter((word) => word.length > 2)
          .slice(0, 10)
        keywordCount = words.length
        mockSummary = `[키워드 추출]\n\n핵심 키워드: ${words.join(", ")}`
        break
      case "bullets":
        mockSummary = `[불릿 포인트 요약]\n\n• ${text.substring(0, 50)}...\n• 주요 논점 및 핵심 내용\n• 세부 사항과 지원 근거\n• 결론 및 향후 시사점`
        break
      default:
        mockSummary = `[요약 결과] ${text.substring(0, 200)}...`
    }

    const compressionRatio = Math.round((1 - mockSummary.length / text.length) * 100)

    return NextResponse.json({
      summarizedText: mockSummary,
      summaryType,
      originalLength: text.length,
      summarizedLength: mockSummary.length,
      compressionRatio,
      keywordCount,
    })
  } catch (error) {
    console.error("Summarization API error:", error)
    return NextResponse.json({ error: "요약 중 오류가 발생했습니다." }, { status: 500 })
  }
}
