<script>
  import { signInWithGoogle, initKakao, signInWithKakao } from "~/frontend/auth";
  import { authState } from "~/frontend/stores/auth";
  import Avatar from "~/frontend/components/Avatar.svelte";
</script>

<style>
  .login-button {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.11), 0 1px 3px rgba(0, 0, 0, 0.18);
  }
</style>

<svelte:head>
  <script src="/vendors/kakao.min.js" on:load={initKakao}>
  </script>
</svelte:head>

<div class="table w-full h-screen bg-gradient-to-b from-purple-200 via-blue-100 to-blue-300">
  {#if $authState.status === 'in'}
    <div class="absolute top-4 right-4 md:right-8">
      <Avatar />
    </div>
  {/if}
  <div class="table-cell text-center align-middle">
    <div class="inline-block align-top p-2">
      <h1 class="font-extrabold text-center text-5xl text-indigo-700 pb-3">배당모아</h1>
      <p class="intro-text text-center text-md md:text-lg text-gray-500 font-semibold keepall-word">
        한눈에 보기 쉽게 정리하는 나만의 배당 가계부!
      </p>
      {#if $authState.status === 'out'}
        <div class="flex flex-col items-center mt-8 space-y-3">
          <button
            class="login-button flex items-center w-60 h-11 text-md text-gray-700 rounded-md bg-white"
            on:click={signInWithGoogle}>
            <img class="ml-4 mr-3" alt="google-login" src="/images/icon_login_google.png" width={25} height={25} />
            <span>구글 아이디로 로그인</span>
          </button>
          <button
            class="login-button flex items-center w-60 h-11 text-md text-gray-700 rounded-md bg-kakao"
            on:click={signInWithKakao}>
            <img class="ml-4 mr-3" alt="kakao-login" src="/images/icon_login_kakao.png" width={25} height={25} />
            <span>카카오 아이디로 로그인</span>
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
