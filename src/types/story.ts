/**
 * Forma de una historia / ítem de Hacker News
 * que usaremos en la UI (StoryCard, listas, etc.).
 *
 * Docs: https://github.com/HackerNews/API
 */
export type HnItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt'

export interface Story {
  id: number
  title: string
  by: string
  score: number
  time: number
  type: HnItemType
  url?: string
  descendants?: number
  kids?: number[]
  text?: string
}