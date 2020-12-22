<script>
  export let company;

  import { onMount } from "svelte";

  let scriptComponent;

  onMount(() => {
    scriptComponent.innerHTML = `
      {
        "symbol": "${company.exchange}:${company.ticker}",
        "colorTheme": "light",
        "isTransparent": false,
        "largeChartUrl": "",
        "displayMode": "regular",
        "width": 480,
        "height": 830,
        "locale": "kr"
        }
      `;
  });
</script>

<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container mx-auto h-screen overflow-y-scroll">
  <div class="tradingview-widget-container__widget" />
  <div class="tradingview-widget-copyright" />
  <script
    type="text/javascript"
    src="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
    bind:this={scriptComponent}>
  </script>
</div>
<!-- TradingView Widget END -->
