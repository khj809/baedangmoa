<script>
  import { push, location } from "svelte-spa-router";

  type PageType = "home" | "stat" | "list" | "mypage";
  let pageType: PageType;
  $: if ($location === "/") {
    pageType = "home";
  } else if ($location === "/dividends") {
    pageType = "stat";
  } else if ($location === "/dividends/list") {
    pageType = "list";
  } else if ($location === "/me") {
    pageType = "mypage";
  } else {
    pageType = null;
  }
</script>

<style>
  .navigator {
    height: 8vh;
    top: unset !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
  }
  .focused {
    background-color: rgb(67, 56, 202);
    color: #fff;
  }
</style>

<div class="navigator fixed transform-none w-full flex md:hidden">
  <div
    class={`w-1/3 flex flex-col justify-center items-center border-t border-r border-gray-300 bg-white text-gray-500 cursor-pointer ${pageType === 'home' && 'focused'}`}
    on:click={() => push('/')}>
    <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path
        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
    <p class="text-sm whitespace-nowrap">홈</p>
  </div>
  <div
    class={`w-1/3 flex flex-col justify-center items-center border-t border-r border-gray-300 bg-white text-gray-500 cursor-pointer ${pageType === 'stat' && 'focused'}`}
    on:click={() => push('/dividends')}>
    <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path
        d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
    <p class="text-sm whitespace-nowrap">배당현황</p>
  </div>
  <div
    class={`w-1/3 flex flex-col justify-center items-center border-t border-r border-gray-300 bg-white text-gray-500 cursor-pointer ${pageType === 'list' && 'focused'}`}
    on:click={() => push('/dividends/list')}>
    <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path
        fill-rule="evenodd"
        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
        clip-rule="evenodd" />
    </svg>
    <p class="text-sm whitespace-nowrap">배당내역</p>
  </div>
  <div
    class={`w-1/3 flex flex-col justify-center items-center border-t border-gray-300 text-gray-500 bg-white cursor-pointer ${pageType === 'mypage' && 'focused'}`}
    on:click={() => push('/me')}>
    <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>
    <p class="text-sm whitespace-nowrap">내정보</p>
  </div>
</div>
