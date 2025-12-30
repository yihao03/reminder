import { createEvent } from '$lib/server/api/events.js';
import { EventCreateSchema, type RemindEvent } from '$lib/types/event.js';

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();

    const rawStartTime = formData.get('startTime') as string;
    const rawEndTime = formData.get('endTime') as string;

    const data = {
      id: formData.get('id'),
      eventName: formData.get('eventName'),
      createdAt: new Date().toISOString(),
      organiser: formData.get('organiser'),
      isOnline: formData.has('isOnline'),
      locationName: formData.get('locationName'),
      startTime: rawStartTime ? new Date(rawStartTime).toISOString() : '',
      endTime: rawEndTime ? new Date(rawEndTime).toISOString() : '',
      details: formData.get('details'),
      users: JSON.parse(formData.get('users') as string || '[]')
    };

    const event = EventCreateSchema.parse(data);

    let res: RemindEvent;
    try {
      res = await createEvent(fetch, event);
    } catch (error) {
      console.error('Error creating event:', error);
      return { success: false, error: 'Failed to create event' };
    }
    return { success: true, event: res };
  }
}
