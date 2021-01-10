<script>
  export let item;
  export let filterText = undefined;
  export let getOptionLabel = undefined;
  export let isFirst = undefined;
  export let isActive = undefined;
  export let isHover = undefined;
</script>

<div class="flex p-2 box-border border-b-2 border-gray-100 hover:bg-gray-100 cursor-pointer">
  <img
    class="flex-shrink-0 rounded-full"
    alt="country"
    src={`https://s3-symbol-logo.tradingview.com/country/${item.country}.svg`}
    width={40}
    height={40} />
  <div class="flex flex-col justify-center w-full pl-2 overflow-hidden">
    <div class="flex justify-between items-center">
      <p class="font-bold">{item.ticker}</p>
      <p class="text-sm text-gray-600">{item.exchange}</p>
    </div>
    <p class="text-xs whitespace-nowrap">{item.name}</p>
  </div>
</div>
