import { getEventById } from "$lib/server/api/events";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const event = await getEventById(fetch, params.id);
  return {
    event
  }
}
