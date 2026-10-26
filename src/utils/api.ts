import type { Story } from '../types/story'

const API_BASE = 'https://hacker-news.firebaseio.com/v0'

/**
 * Pedido genérico a la API.
 * Si la respuesta no es OK, lanzamos un error.
 */
async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`)

  if (!response.ok) {
    throw new Error(`Error HN API (${response.status}): ${path}`)
  }

  return response.json() as Promise<T>
}

/** Lista de IDs de las historias top. */
export function getTopStoryIds(): Promise<number[]> {
  return request<number[]>('/topstories.json')
}

/** Una historia por ID. La API puede devolver null si el ítem no existe. */
export function getStory(id: number): Promise<Story | null> {
  return request<Story | null>(`/item/${id}.json`)
}

/**
 * Trae varias historias en paralelo.
 * limit: cuántas queremos mostrar.
 */
export async function getTopStories(limit = 20): Promise<Story[]> {
  const ids = await getTopStoryIds()
  const selectedIds = ids.slice(0, limit)

  const results = await Promise.all(selectedIds.map((id) => getStory(id)))

  // Filtramos nulls y nos quedamos solo con type "story"
  return results.filter(
    (item): item is Story => item !== null && item.type === 'story',
  )
}