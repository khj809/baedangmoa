<script>
  import { setContext } from "svelte";

  const toVoid = () => {};

  let background;
  let modalWindow;

  let Component = null;
  let props = null;
  let onOpen = toVoid;
  let onClose = toVoid;
  let onOpened = toVoid;
  let onClosed = toVoid;

  const open = (NewComponent, newProps = {}, callback = {}) => {
    Component = NewComponent;
    props = newProps;
    onOpen = callback.onOpen || toVoid;
    onClose = callback.onClose || toVoid;
    onOpened = callback.onOpened || toVoid;
    onClosed = callback.onClosed || toVoid;
  };

  const close = (callback = {}) => {
    onClose = callback.onClose || onClose;
    onClosed = callback.onClosed || onClosed;
    Component = null;
    props = null;
  };

  const handleOuterClick = (event) => {
    if (event.target === background) {
      event.preventDefault();
      close();
    }
  };

  setContext("modal", { open, close });
</script>

{#if Component}
  <div
    class="fixed z-10 flex flex-col justify-center w-full h-full bg-black bg-opacity-60"
    bind:this={background}
    on:click={handleOuterClick}>
    <div
      class="relative w-screen md:max-w-full h-screen md:max-h-full mx-auto bg-white overflow-scroll"
      bind:this={modalWindow}
      on:introstart={onOpen}
      on:outrostart={onClose}
      on:introend={onOpened}
      on:outroend={onClosed}>
      <button on:click={close} class="absolute top-3.5 right-2 z-10">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <svelte:component this={Component} {...props} />
    </div>
  </div>
{/if}
<slot />
