<script>
  export let toggled: boolean;
  export let labelUntoggled: string = "";
  export let labelToggled: string = "";

  const onClicked = () => {
    toggled = !toggled;
  };
</script>

<div
  class={`w-14 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out ${toggled && 'bg-indigo-700'}`}
  on:click={onClicked}>
  {#if toggled}
    <span class="absolute pl-1 text-sm text-white"> {labelToggled} </span>
  {:else}<span class="absolute text-sm pl-5"> {labelUntoggled} </span>{/if}
  <div
    class={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${toggled && 'translate-x-8'}`} />
</div>
