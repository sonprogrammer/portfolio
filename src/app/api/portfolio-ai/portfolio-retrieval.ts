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
const PROJECT_MATCH_COUNT = 10
const MAX_UPDATE_MATCHES_PER_PROJECT = 2
const PROJECT_ORDER = [
    'bnty',
    'fuelly',
    'mungpass',
    'virtual_coin',
] as const

const UPDATE_QUESTION_PATTERN =
    /최근\s*(업데이트|개선|변경)|업데이트\s*(내용|사항|내역)?|새로\s*(추가|구현)|신규\s*(구현|검증)/i
const UPDATE_MARKER_PATTERN = /최근 개선|신규 구현|신규 검증/
const PROJECTS = [
    {
        project: 'bnty',
        canonicalName: 'BNTY',
        pattern: /\bbnty\b|비엔티/i,
    },
    {
        project: 'fuelly',
        canonicalName: 'Fuelly',
        pattern: /\bfuelly\b|퓨얼리/i,
    },
    {
        project: 'mungpass',
        canonicalName: 'MungPass',
        pattern: /\bmungpass\b|멍패스/i,
    },
    {
        project: 'virtual_coin',
        canonicalName: 'Virtual Coin',
        pattern: /\bvirtual[\s_-]?coin\b|버추얼\s*코인/i,
    },
] as const

function getRequestedProject(question: string) {
    return PROJECTS.find(({ pattern }) => pattern.test(question))
}

function isPortfolioWideUpdateQuestion(question: string) {
    return (
        UPDATE_QUESTION_PATTERN.test(question) &&
        !getRequestedProject(question)
    )
}

export function getPortfolioRetrievalMode(question: string) {
    return isPortfolioWideUpdateQuestion(question)
        ? 'update-index'
        : 'semantic'
}

export function getPortfolioSearchPlan(question: string) {
    const requestedProject = getRequestedProject(question)

    if (!requestedProject) {
        return {
            query: question,
            matchCount: DEFAULT_MATCH_COUNT,
            project: null,
        }
    }

    return {
        query: question.replace(
            requestedProject.pattern,
            requestedProject.canonicalName,
        ),
        matchCount: PROJECT_MATCH_COUNT,
        project: requestedProject.project,
    }
}

export function selectPortfolioMatches(
    question: string,
    matches: PortfolioMatch[],
) {
    if (!isPortfolioWideUpdateQuestion(question)) {
        const { project } = getPortfolioSearchPlan(question)
        const projectMatches = project
            ? matches.filter(match => match.project === project)
            : matches

        return projectMatches.slice(0, DEFAULT_MATCH_COUNT)
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
