<script>
  import { setClient } from "svelte-apollo";
  import Router from "svelte-spa-router";

  import client from "~/frontend/graphql/client";
  import routes, { onConditionsFailed } from "~/frontend/routes";
  import { authState } from "~/frontend/stores/auth";
  import Modal from "~/frontend/components/Modal.svelte";

  setClient(client);
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<Modal>
  {#if $authState.status === 'loading'}
    <div>Loading auth state..</div>
  {:else}
    <Router {routes} restoreScrollState={true} on:conditionsFailed={onConditionsFailed} />
  {/if}
</Modal>
