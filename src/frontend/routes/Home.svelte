<script>
  import { signIn } from "~/frontend/firebase";
  import { authState } from "~/frontend/stores/auth";
  import Avatar from "~/frontend/components/Avatar.svelte";
</script>

<style>
  .button {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
</style>

<div class="table w-full h-screen bg-gradient-to-b from-purple-200 via-blue-100 to-blue-300">
  {#if $authState.status === 'in'}
    <div class="absolute top-3 right-2 md:right-8">
      <Avatar />
    </div>
  {/if}
  <div class="table-cell text-center align-middle">
    <div class="inline-block align-top">
      <h1 class="font-bold text-indigo-700 text-center text-5xl pb-2">배당모아</h1>
      <p class="text-gray-500 text-center text-lg font-bold">한눈에 보기 쉽게 정리하는 나만의 배당 가계부!</p>
      {#if $authState.status === 'out'}
        <div class="text-center">
          <button
            class="text-lg text-white w-64 mt-8 p-3 rounded-full bg-indigo-600 button"
            on:click={signIn}>로그인</button>
        </div>
      {/if}
    </div>
  </div>
</div>
