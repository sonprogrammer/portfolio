import matter from 'gray-matter'

export interface PortfolioChunk {
  chunkKey: string
  filePath: string
  title: string
  heading: string
  content: string
  category: string
  project: string | null
  sourceUrl: string | null
}

interface PortfolioFrontmatter {
  title?: unknown
  category?: unknown
  project?: unknown
  source_url?: unknown
}

export function createPortfolioChunks(
  markdown: string,
  filePath: string,
): PortfolioChunk[] {
  const { data, content } = matter(markdown)
  const metadata = data as PortfolioFrontmatter

  if (
    typeof metadata.title !== 'string' ||
    typeof metadata.category !== 'string'
  ) {
    throw new Error(
      `${filePath}: title과 category frontmatter가 필요합니다.`,
    )
  }

  const headingMatches = [
    ...content.matchAll(/^##\s+(.+?)\s*$/gm),
  ]

  const chunks: PortfolioChunk[] = []
  const headingCounts = new Map<string, number>()

  for (const [index, match] of headingMatches.entries()) {
    const heading = match[1].trim()
    const contentStart = (match.index ?? 0) + match[0].length
    const contentEnd =
      headingMatches[index + 1]?.index ?? content.length

    const sectionContent = content
      .slice(contentStart, contentEnd)
      .trim()

    if (!sectionContent) {
      continue
    }

    const count = (headingCounts.get(heading) ?? 0) + 1
    headingCounts.set(heading, count)

    const headingKey = count === 1 ? heading : `${heading}-${count}`

    chunks.push({
      chunkKey: `${filePath}::${headingKey}`,
      filePath,
      title: metadata.title,
      heading,
      content: sectionContent,
      category: metadata.category,
      project:
        typeof metadata.project === 'string'
          ? metadata.project
          : null,
      sourceUrl:
        typeof metadata.source_url === 'string'
          ? metadata.source_url
          : null,
    })
  }

  return chunks
}