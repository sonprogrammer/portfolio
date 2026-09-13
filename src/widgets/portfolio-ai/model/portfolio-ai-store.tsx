import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PortfolioSource } from '../api/ask-portfolio-ai'



export interface PortfolioAiMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    sources?: PortfolioSource[]
}

interface PendingQuestion {
    id: number;
    question: string
}

interface PortfolioAiState {
    isOpen: boolean
    pendingQuestion: PendingQuestion | null
    messages: PortfolioAiMessage[]

    openAssistant: (question?: string) => void
    closeAssistant: () => void
    addMessage: (message: Omit<PortfolioAiMessage, 'id'>) => void
    clearMessages: () => void
}

const INITIAL_MESSAGES: PortfolioAiMessage[] = [
    {
        id: 'initial',
        role: 'assistant',
        content:
            '안녕하세요. 손영진의 프로젝트, 기술 경험, 문제 해결 방식 등 궁금하신 것에 대해 질문해주세요.',
    },
]

function createMessageId() {
    return `${Date.now()}-${Math.random()}`
}


export const usePortfolioAiStore =
    create<PortfolioAiState>()(
        persist(
            set => ({
                isOpen: false,
                pendingQuestion: null,
                messages: INITIAL_MESSAGES,

                openAssistant: question =>
                    set({
                        isOpen: true,
                        pendingQuestion: question
                            ? { id: Date.now(), question }
                            : null
                    }),

                closeAssistant: () =>
                    set({
                        isOpen: false,
                    }),

                addMessage: message =>
                    set(state => ({
                        messages: [
                            ...state.messages,
                            { ...message, id: createMessageId() }
                        ]
                    })),

                clearMessages: () =>
                    set({ messages: INITIAL_MESSAGES })
            }),
            {
                name: 'portfolio-ai-session',
                storage: createJSONStorage(() => sessionStorage),
                partialize: state => ({ messages: state.messages }),
                skipHydration: true
            },
        ),
    )