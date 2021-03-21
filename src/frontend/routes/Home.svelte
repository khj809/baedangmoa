<script>
  import { signInWithGoogle, initKakao, signInWithKakao } from "~/frontend/auth";
  import { authState, loggedIn } from "~/frontend/stores/auth";
  import Avatar from "~/frontend/components/Avatar.svelte";
  import Loader from "~/frontend/components/Loader.svelte";
  // import { GetDividendsCount } from "~/frontend/graphql/codegen";

  // const dividendsCountQuery = GetDividendsCount({});
  // let totalUsers = 0;
  // let totalDividends = 0;
  // $: if (!$dividendsCountQuery.loading) {
  //   totalUsers = $dividendsCountQuery.data?.num_users.aggregate.count;
  //   totalDividends = $dividendsCountQuery.data?.num_dividends.aggregate.count;
  // }
</script>

<svelte:head>
  <script src="https://developers.kakao.com/sdk/js/kakao.min.js" on:load={initKakao}>
  </script>
</svelte:head>

{#if $authState.status === "authenticating"}
  <div class="fixed table w-screen h-screen z-50 bg-white opacity-80">
    <div class="table-cell text-center align-middle">
      <div class="inline-block align-top">
        <Loader />
        <div class="mx-auto text-center font-semibold mt-6 opacity-100">로그인 중입니다. 잠시만 기다려 주세요..</div>
      </div>
    </div>
  </div>
{/if}

{#if $loggedIn}
  <div class="hidden md:block absolute top-4 right-4 md:right-8">
    <Avatar />
  </div>
{/if}

<div class="table w-full h-screen bg-gradient-to-b from-purple-200 via-blue-100 to-blue-300">
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
            on:click={signInWithGoogle}
          >
            <img class="mr-2" alt="google-login" src="/images/icon_login_google.png" width={21} height={21} />
            <span class="text-sm">구글 아이디로 로그인</span>
          </button>
          <button
            class="login-button flex justify-center items-center w-60 h-11 text-base text-gray-700 rounded-md bg-kakao"
            on:click={signInWithKakao}
          >
            <img class="mr-2" alt="kakao-login" src="/images/icon_login_kakao.png" width={21} height={21} />
            <span class="text-sm">카카오 아이디로 로그인</span>
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- <div class="table w-full h-screen bg-gradient-to-b from-blue-300 via-blue-100 to-purple-200">
  <div class="mt-20 mx-8 ">
    <p>아직도 엑셀로 힘들게 배당내역 정리하시나요?</p>
    <p>이제 배당모아로 배당내역을 체계적이고 편리하게 관리하세요!</p>
  </div>
</div>
<div class="table w-full h-screen bg-gradient-to-b from-purple-200 via-blue-100 to-indigo-700">
  <div class="mt-20 mx-8 ">
    <p>{totalUsers} 명의 사용자들이 배당모아를 통해</p>
    <p>총 {totalDividends} 건의 배당내역을 관리하고 있습니다.</p>
    <p>지금 바로 가입하고 체계적인 배당 관리를 시작하세요!</p>
  </div>
</div>
<div class="table w-full h-1/2 bg-indigo-700">
  <div class="pb-24 mx-8 text-white">
    <p>사업자번호: XXX-XX-XXXXXX</p>
    <p>대표: 김해준</p>
  </div>
</div> -->
<style>
  .login-button {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.11), 0 1px 3px rgba(0, 0, 0, 0.18);
  }
</style>
