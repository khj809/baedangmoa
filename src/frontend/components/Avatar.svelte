<script>
  import { push } from "svelte-spa-router";
  import { slide } from "svelte/transition";

  import { authState } from "~/frontend/stores/auth";
  import { signOut } from "~/frontend/auth";
  import clickOutside from "~/frontend/actions/clickOutside";
  import safariOverflowHidden from "~/frontend/actions/safariOverflowHidden";

  let showMenu = false;

  const navigateToDividendStatPage = () => {
    showMenu = false;
    push("/dividends");
  };
  const navigateToDividendListPage = () => {
    showMenu = false;
    push("/dividends/list");
  };
  const navigateToMypage = () => {
    showMenu = false;
    push("/me");
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

<div class="cursor-pointer" on:click={toggleShowMenu} use:clickOutside={onClickOutsideMenu}>
  <img class="inline-block vertical-center rounded-full w-10 h-10" alt="profile" src={$authState.user?.photoURL} />
  <svg
    class="inline-block vertical-center w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20 "
    fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clip-rule="evenodd" />
  </svg>
</div>
{#if showMenu}
  <ul
    class="absolute w-max top-12 right-0 text-center list-none shadow-md bg-white border rounded-sm border-gray-200 box-border z-10 cursor-pointer"
    transition:slide={{ duration: 300 }}
    use:safariOverflowHidden>
    <li class="px-5 py-2 hover:bg-indigo-50" on:click={navigateToDividendStatPage}>
      <p class="text-sm md:text-base whitespace-nowrap">나의 배당현황</p>
    </li>
    <li class="px-5 py-2 hover:bg-indigo-50" on:click={navigateToDividendListPage}>
      <p class="text-sm md:text-base whitespace-nowrap">배당내역 관리</p>
    </li>
    <li class="px-5 py-2 hover:bg-indigo-50" on:click={navigateToMypage}>
      <p class="text-sm md:text-base whitespace-nowrap">마이페이지</p>
    </li>
    <li class="px-5 py-2 hover:bg-indigo-50" on:click={signOutAndNavigateToHome}>
      <p class="text-sm md:text-base">로그아웃</p>
    </li>
  </ul>
{/if}
