<script lang="ts">
  import * as Field from "$lib/components/ui/field";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import Firebase from "$lib/firebase/init";
  import {
    signInWithEmailAndPassword,
    type UserCredential,
  } from "firebase/auth";
  import { session } from "$lib/firebase/session";
  import { goto } from "$app/navigation";
  import { fail } from "@sveltejs/kit";

  let email = $state("");
  let password = $state("");

  const handleLogin = async (event: SubmitEvent) => {
    event.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(
        Firebase.getAuth(),
        email,
        password,
      );

      const { user }: UserCredential = result;

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: await user.getIdToken() }),
      });

      if (!response.ok) {
        throw new Error("Failed to persist session");
      }

      session.set({
        user,
        loading: false,
        loggedIn: true,
      });

      goto("/");
    } catch (error: any) {
      console.error("Login error:", error, { email });
      return fail(401, { error: "Invalid email or password" });
    }
  };
</script>

<div class="w-auto max-w-md mx-auto mt-10 space-y-6">
  <div
    class="flex flex-col gap-4 bg-background p-8 rounded-md shadow-md text-center"
  >
    <form onsubmit={handleLogin}>
      <Field.Group>
        <Field.Legend>Login</Field.Legend>
        <Field.Field>
          <Field.Label>Email</Field.Label>
          <Input type="email" placeholder="Email" bind:value={email} required />
        </Field.Field>
        <Field.Field>
          <Field.Label>Password</Field.Label>
          <Input bind:value={password} type="password" placeholder="Password" />
        </Field.Field>
        <Button type="submit">Login</Button>
      </Field.Group>
    </form>

    <div>or</div>

    <div>Don't have an account? <a href="/register"> Register</a></div>
  </div>
</div>
