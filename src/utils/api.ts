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

/** Una historia (o comentario) por ID. Puede devolver null. */
export function getStory(id: number): Promise<Story | null> {
  return request<Story | null>(`/item/${id}.json`)
}

/**
 * Trae varias historias top en paralelo.
 */
export async function getTopStories(limit = 20): Promise<Story[]> {
  const ids = await getTopStoryIds()
  const selectedIds = ids.slice(0, limit)

  const results = await Promise.all(selectedIds.map((id) => getStory(id)))

  return results.filter(
    (item): item is Story => item !== null && item.type === 'story',
  )
}

/**
 * Trae comentarios a partir de los IDs (kids de una historia).
 * limit evita pedir decenas de requests de golpe.
 */
export async function getComments(
  ids: number[],
  limit = 15,
): Promise<Story[]> {
  const selectedIds = ids.slice(0, limit)
  const results = await Promise.all(selectedIds.map((id) => getStory(id)))

  return results.filter(
    (item): item is Story => item !== null && item.type === 'comment',
  )
}