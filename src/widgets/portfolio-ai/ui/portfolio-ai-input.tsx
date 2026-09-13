'use client'

import {
  useEffect,
  useState,
  type FormEvent,
} from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { usePortfolioAiStore } from '@/widgets/portfolio-ai/model/portfolio-ai-store'



const EXAMPLE_QUESTIONS = [
  '성능 최적화 경험이 있나요?',
  'AI를 개발에 어떻게 활용하나요?',
  '실시간 통신을 구현한 경험이 있나요?',
]

function useTypewriter(items: string[]) {
  const [itemIndex, setItemIndex] = useState(0)
  const [text, setText] = useState(() => items[0] ?? '')

  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion) {
      return
    }

    const currentItem = items[itemIndex]

    let delay = isDeleting ? 35 : 65

    if (!isDeleting && text === currentItem) {
      delay = 1500
    }

    if (isDeleting && text === '') {
      delay = 250
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && text === currentItem) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && text === '') {
        setIsDeleting(false)
        setItemIndex(
          currentIndex => (currentIndex + 1) % items.length,
        )
        return
      }

      setText(
        isDeleting
          ? currentItem.slice(0, text.length - 1)
          : currentItem.slice(0, text.length + 1),
      )
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [isDeleting, itemIndex, items, text])

  return {
    text,
    activeQuestion: items[itemIndex],
  }
}

export function PortfolioAiInput() {
  const [question, setQuestion] = useState('')
  const openAssistant = usePortfolioAiStore(state => state.openAssistant)
  const { text, activeQuestion } = useTypewriter(EXAMPLE_QUESTIONS)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    openAssistant(question.trim() || activeQuestion)
    setQuestion('')
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/2.5 p-6 sm:p-8">
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-400">
            <Sparkles size={16} />
            Portfolio AI
          </div>

          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            프로젝트를 직접 찾아보지 말고 질문해보세요.
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
            프로젝트 경험과 기술적 의사결정을 기반으로
            답변합니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111113] p-2 transition focus-within:border-violet-500/60"
        >
          <Sparkles
            size={18}
            className="ml-3 shrink-0 text-violet-400"
          />

          <input
            value={question}
            onChange={event => setQuestion(event.target.value)}
            maxLength={500}
            aria-label="포트폴리오 질문"
            placeholder={text}
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 sm:text-base"
          />

          <button
            type="submit"
            aria-label="질문하기"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-black transition hover:bg-violet-400"
          >
            <ArrowUp size={18} />
          </button>
        </form>
        <p className="mt-2 text-center text-[11px] text-zinc-600">
          원활한 이용을 위해 질문은 10분에 최대
          10회까지 가능합니다.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLE_QUESTIONS.map(example => (
            <button
              key={example}
              type="button"
              onClick={() => openAssistant(example)}
              className="rounded-full border border-white/10 px-3 py-2 text-xs text-zinc-400 transition hover:border-violet-500/50 hover:text-white"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}