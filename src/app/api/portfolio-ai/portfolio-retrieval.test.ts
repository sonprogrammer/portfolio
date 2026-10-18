import assert from 'node:assert/strict'
import test from 'node:test'

import {
    getPortfolioRetrievalMode,
    selectPortfolioMatches,
    type PortfolioMatch,
} from './portfolio-retrieval'

function createMatch(
    project: string | null,
    heading: string,
    content: string,
    similarity: number,
): PortfolioMatch {
    return {
        id: `${project ?? 'common'}-${heading}`,
        chunk_key: `${project ?? 'common'}::${heading}`,
        file_path: `projects/${project ?? 'overview'}.md`,
        title: `${project ?? 'common'} 프로젝트`,
        heading,
        content,
        category: 'project',
        project,
        source_url: null,
        similarity,
    }
}

test('전체 프로젝트의 최근 업데이트 질문만 상태 표기 조회를 사용한다', () => {
    assert.equal(
        getPortfolioRetrievalMode(
            '프로젝트들의 최근 업데이트 내용은 무엇인가요?',
        ),
        'update-index',
    )
    assert.equal(
        getPortfolioRetrievalMode('Virtual Coin의 최근 업데이트는?'),
        'semantic',
    )
    assert.equal(
        getPortfolioRetrievalMode('사용한 프론트엔드 기술은?'),
        'semantic',
    )
})

test('전체 업데이트 질문은 개요를 제외하고 네 프로젝트의 업데이트 청크를 고르게 선택한다', () => {
    const matches = [
        createMatch(
            'mungpass',
            '프로젝트 개요',
            '2026년의 가장 최근 프로젝트입니다.',
            0.8,
        ),
        createMatch(
            'mungpass',
            'O2O 이용 흐름',
            '> 구현 구분: **최근 개선**\nQR 체크인 흐름을 개선했습니다.',
            0.79,
        ),
        createMatch(
            'mungpass',
            '권한 검증',
            '> 검증 구분: **신규 검증**\n권한 테스트를 추가했습니다.',
            0.78,
        ),
        createMatch(
            'fuelly',
            'AI 응답 검증',
            '> 구현 구분: **신규 구현**\n응답 스키마를 검증합니다.',
            0.7,
        ),
        createMatch(
            'virtual_coin',
            '실시간 시세 처리',
            '> 구현 구분: **최근 개선**\nMap으로 최신 시세를 병합합니다.',
            0.69,
        ),
        createMatch(
            'bnty',
            '이미지 최적화',
            '> 구현 구분: **최근 개선**\n이미지 로딩을 개선했습니다.',
            0.68,
        ),
    ]

    const selected = selectPortfolioMatches(
        '프로젝트들의 최근 업데이트 내용은 무엇인가요?',
        matches,
    )

    assert.deepEqual(
        [...new Set(selected.map(match => match.project))].sort(),
        ['bnty', 'fuelly', 'mungpass', 'virtual_coin'],
    )
    assert.equal(
        selected.some(match => match.heading === '프로젝트 개요'),
        false,
    )
    assert.equal(
        selected.filter(match => match.project === 'mungpass').length,
        2,
    )
})

test('특정 프로젝트 질문은 기존 유사도 순서의 상위 5개를 유지한다', () => {
    const matches = Array.from({ length: 6 }, (_, index) =>
        createMatch(
            'virtual_coin',
            `항목 ${index + 1}`,
            '> 구현 구분: **최근 개선**',
            0.9 - index * 0.01,
        ),
    )

    const selected = selectPortfolioMatches(
        'Virtual Coin의 최근 업데이트는?',
        matches,
    )

    assert.deepEqual(
        selected.map(match => match.heading),
        ['항목 1', '항목 2', '항목 3', '항목 4', '항목 5'],
    )
})
