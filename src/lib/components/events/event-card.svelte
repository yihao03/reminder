<script lang="ts">
  import type { EventListView } from "$lib/types/event";
  import { Card, Header, Title, Description } from "$lib/components//ui/card";
  const { events }: { events: EventListView[] } = $props();
</script>

<Card>
  <Header>
    <Title>Events</Title>
    <Description>View and manage upcoming events</Description>
    {#each events as event}
      <div class="mt-4 p-4 border rounded">
        <h3 class="text-lg font-semibold">{event.eventName}</h3>
        <p class="text-sm text-gray-600">
          Date: {new Date(event.startTime).toLocaleDateString()}
        </p>
        <p class="text-sm text-gray-600">Location: {event.locationName}</p>
      </div>
    {/each}
  </Header>
</Card>
