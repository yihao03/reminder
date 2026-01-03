import type { EventListView, RemindEvent } from "$lib/types/event"
import { get, post } from "."

export const getEventList = async (customFetch: typeof fetch): Promise<EventListView[]> => {
  const res = await get<EventListView[]>(customFetch, "/event/list")
  return res.data;
}

export const getEventById = async (customFetch: typeof fetch, eventId: string): Promise<RemindEvent> => {
  const res = await get<RemindEvent>(customFetch, `/event/${eventId}`)
  return res.data;
}

export const createEvent = async (customFetch: typeof fetch, eventData: Partial<RemindEvent>): Promise<RemindEvent> => {
  const res = await post<RemindEvent>(customFetch, `/event/create`, eventData)
  return res.data;
}
