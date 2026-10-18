export interface PortfolioMatch {
    id: string
    chunk_key: string
    file_path: string
    title: string
    heading: string
    content: string
    category: string
    project: string | null
    source_url: string | null
    similarity: number
}

const DEFAULT_MATCH_COUNT = 5
const MAX_UPDATE_MATCHES_PER_PROJECT = 2
const PROJECT_ORDER = [
    'bnty',
    'fuelly',
    'mungpass',
    'virtual_coin',
] as const

const UPDATE_QUESTION_PATTERN =
    /최근\s*(업데이트|개선|변경)|업데이트\s*(내용|사항|내역)?|새로\s*(추가|구현)|신규\s*(구현|검증)/i
const PROJECT_NAME_PATTERN =
    /\b(bnty|fuelly|mungpass|virtual[\s_-]?coin)\b|비엔티|퓨얼리|멍패스|버추얼\s*코인/i
const UPDATE_MARKER_PATTERN = /최근 개선|신규 구현|신규 검증/

function isPortfolioWideUpdateQuestion(question: string) {
    return (
        UPDATE_QUESTION_PATTERN.test(question) &&
        !PROJECT_NAME_PATTERN.test(question)
    )
}

export function getPortfolioRetrievalMode(question: string) {
    return isPortfolioWideUpdateQuestion(question)
        ? 'update-index'
        : 'semantic'
}

export function selectPortfolioMatches(
    question: string,
    matches: PortfolioMatch[],
) {
    if (!isPortfolioWideUpdateQuestion(question)) {
        return matches.slice(0, DEFAULT_MATCH_COUNT)
    }

    const updateMatches = matches.filter(
        match =>
            match.project !== null &&
            UPDATE_MARKER_PATTERN.test(match.content),
    )

    if (updateMatches.length === 0) {
        return matches.slice(0, DEFAULT_MATCH_COUNT)
    }

    return PROJECT_ORDER.flatMap(project =>
        updateMatches
            .filter(match => match.project === project)
            .slice(0, MAX_UPDATE_MATCHES_PER_PROJECT),
    )
}
