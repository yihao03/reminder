<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { session } from "$lib/firebase/session";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/appsidebar/app-sidebar.svelte";
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();

  $effect(() => {
    session.update((cur) => {
      return {
        ...cur,
        user: data.user,
        loggedIn: !!data.user,
      };
    });
  });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Sidebar.Provider>
  <AppSidebar />
  <main class="flex w-full flex-col">
    <Sidebar.Trigger />
    <div class="flex-1 w-full overflow-auto">
      {@render children?.()}
    </div>
  </main>
</Sidebar.Provider>
