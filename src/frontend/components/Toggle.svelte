<script>
  export let toggled: boolean;
  export let labelUntoggled: string = "";
  export let labelToggled: string = "";

  const onClicked = () => {
    toggled = !toggled;
  };
</script>

<div
  class={`w-20 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out ${toggled && 'bg-indigo-700'}`}
  on:click={onClicked}>
  {#if toggled}
    <p class="absolute pl-3 text-white">{labelToggled}</p>
  {:else}
    <p class="absolute pl-8">{labelUntoggled}</p>
  {/if}
  <div
    class={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${toggled && 'translate-x-12'}`} />
</div>
