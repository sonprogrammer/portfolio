export interface PortfolioSource {
  title: string
  heading: string
  project: string | null
  sourceUrl: string | null
  similarity: number
}

export interface PortfolioAiRes {
  answer: string
  sources: PortfolioSource[]
}

export async function askPortfolioAi(question: string, signal?: AbortSignal): Promise<PortfolioAiRes>{
    const res = await fetch('/api/portfolio-ai', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ question}),
        signal
    })

    const data = await res.json() as Partial<PortfolioAiRes & { message: string}>

    if(!res.ok){
        throw new Error(data.message ?? '답변을 불러오지 못했습니다.')
    }

    if(typeof data.answer !== 'string' || !Array.isArray(data.sources)){
        throw new Error('올바르지 않은 응답입니다.')
    }

    return { answer: data.answer, sources: data.sources}
}