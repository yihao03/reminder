import { getAllEvents } from "$lib/server/api/events";

export const load = async ({ fetch }) => {
  const events = await getAllEvents(fetch);
  return {
    events
  }
}

