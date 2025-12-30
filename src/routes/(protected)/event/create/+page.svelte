<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as Field from "$lib/components/ui/field";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

  const nowLocal: string = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 16);
</script>

<div class="w-full max-w-md flex flex-col p-8">
  <h1 class="text-2xl font-bold">Create Event</h1>

  <form use:enhance method="post" class="mx-auto w-lg">
    <Field.Group>
      <Field.Set>
        <Field.Legend>Create Event</Field.Legend>
      </Field.Set>

      <Field.Set>
        <Field.Label for="eventName">Event name</Field.Label>
        <Input id="eventName" name="eventName" type="text" required />
      </Field.Set>

      <Field.Set>
        <Field.Label for="organiser">Organiser</Field.Label>
        <Input id="organiser" name="organiser" type="text" required />
      </Field.Set>

      <Field.Separator />

      <Field.Group>
        <Field.Set>
          <Label for="locationName">Location name</Label>
          <Input id="locationName" name="locationName" type="text" required />
        </Field.Set>
        <Field.Set class="flex flex-row items-center">
          <Input type="hidden" name="isOnline" value="false" />
          <Checkbox name="isOnline" id="isOnline" value="true" />
          <Field.Label for="isOnline">Is online?</Field.Label>
        </Field.Set>
      </Field.Group>

      <Field.Separator />

      <Field.Set class="grid grid-cols-2">
        <Field.Set>
          <Field.Label for="startTime">Start time</Field.Label>
          <Input
            id="startTime"
            name="startTime"
            type="datetime-local"
            value={nowLocal}
            required
          />
        </Field.Set>

        <Field.Set>
          <Field.Label for="endTime">End time</Field.Label>
          <Input
            id="endTime"
            name="endTime"
            type="datetime-local"
            value={nowLocal}
            required
          />
        </Field.Set>
      </Field.Set>

      <Field.Set>
        <Field.Label for="details">Details</Field.Label>
        <Textarea id="details" name="details" rows={4} required></Textarea>
      </Field.Set>

      <Field.Set>
        <Button type="submit">Create</Button>
      </Field.Set>
    </Field.Group>
  </form>
</div>
