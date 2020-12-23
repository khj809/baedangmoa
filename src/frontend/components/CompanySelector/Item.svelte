<script>
  export let item;
  export let filterText = undefined;
  export let getOptionLabel = undefined;
  export let isFirst = undefined;
  export let isActive = undefined;
  export let isHover = undefined;
</script>

<div class="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 box-border border-b-2 border-gray-100">
  <img
    class="rounded-full"
    alt="country"
    src={`https://s3-symbol-logo.tradingview.com/country/${item.country}.svg`}
    width={40}
    height={40} />
  <div class="flex flex-col w-full">
    <div class="flex space-x-2 items-center">
      <p class="font-bold">{item.ticker}</p>
      <p class="text-gray-600 text-sm">{item.exchange}</p>
    </div>
    <p class="">{item.name}</p>
  </div>
</div>
