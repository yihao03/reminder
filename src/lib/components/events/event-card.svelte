<script lang="ts">
  import type { EventListView } from "$lib/types/event";
  import {
    Card,
    Header,
    Title,
    Description,
    Content,
  } from "$lib/components//ui/card";
  const {
    events,
    truncate = true,
  }: { events: EventListView[]; truncate: boolean } = $props();

  const displayedEvents = $derived(events?.slice(0, 5));
  const hasMore = $derived(events?.length > 5);
</script>

<a href="/event" class="block">
  <Card>
    <Header>
      <Title>Events</Title>
      <Description>View and manage upcoming events</Description>
    </Header>
    <Content>
      {#each truncate ? displayedEvents : events as event (event.id)}
        <a
          href={` /event/${event.id}`}
          class="block hover:bg-gray-50 p-2 border first:rounded-t-lg last:rounded-b-lg"
        >
          <h3 class="text-lg font-semibold">{event.eventName}</h3>
          <p class="text-sm text-gray-600">
            Date: {new Date(event.startTime).toLocaleDateString()}
          </p>
          <p class="text-sm text-gray-600">Location: {event.locationName}</p>
        </a>
      {/each}
      {#if hasMore}
        <div class="text-center text-sm text-gray-500 py-2 border-t">
          +{events?.length - 5} more events
        </div>
      {/if}
    </Content>
  </Card>
</a>
