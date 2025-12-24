<script>
  import {
    Root as Card,
    Header,
    Title,
    Description,
    Action,
    Content,
  } from "$lib/components/ui/card";
</script>

<!-- Main template/markup -->
<div class="container">
  <h1 class="text-6xl text-bold">Reminder</h1>
  <h2>The RemindMe admin panel, empowering dementia caregivers</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
    <Card>
      <Header>
        <Title>Events</Title>
        <Description>View and manage upcoming events</Description>
      </Header>
    </Card>
    <Card>
      <Header>
        <Title>Education</Title>
        <Description>Manage and publish educational materials</Description>
      </Header>
    </Card>
  </div>
</div>

<style>
  /* Component-scoped styles */
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #333;
  }
</style>
