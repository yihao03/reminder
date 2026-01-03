<script>
  import "./layout.css";
  import logo from "$lib/assets/remind-me.png";
  const { children } = $props();
</script>

<svelte:head><link rel="icon" href={logo} /></svelte:head>
{@render children?.()}
