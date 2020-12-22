<script>
  import { setClient } from "svelte-apollo";
  import Router, { location } from "svelte-spa-router";

  import client from "~/frontend/graphql/client";
  import routes from "~/frontend/routes";
  import { authState } from "~/frontend/stores/auth";
  import Header from "~/frontend/components/Header.svelte";
  import Modal from "~/frontend/components/Modal.svelte";

  setClient(client);
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<Modal >
  <Header />
  {#if $authState.status === 'loading'}
    <div>Loading auth state..</div>
  {:else}
    {#key $location}
      <Router {routes} restoreScrollState={true} />
    {/key}
  {/if}
</Modal>