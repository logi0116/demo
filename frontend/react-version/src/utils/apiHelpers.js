// API 호출을 위한 헬퍼 함수들

export const handleApiError = (error) => {
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return "서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요."
  }

  if (error.message.includes("500")) {
    return "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
  }

  if (error.message.includes("404")) {
    return "요청한 API를 찾을 수 없습니다."
  }

  if (error.message.includes("400")) {
    return "잘못된 요청입니다. 입력 내용을 확인해주세요."
  }

  return error.message || "알 수 없는 오류가 발생했습니다."
}

export const validateTextInput = (text, minLength = 1, maxLength = 10000) => {
  if (!text || typeof text !== "string") {
    throw new Error("텍스트를 입력해주세요.")
  }

  if (text.trim().length < minLength) {
    throw new Error(`최소 ${minLength}자 이상 입력해주세요.`)
  }

  if (text.length > maxLength) {
    throw new Error(`최대 ${maxLength}자까지 입력 가능합니다.`)
  }

  return text.trim()
}

export const formatApiResponse = (response, type) => {
  const timestamp = new Date().toISOString()

  return {
    ...response,
    type,
    timestamp,
    success: true,
  }
}
