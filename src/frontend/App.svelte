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

  .loader {
    border-top-color: rgba(79, 70, 229);
  }

  .keepall-word {
    word-break: keep-all;
  }

  .float-fix:after {
    display: block;
    content: "";
    clear: both;
  }

  .box-shadow {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
</style>

<Modal>
  {#if $authState.status === 'loading'}
    <div class="table w-full h-screen">
      <div class="table-cell text-center align-middle">
        <div class="inline-block align-top">
          <div class="loader mx-auto animate-spin w-16 h-16 rounded-full border-8 border-t-8 border-gray-200" />
          <div class="mx-auto text-center text-gray-500 font-semibold mt-6">Loading auth state..</div>
        </div>
      </div>
    </div>
  {:else}
    <Router {routes} restoreScrollState={true} on:conditionsFailed={onConditionsFailed} />
  {/if}
</Modal>
