<script>
  import EventListItem from "$lib/components/events/event-list-item.svelte";

  const { data } = $props();
</script>

<div class="w-full flex flex-col">
  <h1 class="text-4xl font-bold p-8">Events</h1>
  <div class="space-y-4 mx-auto">
    {#each data.events as event}
      <EventListItem {event} />
    {/each}
  </div>
</div>
