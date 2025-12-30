import { getEventById } from "$lib/server/api/events";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { RemindEvent } from "$lib/types/event";

export const load: PageServerLoad = async ({ fetch, params }) => {
  let event: RemindEvent;
  try {
    event = await getEventById(fetch, params.id);
  } catch (error) {
    redirect(307, '/event');
  }
  return {
    event
  }
}
