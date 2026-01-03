<script lang="ts">
  import { CalendarFold, House, PencilLine, ScrollText } from "@lucide/svelte";
  import type { SimpleRoute } from "$lib/types/route";
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuSub,
    MenuSubItem,
  } from "$lib/components/ui/sidebar";
  import * as Collapsible from "../ui/collapsible";
  import { slide } from "svelte/transition";

  const pages: SimpleRoute[] = [
    {
      name: "Home",
      route: "/",
      icon: House,
    },
    {
      name: "Event",
      icon: CalendarFold,
      nested: [
        {
          name: "Create",
          icon: PencilLine,
        },
        {
          name: "Manage",
          route: "/",
          icon: ScrollText,
        },
      ],
    },
  ];
</script>

<Menu>
  {#each pages as page (page.name)}
    {#if page.nested}
      <Collapsible.Root class="group/collapsible" open>
        <MenuItem>
          <Collapsible.Trigger>
            {#snippet child({ props })}
              <MenuButton {...props}>
                <page.icon />
                <span>{page.name}</span>
              </MenuButton>
            {/snippet}
          </Collapsible.Trigger>
          <Collapsible.Content>
            <MenuSub>
              {#each page.nested as subpage (subpage.name)}
                <MenuSubItem>
                  <a
                    href={"/" +
                      (page.route || page.name.toLowerCase()) +
                      (subpage.route || "/" + subpage.name.toLowerCase())}
                  >
                    <span class="text-sm">{subpage.name}</span>
                  </a>
                </MenuSubItem>
              {/each}
              <MenuSubItem />
              <MenuSubItem />
            </MenuSub>
          </Collapsible.Content>
        </MenuItem>
      </Collapsible.Root>
    {:else}
      <MenuButton>
        {#snippet child({ props })}
          <a href={page.route || page.name.toLowerCase()} {...props}>
            <page.icon />
            <span>{page.name}</span>
          </a>
        {/snippet}
      </MenuButton>
    {/if}
  {/each}
</Menu>
