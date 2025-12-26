import z from "zod";
import { UserSchema } from "./auth";

export const EventSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime(),
  organiser: z.string(),
  isOnline: z.boolean(),
  locationName: z.string(),
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
  details: z.string(),
  eventName: z.string(),
  users: z.array(UserSchema)
})

export const EventListViewSchema = EventSchema.omit({ createdAt: true, details: true, registeredUsers: true })
export type EventListView = z.infer<typeof EventListViewSchema>

export type RemindEvent = z.infer<typeof EventSchema>;
