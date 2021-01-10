<script>
  import { authState, loggedIn } from "~/frontend/stores/auth";
  import { signOut } from "~/frontend/auth";
  import { push } from "svelte-spa-router";

  import Header from "~/frontend/components/Header.svelte";

  const photoURL = $authState.user?.photoURL;
  const email = $authState.user?.email;
  let displayName = $authState.user?.displayName;

  $: updated = displayName !== $authState.user?.displayName;

  const updateProfile = async () => {
    try {
      await $authState.user.updateProfile({
        displayName,
      });
      authState.set($authState);
    } catch (err) {
      console.error(err);
      alert(JSON.stringify(err));
    }
  };

  const onSignOut = () => {
    signOut();
    push("/");
  };
</script>

<Header />
{#if $loggedIn}
  <div class="mt-10 mx-8 h-full flex flex-col">
    <div class="flex justify-center"><img class="rounded-full w-32 h-32" alt="avatar" src={photoURL} /></div>
    <div class="flex flex-col mt-5">
      <label for="displayName">닉네임</label>
      <input name="displayName" class="rounded-sm px-2 py-2 border border-gray-300" bind:value={displayName} />
    </div>
    <div class="flex flex-col mt-5">
      <label for="email">이메일</label>
      <input name="email" class="rounded-sm px-2 py-2 border border-gray-300 text-gray-400" value={email} disabled />
    </div>
    <button
      class="mt-10 rounded-sm bg-indigo-700 text-white h-10 disabled:opacity-50"
      disabled={!updated}
      on:click={updateProfile}>변경사항 저장</button>
    <button class="mt-5 rounded-sm bg-red-700 text-white h-10" on:click={onSignOut}>로그아웃</button>
  </div>
{/if}
