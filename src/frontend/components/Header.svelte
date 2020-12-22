<script>
  import { push, link } from "svelte-spa-router";

  import { authState } from "~/frontend/stores/auth";
  import { signIn, signOut } from "~/frontend/firebase";
  import clickOutside from "~/frontend/actions/clickOutside";

  let showMenu = false;

  const navigateToDividendListPage = () => {
    showMenu = false;
    push("/dividends");
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

<header class="flex p-5 bg-yellow-500 justify-between items-center">
  <h1 class="text-white text-3xl"><a href="/" use:link>배당모아</a></h1>
  {#if $authState.status === 'in'}
    <div class="relative">
      <img
        class="rounded-full w-10 h-10 cursor-pointer"
        alt="profile"
        src={$authState.user.photoURL}
        on:click={toggleShowMenu}
        use:clickOutside={onClickOutsideMenu} />
      {#if showMenu}
        <div
          class="absolute -bottom-20 right-0 bg-white border rounded border-gray-200 w-32 p-3 box-border text-center">
          <button class="block w-full text-xl text-yellow-900" on:click={navigateToDividendListPage}>나의 배당</button>
          <button class="block w-full text-xl text-yellow-900" on:click={signOutAndNavigateToHome}>로그아웃</button>
        </div>
      {/if}
    </div>
  {:else}
    <div><button class="text-yellow-900" on:click={signIn}>로그인</button></div>
  {/if}
</header>
