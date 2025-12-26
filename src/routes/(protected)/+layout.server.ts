import { getAllEvents } from "$lib/server/api/events";

export async function load({ fetch }) {
  const events = await getAllEvents(fetch);
  return {
    events: events
  }
}
