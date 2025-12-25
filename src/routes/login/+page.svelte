<script lang="ts">
  import * as Field from "$lib/components/ui/field";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<div class="w-auto max-w-md mx-auto mt-10 space-y-6">
  <div
    class="flex flex-col gap-4 bg-background p-8 rounded-md shadow-md text-center"
  >
    <form use:enhance method="POST">
      <Field.Group>
        <Field.Legend>Login</Field.Legend>
        <Field.Field>
          <Field.Label>Email</Field.Label>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form?.email ?? ""}
            required
          />
        </Field.Field>
        <Field.Field>
          <Field.Label>Password</Field.Label>
          <Input name="password" type="password" placeholder="Password" />
        </Field.Field>
        <Button type="submit">Login</Button>
        {#if form?.error}
          <div class="text-red-500 mt-2">{form.error}</div>
        {/if}
      </Field.Group>
    </form>

    <div>or</div>

    <div>Don't have an account? <a href="/register"> Register</a></div>
  </div>
</div>
