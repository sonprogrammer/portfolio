'use client'

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type FormEvent,
    type KeyboardEvent,
} from 'react'
import {
    ExternalLink,
    LoaderCircle,
    Send,
    Sparkles,
    X,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useShallow } from 'zustand/shallow'

import { askPortfolioAi } from '../api/ask-portfolio-ai'
import { usePortfolioAiStore } from '../model/portfolio-ai-store'

export function PortfolioAiPanel() {
    const {
        isOpen,
        pendingQuestion,
        messages,
        addMessage,
        closeAssistant,
    } = usePortfolioAiStore(
        useShallow(state => ({
            isOpen: state.isOpen,
            pendingQuestion: state.pendingQuestion,
            messages: state.messages,
            addMessage: state.addMessage,
            closeAssistant: state.closeAssistant,
        })),
    )

    const [input, setInput] = useState('')
    const [error, setError] = useState<
        string | null
    >(null)
    const [isLoading, setIsLoading] =
        useState(false)

    const handledQuestionIdRef = useRef(0)
    const abortControllerRef =
        useRef<AbortController | null>(null)
    const messagesEndRef =
        useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        void usePortfolioAiStore.persist.rehydrate()
    }, [])

    const sendQuestion = useCallback(
        async (rawQuestion: string) => {
            const question = rawQuestion.trim()

            if (!question || isLoading) {
                return
            }

            setInput('')
            setError(null)
            setIsLoading(true)

            addMessage({
                role: 'user',
                content: question,
            })

            const controller = new AbortController()

            abortControllerRef.current = controller

            try {
                const response =
                    await askPortfolioAi(
                        question,
                        controller.signal,
                    )

                addMessage({
                    role: 'assistant',
                    content: response.answer,
                    sources: response.sources,
                })
            } catch (requestError) {
                if (
                    requestError instanceof
                    DOMException &&
                    requestError.name === 'AbortError'
                ) {
                    return
                }

                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : '답변을 불러오지 못했습니다.',
                )
            } finally {
                abortControllerRef.current = null
                setIsLoading(false)
            }
        },
        [addMessage, isLoading],
    )

    useEffect(() => {
        if (
            !pendingQuestion ||
            handledQuestionIdRef.current ===
            pendingQuestion.id
        ) {
            return
        }

        handledQuestionIdRef.current =
            pendingQuestion.id

        void sendQuestion(
            pendingQuestion.question,
        )
    }, [pendingQuestion, sendQuestion])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [messages, isLoading])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const previousOverflow =
            document.body.style.overflow

        document.body.style.overflow = 'hidden'

        const handleEscape = (
            event: globalThis.KeyboardEvent,
        ) => {
            if (event.key === 'Escape') {
                closeAssistant()
            }
        }

        window.addEventListener(
            'keydown',
            handleEscape,
        )

        return () => {
            document.body.style.overflow =
                previousOverflow

            window.removeEventListener(
                'keydown',
                handleEscape,
            )
        }
    }, [isOpen, closeAssistant])

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort()
        }
    }, [])

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
        void sendQuestion(input)
    }

    const handleKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (
            event.key === 'Enter' &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
        ) {
            event.preventDefault()
            event.currentTarget.form?.requestSubmit()
        }
    }

    return (
        <div
            aria-hidden={!isOpen}
            className={`
                fixed inset-0 z-80
                ${isOpen
                    ? 'pointer-events-auto'
                    : 'pointer-events-none'
                }
            `}
        >
            <button
                type="button"
                tabIndex={isOpen ? 0 : -1}
                aria-label="AI 패널 닫기"
                onClick={closeAssistant}
                className={`
                    absolute inset-0
                    bg-black/70 backdrop-blur-sm
                    transition-opacity duration-300
                    ${isOpen
                        ? 'opacity-100'
                        : 'opacity-0'
                    }
                `}
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-label="손영진 포트폴리오 AI"
                className={`
                    absolute inset-0
                    flex h-dvh w-full flex-col
                    bg-[#0b0b0d]
                    transition-transform
                    duration-300 ease-out

                    md:inset-y-0
                    md:left-auto md:right-0
                    md:w-[70vw] md:max-w-140
                    md:border-l md:border-white/10

                    lg:w-110

                    ${isOpen
                        ? 'translate-y-0 md:translate-x-0'
                        : 'translate-y-full md:translate-y-0 md:translate-x-full'
                    }
                `}
            >
                <header className="mt-19 border-t  flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
                            <Sparkles size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-white">
                                Ask Youngjin
                            </h2>

                            <p className="text-xs text-zinc-500">
                                RAG 기반 Portfolio AI
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={closeAssistant}
                        aria-label="닫기"
                        className="flex size-10 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div
                    aria-live="polite"
                    className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6"
                >
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={
                                message.role === 'user'
                                    ? 'flex justify-end'
                                    : 'flex justify-start'
                            }
                        >
                            <div
                                className={`
                                    max-w-[88%]
                                    rounded-2xl px-4 py-3
                                    text-sm leading-6

                                    ${message.role ===
                                        'user'
                                        ? 'rounded-br-md bg-violet-600 text-white'
                                        : 'rounded-bl-md border border-white/10 bg-white/4 text-zinc-200'
                                    }
                                `}
                            >
                                {message.role ===
                                    'assistant' ? (
                                    <ReactMarkdown
                                        remarkPlugins={[
                                            remarkGfm,
                                        ]}
                                        components={{
                                            p: ({
                                                children,
                                            }) => (
                                                <p className="whitespace-pre-wrap not-first:mt-3">
                                                    {
                                                        children
                                                    }
                                                </p>
                                            ),

                                            strong: ({
                                                children,
                                            }) => (
                                                <strong className="font-semibold text-white">
                                                    {
                                                        children
                                                    }
                                                </strong>
                                            ),

                                            ul: ({
                                                children,
                                            }) => (
                                                <ul className="my-3 list-disc space-y-1 pl-5">
                                                    {
                                                        children
                                                    }
                                                </ul>
                                            ),

                                            ol: ({
                                                children,
                                            }) => (
                                                <ol className="my-3 list-decimal space-y-1 pl-5">
                                                    {
                                                        children
                                                    }
                                                </ol>
                                            ),

                                            li: ({
                                                children,
                                            }) => (
                                                <li>
                                                    {
                                                        children
                                                    }
                                                </li>
                                            ),

                                            code: ({
                                                children,
                                            }) => (
                                                <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs text-violet-300">
                                                    {
                                                        children
                                                    }
                                                </code>
                                            ),

                                            a: ({
                                                href,
                                                children,
                                            }) => (
                                                <a
                                                    href={
                                                        href
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-violet-400 underline underline-offset-4 hover:text-violet-300"
                                                >
                                                    {
                                                        children
                                                    }
                                                </a>
                                            ),
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                ) : (
                                    <p className="whitespace-pre-wrap">
                                        {message.content}
                                    </p>
                                )}

                                {message.sources &&
                                    message.sources
                                        .length > 0 && (
                                        <div className="mt-4 border-t border-white/10 pt-3">
                                            <p className="mb-2 text-xs text-zinc-500">
                                                답변 근거
                                            </p>

                                            <div className="flex flex-col gap-2">
                                                {message.sources.map(
                                                    (
                                                        source,
                                                        index,
                                                    ) =>
                                                        source.sourceUrl ? (
                                                            <a
                                                                key={`${source.sourceUrl}-${source.heading}-${index}`}
                                                                href={
                                                                    source.sourceUrl
                                                                }
                                                                onClick={
                                                                    closeAssistant
                                                                }
                                                                className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2 text-left text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white"
                                                            >
                                                                <span>
                                                                    {
                                                                        source.title
                                                                    }

                                                                    <span className="ml-1 text-zinc-500">
                                                                        {' '}
                                                                        ·{' '}
                                                                        {
                                                                            source.heading
                                                                        }
                                                                    </span>
                                                                </span>

                                                                <ExternalLink
                                                                    size={
                                                                        13
                                                                    }
                                                                    className="shrink-0"
                                                                />
                                                            </a>
                                                        ) : null,
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/4 px-4 py-3 text-sm text-zinc-400">
                                <LoaderCircle
                                    size={16}
                                    className="animate-spin"
                                />

                                포트폴리오를 확인하고
                                있습니다.
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <footer className="border-t border-white/10 bg-[#0b0b0d] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                    <p className="mb-2 text-center text-[11px] text-zinc-600">
                        원활한 이용을 위해 질문은 10분에 최대
                        10회까지 가능합니다.
                    </p>
                    {error && (
                        <p className="mb-2 text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/4 p-2 focus-within:border-violet-500/60"
                    >
                        <textarea
                            value={input}
                            onChange={event =>
                                setInput(
                                    event.target.value,
                                )
                            }
                            onKeyDown={handleKeyDown}
                            maxLength={300}
                            rows={1}
                            placeholder="궁금한 내용을 입력해주세요."
                            className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600"
                        />

                        <button
                            type="submit"
                            disabled={
                                !input.trim() ||
                                isLoading
                            }
                            aria-label="질문 보내기"
                            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <Send size={17} />
                        </button>
                    </form>
                </footer>
            </section>
        </div>
    )
}