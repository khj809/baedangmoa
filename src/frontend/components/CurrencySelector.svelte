<script>
  export let selectedCurrency = "USD";
  export let selectedCurrencySymbol = "$";

  import { slide } from "svelte/transition";
  import clickOutside from "~/frontend/actions/clickOutside";

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
    class="w-20 h-8 flex flex-col items-center text-center bg-indigo-700 rounded-full cursor-pointer"
    on:click={() => {
      showOptions = !showOptions;
    }}>
    <p class="w-full text-2xl text-white text-center">{selectedItem.symbol}</p>
  </div>
  {#if showOptions}
    <div
      class="absolute w-max top-10 right-0 z-10 bg-white border border-gray-300 rounded-sm cursor-pointer"
      transition:slide>
      <ul>
        {#each items as item, idx}
          <li class="pl-2 pr-2 pt-1 pb-1 text-xl hover:bg-indigo-100" on:click={() => onSelectOption(idx)}>
            {item.label}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
