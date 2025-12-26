<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/appsidebar/app-sidebar.svelte";
  import type { LayoutProps } from "./$types";
  import Firebase from "$lib/firebase/init";
  import { session } from "$lib/firebase/session";
  import { onAuthStateChanged } from "firebase/auth";
  import { onMount } from "svelte";

  let { children }: LayoutProps = $props();

  onMount(() => {
    Firebase.getInstance();
    const unsubscribe = onAuthStateChanged(Firebase.getAuth(), (user) => {
      if (user) {
        session.set({
          user: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
          loading: false,
          loggedIn: !!user,
        });
      } else {
        session.set({
          user: null,
          loading: false,
          loggedIn: false,
        });
      }
    });

    return unsubscribe; // Cleanup when component unmounts
  });
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main class="flex w-full flex-col">
    <Sidebar.Trigger />
    <div class="flex-1 w-full overflow-auto">
      {@render children?.()}
    </div>
  </main>
</Sidebar.Provider>
