<script>
  import { signInWithGoogle, initKakao, signInWithKakao } from "~/frontend/auth";
  import { authState } from "~/frontend/stores/auth";
  import Avatar from "~/frontend/components/Avatar.svelte";
</script>

<style>
  .login-google,
  .login-kakao {
    width: 80%;
    max-width: 290px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.11), 0 1px 3px rgba(0, 0, 0, 0.18);
  }

  .login-google {
    background: url("/images/icon_login_google.png") no-repeat 7% 50%;
    background-size: 25px;
    background-color: #fff;
  }

  .login-kakao {
    background: url("/images/icon_login_kakao.png") no-repeat 5% 50%;
    background-size: 35px;
    background-color: #fee500;
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
        <button
          class="login-google block h-11 text-md text-gray-700 mt-8 mb-3 rounded-md bg-white"
          on:click={signInWithGoogle}>
          구글 로그인
        </button>
        <button class="login-kakao block h-11 text-md text-gray-700 rounded-md" on:click={signInWithKakao}>
          카카오 로그인
        </button>
      {/if}
    </div>
  </div>
</div>
