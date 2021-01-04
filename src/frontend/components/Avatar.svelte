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
  <ul
    class="absolute w-max top-12 right-0 text-center list-none shadow-md bg-white border rounded-sm border-gray-200 box-border z-10 cursor-pointer"
    transition:slide={{ duration: 300 }}>
    <li class="text-sm md:text-base px-5 py-2 hover:bg-indigo-50" on:click={navigateToDividendStatPage}>
      나의 배당현황
    </li>
    <li class="text-sm md:text-base px-5 py-2 hover:bg-indigo-50" on:click={navigateToDividendListPage}>
      배당내역 관리
    </li>
    <li class="text-sm md:text-base px-5 py-2 hover:bg-indigo-50" on:click={signOutAndNavigateToHome}>로그아웃</li>
  </ul>
{/if}
