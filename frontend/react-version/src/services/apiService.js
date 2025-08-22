// Spring Boot API 연동을 위한 서비스 클래스

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // 공통 fetch 메서드
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // 번역 API 호출
  async translateText(translationRequest) {
    return this.request("/translate", {
      method: "POST",
      body: JSON.stringify(translationRequest),
    })
  }

  // 요약 API 호출
  async summarizeText(summarizationRequest) {
    return this.request("/summarize", {
      method: "POST",
      body: JSON.stringify(summarizationRequest),
    })
  }

  // 의역 API 호출
  async paraphraseText(paraphraseRequest) {
    return this.request("/paraphrase", {
      method: "POST",
      body: JSON.stringify(paraphraseRequest),
    })
  }

  // 지원 언어 목록 조회
  async getSupportedLanguages() {
    return this.request("/languages")
  }

  // 서비스 상태 확인
  async getHealthCheck() {
    return this.request("/health")
  }
}

export default new ApiService()
