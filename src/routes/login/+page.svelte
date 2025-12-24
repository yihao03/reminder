<script lang="ts">
  import * as Field from "$lib/components/ui/field";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { loginWithMail } from "$lib/firebase/auth";

  let email: string = "";
  let password: string = "";
  let error: string = "";

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = "";

    try {
      await loginWithMail(email, password);
    } catch (err) {
      error = "Invalid email or password";
    }
  }
</script>

<div class="w-auto max-w-md mx-auto mt-10 space-y-6">
  <div
    class="flex flex-col gap-4 bg-background p-8 rounded-md shadow-md text-center"
  >
    <form on:submit={handleSubmit}>
      <Field.Group>
        <Field.Legend>Login</Field.Legend>
        <Field.Field>
          <Field.Label>Email</Field.Label>
          <Input bind:value={email} type="text" placeholder="Email" />
        </Field.Field>
        <Field.Field>
          <Field.Label>Password</Field.Label>
          <Input bind:value={password} type="password" placeholder="Password" />
        </Field.Field>
        <Button type="submit">Login</Button>
        {#if error}
          <div class="text-red-500 mt-2">{error}</div>
        {/if}
      </Field.Group>
    </form>

    <div>or</div>

    <div>Don't have an account? <a href="/register"> Register</a></div>
  </div>
</div>
