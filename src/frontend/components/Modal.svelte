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
      class="relative w-1/2 max-w-full max-h-full mx-auto my-2 bg-white overflow-scroll"
      bind:this={modalWindow}
      on:introstart={onOpen}
      on:outrostart={onClose}
      on:introend={onOpened}
      on:outroend={onClosed}>
      <svelte:component this={Component} {...props} />
    </div>
  </div>
{/if}
<slot />
