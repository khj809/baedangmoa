<script>
  import { link } from "svelte-spa-router";
  import Avatar from "~/frontend/components/Avatar.svelte";
</script>

<header class="flex justify-between items-center px-4 md:px-8 py-4 border-b-2 border-gray-100">
  <h1 class="text-indigo-700 text-3xl font-bold"><a href="/" use:link>배당모아</a></h1>
  <div class="relative">
    <Avatar />
  </div>
</header>
