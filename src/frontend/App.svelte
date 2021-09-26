<script>
  import { setClient } from "svelte-apollo";
  import Router from "svelte-spa-router";

  import client from "~/frontend/graphql/client";
  import routes, { onConditionsFailed } from "~/frontend/routes";
  import { authState, loggedIn } from "~/frontend/stores/auth";
  import Modal from "~/frontend/components/Modal.svelte";
  import Loader from "~/frontend/components/Loader.svelte";
  import Navigator from "~/frontend/components/Navigator.svelte";

  import "@carbon/charts/styles.css";

  setClient(client);
</script>

<Modal>
  {#if $authState.status === "loading"}
    <div class="table w-full h-screen">
      <div class="table-cell text-center align-middle">
        <div class="inline-block align-top">
          <Loader />
          <div class="mx-auto text-center text-gray-500 font-semibold mt-6">Loading auth state..</div>
        </div>
      </div>
    </div>
  {:else}
    <Router {routes} restoreScrollState={true} on:conditionsFailed={onConditionsFailed} />
    {#if $loggedIn}
      <Navigator />
    {/if}
  {/if}
</Modal>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer utilities {
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .break-keepall {
      word-break: keep-all;
    }
  }

  @media all and (max-width: 768px) {
    body::-webkit-scrollbar {
      display: none;
    }
    body {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }
</style>
