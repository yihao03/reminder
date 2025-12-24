<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppFooter from "./app-footer.svelte";
  import AppMenu from "./app-menu.svelte";
</script>

<Sidebar.Root>
  <!-- <Sidebar.Header /> -->
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Pages</Sidebar.GroupLabel>
      <AppMenu />
    </Sidebar.Group>
  </Sidebar.Content>
  <AppFooter />
</Sidebar.Root>
