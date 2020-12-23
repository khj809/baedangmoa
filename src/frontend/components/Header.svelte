<script>
  import { link } from "svelte-spa-router";
  import Avatar from "~/frontend/components/Avatar.svelte";
</script>

<header class="flex justify-between items-center px-2 md:px-8 py-3">
  <h1 class="text-indigo-700 text-3xl font-bold"><a href="/" use:link>배당모아</a></h1>
  <div class="relative">
    <Avatar />
  </div>
</header>
