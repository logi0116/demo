import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, style, creativity } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "텍스트가 필요합니다." }, { status: 400 })
    }

    // TODO: 실제 AI 서비스 연동 (OpenAI, Claude 등)
    // 현재는 모의 응답을 반환합니다.

    // 스타일별 모의 의역 결과
    const mockParaphrases: Record<string, string> = {
      formal: `${text}를 격식있게 표현하면 다음과 같습니다. 정중하고 공식적인 어조로 재구성된 내용입니다.`,
      casual: `${text}를 좀 더 친근하게 말하면 이런 느낌이에요. 편안하고 자연스러운 표현으로 바꿔봤습니다.`,
      academic: `${text}에 대한 학술적 접근을 통해 다음과 같이 재구성할 수 있습니다. 논리적이고 체계적인 표현으로 변환되었습니다.`,
      creative: `${text}를 창의적으로 표현해보면 이렇게 됩니다. 독창적이고 흥미로운 방식으로 재해석했습니다.`,
      simple: `${text}를 간단히 말하면 이렇습니다. 명확하고 이해하기 쉽게 정리했습니다.`,
    }

    // 창의성 수준에 따른 추가 변형
    let paraphrasedText = mockParaphrases[style] || mockParaphrases.formal

    if (creativity > 70) {
      paraphrasedText += " 높은 창의성으로 독특한 관점을 추가했습니다."
    } else if (creativity < 30) {
      paraphrasedText += " 보수적인 접근으로 안전하게 의역했습니다."
    }

    // 응답 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      paraphrasedText,
      originalLength: text.length,
      paraphrasedLength: paraphrasedText.length,
      style,
      creativity,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Paraphrase API error:", error)
    return NextResponse.json({ error: "의역 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
