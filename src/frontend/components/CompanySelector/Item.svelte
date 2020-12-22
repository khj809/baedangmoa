<script>
  export let item;
  export let filterText = undefined;
  export let getOptionLabel = undefined;
  export let isFirst = undefined;
  export let isActive = undefined;
  export let isHover = undefined;
</script>

<div class="flex space-x-2 cursor-pointer hover:bg-gray-400 px-4">
  <img alt="country" src={`https://s3-symbol-logo.tradingview.com/country/${item.country}.svg`} width={40} />
  <div class="flex flex-col">
    <div class="flex space-x-2 items-center">
      <p class="font-bold">{item.ticker}</p>
      <p class="text-gray-600 text-sm">{item.exchange}</p>
    </div>
    <p class="">{item.name}</p>
  </div>
</div>
