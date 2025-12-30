<script lang="ts">
  import type { EventListView } from "$lib/types/event";
  import { Card, Content, Header, Title } from "$lib/components/ui/card";
  import Label from "../ui/label/label.svelte";
  import Separator from "../ui/separator/separator.svelte";

  const { event }: { event: EventListView } = $props();
</script>

<a class="block" href="/event/{event.id}">
  <Card class="w-3xl mx-2">
    <Header
      class="flex flex-col justify-start md:justify-between md:items-center  md:flex-row"
    >
      <Title class="text-lg">{event.eventName}</Title>
      <Label class="italic">{event.organiser}</Label>
    </Header>
    <Content>
      <div>
        <p>
          📍: {event.isOnline ? "Zoom" : event.locationName}
        </p>
        <p>
          📅: {new Date(event.startTime).toLocaleDateString()}
        </p>
        <p>
          🕑: {new Date(event.startTime).toLocaleTimeString()} - {new Date(
            event.endTime,
          ).toLocaleTimeString()}
        </p>
      </div>
      <Separator class="my-2" />
      <p class="text-ellipsis line-clamp-3">
        {event.details}
      </p>
      <Separator class="my-2" />
      <p>
        Registered count: {event.userCount}
      </p>
    </Content>
  </Card>
</a>
