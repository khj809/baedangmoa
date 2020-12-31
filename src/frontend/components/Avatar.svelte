<script>
  import { push } from "svelte-spa-router";
  import { slide } from "svelte/transition";

  import { authState } from "~/frontend/stores/auth";
  import { signOut } from "~/frontend/auth";
  import clickOutside from "~/frontend/actions/clickOutside";

  let showMenu = false;

  const navigateToDividendStatPage = () => {
    showMenu = false;
    push("/dividends");
  };
  const navigateToDividendListPage = () => {
    showMenu = false;
    push("/dividends/list");
  };

  const signOutAndNavigateToHome = () => {
    showMenu = false;
    signOut();
    push("/");
  };

  const toggleShowMenu = () => {
    showMenu = !showMenu;
  };
  const onClickOutsideMenu = () => {
    if (showMenu) {
      showMenu = false;
    }
  };
</script>

<img
  class="rounded-full w-10 h-10 cursor-pointer"
  alt="profile"
  src={$authState.user?.photoURL}
  on:click={toggleShowMenu}
  use:clickOutside={onClickOutsideMenu} />
{#if showMenu}
  <div
    class="absolute right-0 bg-white border rounded border-gray-200 w-40 p-3 box-border text-center z-10"
    transition:slide={{ duration: 300 }}>
    <button class="block w-full text-xl text-indigo-700 hover:bg-gray-300" on:click={navigateToDividendStatPage}>나의
      배당현황</button>
    <button
      class="block w-full text-xl text-indigo-700 hover:bg-gray-300"
      on:click={navigateToDividendListPage}>배당내역 관리</button>
    <button
      class="block w-full text-xl text-indigo-700 hover:bg-gray-300"
      on:click={signOutAndNavigateToHome}>로그아웃</button>
  </div>
{/if}
