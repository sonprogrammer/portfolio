import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

import { GoogleGenAI } from '@google/genai'
import { loadEnvConfig } from '@next/env'
import { createClient } from '@supabase/supabase-js'

import {
  createPortfolioChunks,
  type PortfolioChunk,
} from './portfolio-chunker'

loadEnvConfig(process.cwd())

const DATA_DIRECTORY = path.join(
  process.cwd(),
  'portfolio-data',
)

function getEnvironmentVariable(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`)
  }

  return value
}

const ai = new GoogleGenAI({
  apiKey: getEnvironmentVariable('GEMINI_API_KEY'),
})

const supabase = createClient(
  getEnvironmentVariable('NEXT_PUBLIC_SUPABASE_URL'),
  getEnvironmentVariable('SUPABASE_SECRET_KEY'),
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

async function findMarkdownFiles(
  directory: string,
): Promise<string[]> {
  const entries = await readdir(directory, {
    withFileTypes: true,
  })

  const files = await Promise.all(
    entries.map(async entry => {
      const entryPath = path.join(directory, entry.name)

      if (entry.isDirectory()) {
        return findMarkdownFiles(entryPath)
      }

      if (
        entry.isFile() &&
        entry.name.endsWith('.md') &&
        entry.name.toLowerCase() !== 'readme.md'
      ) {
        return [entryPath]
      }

      return []
    }),
  )

  return files.flat().sort()
}

function createContentHash(chunk: PortfolioChunk) {
  return createHash('sha256')
    .update(
      JSON.stringify({
        title: chunk.title,
        heading: chunk.heading,
        content: chunk.content,
        category: chunk.category,
        project: chunk.project,
        sourceUrl: chunk.sourceUrl,
      }),
    )
    .digest('hex')
}

async function createEmbedding(chunk: PortfolioChunk) {
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-2',
    contents:
      `title: ${chunk.title} - ${chunk.heading} | ` +
      `text: ${chunk.content}`,
    config: {
      outputDimensionality: 768,
    },
  })

  const embedding = response.embeddings?.[0]?.values

  if (!embedding || embedding.length !== 768) {
    throw new Error(
      `${chunk.chunkKey}: 768차원 임베딩 생성에 실패했습니다.`,
    )
  }

  return embedding
}

async function main() {
  const markdownFiles = await findMarkdownFiles(
    DATA_DIRECTORY,
  )

  const chunks: PortfolioChunk[] = []

  for (const absolutePath of markdownFiles) {
    const markdown = await readFile(absolutePath, 'utf8')
    const relativePath = path
      .relative(DATA_DIRECTORY, absolutePath)
      .split(path.sep)
      .join('/')

    chunks.push(
      ...createPortfolioChunks(markdown, relativePath),
    )
  }

  const { data: existingRows, error: selectError } =
    await supabase
      .from('portfolio_documents')
      .select('chunk_key, content_hash')

  if (selectError) {
    throw selectError
  }

  const existingHashMap = new Map(
    (existingRows ?? []).map(row => [
      row.chunk_key,
      row.content_hash,
    ]),
  )

  const preparedChunks = chunks.map(chunk => ({
    chunk,
    contentHash: createContentHash(chunk),
  }))

  const changedChunks = preparedChunks.filter(
    ({ chunk, contentHash }) =>
      existingHashMap.get(chunk.chunkKey) !== contentHash,
  )

  console.log(`전체 청크: ${chunks.length}개`)
  console.log(`추가 또는 변경: ${changedChunks.length}개`)

  for (const [
    index,
    { chunk, contentHash },
  ] of changedChunks.entries()) {
    console.log(
      `[${index + 1}/${changedChunks.length}] ${chunk.chunkKey}`,
    )

    const embedding = await createEmbedding(chunk)

    const { error } = await supabase
      .from('portfolio_documents')
      .upsert(
        {
          chunk_key: chunk.chunkKey,
          file_path: chunk.filePath,
          title: chunk.title,
          heading: chunk.heading,
          content: chunk.content,
          category: chunk.category,
          project: chunk.project,
          source_url: chunk.sourceUrl,
          content_hash: contentHash,
          embedding,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'chunk_key',
        },
      )

    if (error) {
      throw error
    }
  }

  const currentKeys = new Set(
    chunks.map(chunk => chunk.chunkKey),
  )

  const staleKeys = (existingRows ?? [])
    .map(row => row.chunk_key)
    .filter(chunkKey => !currentKeys.has(chunkKey))

  if (staleKeys.length > 0) {
    const { error: deleteError } = await supabase
      .from('portfolio_documents')
      .delete()
      .in('chunk_key', staleKeys)

    if (deleteError) {
      throw deleteError
    }

    console.log(`삭제된 이전 청크: ${staleKeys.length}개`)
  }

  console.log('포트폴리오 데이터 저장 완료')
}

main().catch(error => {
  console.error('포트폴리오 데이터 저장 실패:', error)
  process.exitCode = 1
})