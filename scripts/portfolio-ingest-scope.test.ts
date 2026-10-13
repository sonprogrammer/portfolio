import assert from 'node:assert/strict'
import test from 'node:test'

import {
  findStaleChunkKeys,
  parsePortfolioIngestArguments,
  selectMarkdownFiles,
} from './portfolio-ingest-scope'

test('인자 없이 실행하면 전체 문서를 실제 반영 대상으로 사용한다', () => {
  assert.deepEqual(parsePortfolioIngestArguments([]), {
    filePath: null,
    dryRun: false,
  })
})

test('--file과 --dry-run을 함께 파싱한다', () => {
  assert.deepEqual(
    parsePortfolioIngestArguments([
      '--file',
      './projects/virtual-coin.md',
      '--dry-run',
    ]),
    {
      filePath: 'projects/virtual-coin.md',
      dryRun: true,
    },
  )
})

test('portfolio-data 외부 경로와 Markdown이 아닌 파일을 거부한다', () => {
  assert.throws(
    () =>
      parsePortfolioIngestArguments([
        '--file',
        '../outside.md',
      ]),
    /portfolio-data 내부/,
  )
  assert.throws(
    () =>
      parsePortfolioIngestArguments([
        '--file',
        'projects/virtual-coin.txt',
      ]),
    /\.md 파일/,
  )
})

test('파일 단위 실행은 대상 파일의 이전 청크만 stale로 판단한다', () => {
  const existingRows = [
    {
      chunk_key: 'projects/virtual-coin.md::프로젝트 개요',
      file_path: 'projects/virtual-coin.md',
    },
    {
      chunk_key: 'projects/virtual-coin.md::삭제된 항목',
      file_path: 'projects/virtual-coin.md',
    },
    {
      chunk_key: 'projects/fuelly.md::프로젝트 개요',
      file_path: 'projects/fuelly.md',
    },
  ]

  const staleKeys = findStaleChunkKeys(
    existingRows,
    new Set([
      'projects/virtual-coin.md::프로젝트 개요',
    ]),
    'projects/virtual-coin.md',
  )

  assert.deepEqual(staleKeys, [
    'projects/virtual-coin.md::삭제된 항목',
  ])
})

test('--file은 발견된 Markdown 중 해당 파일만 선택한다', () => {
  const files = [
    '/repo/portfolio-data/projects/fuelly.md',
    '/repo/portfolio-data/projects/virtual-coin.md',
  ]

  assert.deepEqual(
    selectMarkdownFiles(
      '/repo/portfolio-data',
      files,
      'projects/virtual-coin.md',
    ),
    ['/repo/portfolio-data/projects/virtual-coin.md'],
  )
})

test('--file 대상이 없으면 적재 전에 실패한다', () => {
  assert.throws(
    () =>
      selectMarkdownFiles(
        '/repo/portfolio-data',
        [],
        'projects/missing.md',
      ),
    /찾을 수 없습니다/,
  )
})
