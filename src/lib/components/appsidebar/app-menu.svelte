<script lang="ts">
  import { House } from "@lucide/svelte";
  import type { SimpleRoute } from "$lib/types/route";
  import { Menu, MenuButton } from "$lib/components/ui/sidebar";

  const pages: SimpleRoute[] = [
    {
      name: "Home",
      route: "/",
      icon: House,
    },
  ];
</script>

<Menu>
  {#each pages as page (page.name)}
    <MenuButton>
      {#snippet child({ props })}
        <a href={page.route || page.name.toLowerCase()} {...props}>
          <page.icon />
          <span>{page.name}</span>
        </a>
      {/snippet}
    </MenuButton>
  {/each}
</Menu>
