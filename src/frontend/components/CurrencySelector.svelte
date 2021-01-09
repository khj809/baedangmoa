<script lang="ts">
  export let selectedCurrency = "USD";
  export let selectedCurrencySymbol = "$";
  export let showBorder: boolean = true;
  export let menuAlign: "right" | "left" = "right";

  import { slide } from "svelte/transition";
  import clickOutside from "~/frontend/actions/clickOutside";
  import safariOverflowHidden from "~/frontend/actions/safariOverflowHidden";

  const items = [
    {
      label: "미국 달러 ($)",
      symbol: "$",
      value: "USD",
    },
    {
      label: "한국 원 (₩)",
      symbol: "₩",
      value: "KRW",
    },
  ];

  $: selectedItem = items.find((item) => item.value === selectedCurrency);

  let showOptions = false;

  const onSelectOption = (idx: number) => {
    showOptions = false;
    selectedCurrency = items[idx].value;
    selectedCurrencySymbol = items[idx].symbol;
  };
</script>

<div class="relative">
  <div
    use:clickOutside={() => {
      showOptions = false;
    }}
    class={`flex justify-between items-center w-max px-2 py-1 text-center ${showBorder ? 'border' : 'border-0'} border-gray-300 rounded-sm cursor-pointer`}
    on:click={() => {
      showOptions = !showOptions;
    }}>
    <span class="text-sm md:text-base mr-1.5">{selectedItem.symbol}</span>
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20 " fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd" />
    </svg>
  </div>
  {#if showOptions}
    <div
      class={`currency-menu absolute w-max top-9 ${menuAlign}-0 z-10 shadow-md bg-white border border-gray-300 rounded-sm cursor-pointer`}
      transition:slide
      use:safariOverflowHidden>
      <ul>
        {#each items as item, idx}
          <li class="text-center px-2.5 py-1.5 hover:bg-indigo-50" on:click={() => onSelectOption(idx)}>
            <p class="text-sm md:text-base whitespace-nowrap">{item.label}</p>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
