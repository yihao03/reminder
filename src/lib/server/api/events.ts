import type { EventListView } from "$lib/types/event"
import { get } from "."

export const getAllEvents = async (customFetch: typeof fetch): Promise<EventListView[]> => {
  const res = await get<EventListView[]>(customFetch, "/events")
  return res.data;
}
