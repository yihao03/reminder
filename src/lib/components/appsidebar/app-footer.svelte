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

  const user = $derived($session?.user ?? undefined);
  const username = $derived(user ? user.displayName || user.email : "Login");
</script>

<Footer>
  <Menu>
    <MenuItem>
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
          <DropdownMenu.Item>
            <span>Sign out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </MenuItem>
  </Menu>
</Footer>
