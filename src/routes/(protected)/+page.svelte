<script>
  import EventCard from "$lib/components/events/event-card.svelte";
  import {
    Root as Card,
    Header,
    Title,
    Description,
  } from "$lib/components/ui/card";

  const { data } = $props();
</script>

<!-- Main template/markup -->
<div class="max-w-5xl p-4 mx-auto">
  <h1 class="text-6xl text-bold">Reminder</h1>
  <h2>The RemindMe admin panel, empowering dementia caregivers</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
    <EventCard events={data.events} truncate={true} />
    <Card>
      <Header>
        <Title>Education</Title>
        <Description>Manage and publish educational materials</Description>
      </Header>
    </Card>
  </div>
</div>
