<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { session } from "$lib/firebase/session";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/appsidebar/app-sidebar.svelte";

  let { data, children } = $props();
  let loading: boolean = $state(true);
  let loggedIn: boolean = $state(false);

  session.subscribe((cur: any) => {
    loading = cur?.loading;
    loggedIn = cur?.loggedIn;
  });

  onMount(async () => {
    const user: any = await data.getAuthUser();

    const loggedIn = !!user && user?.emailVerified;
    session.update((cur: any) => {
      loading = false;
      return {
        ...cur,
        user,
        loggedIn,
        loading: false,
      };
    });

    if (loggedIn) {
      goto("/");
    } else {
      goto("/login");
    }
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
