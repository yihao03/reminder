<script>
  import {
    Footer,
    Menu,
    MenuButton,
    MenuItem,
  } from "$lib/components/ui/sidebar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { ChevronUp } from "@lucide/svelte";
  import { session } from "$lib/firebase/session";
  import { signOut } from "firebase/auth";
  import Firebase from "$lib/firebase/init";
  import { goto } from "$app/navigation";

  const username = $derived(
    $session.loading
      ? "Loading..."
      : $session?.user?.displayName || $session?.user?.email || "Login",
  );

  const handleSignout = async () => {
    console.log("Signing out...");
    signOut(Firebase.getAuth());
    await fetch("/api/auth", {
      method: "DELETE",
    });
    session.set({
      user: null,
      loading: false,
      loggedIn: false,
    });
    goto("/login");
  };
</script>

<Footer>
  <Menu>
    <MenuItem>
      {#if $session.loggedIn}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <MenuButton
                {...props}
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {username}
                <ChevronUp class="ms-auto" />
              </MenuButton>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            side="top"
            class="w-(--bits-dropdown-menu-anchor-width)"
          >
            <DropdownMenu.Item>
              <span>Account</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span>Billing</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={handleSignout}>
              <span>Sign out</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      {:else}
        <MenuButton>
          <a href="/login">Log in</a>
        </MenuButton>
      {/if}
    </MenuItem>
  </Menu>
</Footer>
