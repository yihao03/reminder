import { getEventList } from "$lib/server/api/events";

export async function load({ fetch }) {
  const events = await getEventList(fetch);
  return {
    events: events
  }
}
