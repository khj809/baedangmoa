<script>
  import { signInWithGoogle, initKakao, signInWithKakao } from "~/frontend/auth";
  import { authState, loggedIn } from "~/frontend/stores/auth";
  import Avatar from "~/frontend/components/Avatar.svelte";
  import Loader from "~/frontend/components/Loader.svelte";
</script>

<style>
  .login-button {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.11), 0 1px 3px rgba(0, 0, 0, 0.18);
  }
</style>

<svelte:head>
  <script src="https://developers.kakao.com/sdk/js/kakao.min.js" on:load={initKakao}>
  </script>
</svelte:head>

{#if $authState.status === 'authenticating'}
  <div class="fixed table w-screen h-screen z-50 bg-white opacity-80">
    <div class="table-cell text-center align-middle">
      <div class="inline-block align-top">
        <Loader />
        <div class="mx-auto text-center font-semibold mt-6 opacity-100">로그인 중입니다. 잠시만 기다려 주세요..</div>
      </div>
    </div>
  </div>
{/if}

<div class="table w-full h-screen bg-gradient-to-b from-purple-200 via-blue-100 to-blue-300">
  {#if $loggedIn}
    <div class="absolute top-4 right-4 md:right-8">
      <Avatar />
    </div>
  {/if}
  <div class="table-cell text-center align-middle">
    <div class="inline-block align-top p-2">
      <h1 class="font-extrabold text-center text-5xl text-indigo-700 pb-3">배당모아</h1>
      <p class="intro-text text-center text-base md:text-lg text-gray-500 font-semibold break-keepall">
        한눈에 보기 쉽게 정리하는 나만의 배당 가계부!
      </p>
      {#if !$loggedIn}
        <div class="flex flex-col items-center mt-8 space-y-3">
          <button
            class="login-button flex justify-center items-center w-60 h-11 text-base text-gray-700 rounded-md bg-white"
            on:click={signInWithGoogle}>
            <img class="mr-2" alt="google-login" src="/images/icon_login_google.png" width={21} height={21} />
            <span class="text-sm">구글 아이디로 로그인</span>
          </button>
          <button
            class="login-button flex justify-center items-center w-60 h-11 text-base text-gray-700 rounded-md bg-kakao"
            on:click={signInWithKakao}>
            <img class="mr-2" alt="kakao-login" src="/images/icon_login_kakao.png" width={21} height={21} />
            <span class="text-sm">카카오 아이디로 로그인</span>
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
