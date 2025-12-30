import z from "zod";
import { UserSchema } from "./auth";

export const EventSchema = z.object({
  id: z.string(),
  eventName: z.string(),
  createdAt: z.iso.datetime(),
  organiser: z.string(),
  isOnline: z.boolean(),
  locationName: z.string(),
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
  details: z.string(),
  users: z.array(UserSchema)
})

export const EventCreateSchema = EventSchema.omit({ id: true, createdAt: true, users: true })
export type EventCreate = z.infer<typeof EventCreateSchema>;

export const EventListViewSchema = EventSchema.omit({ users: true }).extend({ userCount: z.number() })
export type EventListView = z.infer<typeof EventListViewSchema>;

export type RemindEvent = z.infer<typeof EventSchema>;
