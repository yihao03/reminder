import z from "zod";

export const UserSchema = z.object({
  email: z.email().nullable(),
  displayName: z.string().nullable(),
  photoURL: z.string().nullable(),
  uid: z.string(),
});
export type User = z.infer<typeof UserSchema>

export const AuthSchema = z.object({
  user: UserSchema,
  idToken: z.string()
})
export type Auth = z.infer<typeof AuthSchema>


export type SessionState = {
  user: User | null;
  loading?: boolean;
  loggedIn?: boolean;
};
