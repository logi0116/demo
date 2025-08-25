export async function translateText(request) {
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

export async function summarizeText(request) {
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

export async function paraphraseText(request) {
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
