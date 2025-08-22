import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLang, targetLang } = await request.json()

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json({ error: "필수 파라미터가 누락되었습니다." }, { status: 400 })
    }

    if (sourceLang === targetLang) {
      return NextResponse.json({ error: "소스 언어와 타겟 언어가 같습니다." }, { status: 400 })
    }

    // TODO: 실제 번역 API 연동 (Google Translate, DeepL, OpenAI 등)
    // 현재는 모의 번역 결과를 반환
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const languages = {
      ko: "한국어",
      en: "English",
      ja: "日本語",
      zh: "中文",
      es: "Español",
      fr: "Français",
      de: "Deutsch",
      ru: "Русский",
    }

    const mockTranslation = `[${languages[targetLang as keyof typeof languages]} 번역] ${text}`

    return NextResponse.json({
      translatedText: mockTranslation,
      sourceLang,
      targetLang,
      originalLength: text.length,
      translatedLength: mockTranslation.length,
    })
  } catch (error) {
    console.error("Translation API error:", error)
    return NextResponse.json({ error: "번역 중 오류가 발생했습니다." }, { status: 500 })
  }
}
