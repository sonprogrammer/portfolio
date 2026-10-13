import path from 'node:path'

export interface PortfolioIngestArguments {
  filePath: string | null
  dryRun: boolean
}

interface ExistingPortfolioRow {
  chunk_key: string
  file_path: string
}

export function parsePortfolioIngestArguments(
  arguments_: string[],
): PortfolioIngestArguments {
  let filePath: string | null = null
  let dryRun = false

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index]

    if (argument === '--dry-run') {
      dryRun = true
      continue
    }

    if (argument === '--file') {
      const value = arguments_[index + 1]

      if (!value) {
        throw new Error('--file 뒤에 Markdown 파일 경로가 필요합니다.')
      }

      const normalizedPath = path.posix.normalize(
        value.replaceAll('\\', '/'),
      )

      if (
        path.posix.isAbsolute(normalizedPath) ||
        normalizedPath === '..' ||
        normalizedPath.startsWith('../')
      ) {
        throw new Error('--file은 portfolio-data 내부 경로여야 합니다.')
      }

      if (!normalizedPath.endsWith('.md')) {
        throw new Error('--file은 .md 파일이어야 합니다.')
      }

      filePath = normalizedPath.replace(/^\.\//, '')
      index += 1
      continue
    }

    throw new Error(`지원하지 않는 인자입니다: ${argument}`)
  }

  return {
    filePath,
    dryRun,
  }
}

export function findStaleChunkKeys(
  existingRows: ExistingPortfolioRow[],
  currentKeys: Set<string>,
  targetFilePath: string | null,
) {
  return existingRows
    .filter(
      row =>
        targetFilePath === null ||
        row.file_path === targetFilePath,
    )
    .map(row => row.chunk_key)
    .filter(chunkKey => !currentKeys.has(chunkKey))
}

export function selectMarkdownFiles(
  dataDirectory: string,
  markdownFiles: string[],
  targetFilePath: string | null,
) {
  if (targetFilePath === null) {
    return markdownFiles
  }

  const targetAbsolutePath = path.resolve(
    dataDirectory,
    targetFilePath,
  )
  const selectedFiles = markdownFiles.filter(
    filePath => path.resolve(filePath) === targetAbsolutePath,
  )

  if (selectedFiles.length === 0) {
    throw new Error(
      `적재할 Markdown 파일을 찾을 수 없습니다: ${targetFilePath}`,
    )
  }

  return selectedFiles
}
