<script>
  import { onMount } from "svelte";
  import { LineChart } from "@carbon/charts-svelte";
  import axios from "axios";
  import dayjs from "dayjs";

  import { GetDividends } from "~/frontend/graphql/codegen";
  import type { dividendFragment } from "~/frontend/graphql/codegen";
  import { authState } from "~/frontend/stores/auth";
  import Header from "~/frontend/components/Header.svelte";
  import Loader from "~/frontend/components/Loader.svelte";
  import Toggle from "~/frontend/components/Toggle.svelte";
  import CurrencySelector from "~/frontend/components/CurrencySelector.svelte";
  import { thousandSeparate } from "~/frontend/utils/number";

  let showPosttax = true;
  let dividendsQuery = GetDividends({ userId: $authState.user?.uid });
  $: dividends = !$dividendsQuery.loading ? $dividendsQuery.data?.Dividend : [];

  let _exchangeRates = null;
  const getExchangeRates = async () => {
    const res = await axios.get("https://api.exchangeratesapi.io/latest", {
      params: {
        base: "USD",
        symbols: "USD,KRW",
      },
    });
    _exchangeRates = res.data.rates;
  };

  let baseCurrency;
  let baseCurrencySymbol;
  $: exchangeRates = !!_exchangeRates
    ? Object.keys(_exchangeRates).reduce((acc, currency) => {
        acc[currency] = _exchangeRates[currency] / _exchangeRates[baseCurrency];
        return acc;
      }, {})
    : null;

  let lineChartData = [];
  $: if (!!exchangeRates) {
    const monthlyRevenue = dividends.reduce((acc, div: dividendFragment) => {
      const month = dayjs(div.date).format("YYYY-MM");
      let amountPretax = div.amount_pretax;
      let amountPosttax = div.amount_posttax;
      amountPretax /= exchangeRates[div.currency.symbol];
      amountPosttax /= exchangeRates[div.currency.symbol];
      if (!acc[month]) {
        acc[month] = {
          amountPretax,
          amountPosttax,
        };
      } else {
        acc[month].amountPretax += amountPretax;
        acc[month].amountPosttax += amountPosttax;
      }
      return acc;
    }, {});
    lineChartData = Object.entries(monthlyRevenue).map(([month, val]) => {
      return {
        group: "배당액",
        date: month,
        value: showPosttax ? val.amountPosttax : val.amountPretax,
      };
    });
  }
  $: totalRevenue = lineChartData.reduce((acc, data) => acc + data.value, 0).toFixed(2);

  let options = {
    animations: true,
    axes: {
      bottom: { title: "연월", mapsTo: "date", scaleType: "time" },
      left: { title: "배당액($)", mapsTo: "value", scaleType: "linear" },
    },
    curve: "curveMonotoneX",
    height: "400px",
    timeScale: {
      timeIntervalFormats: { monthly: { primary: "MMM yyyy", secondary: "MMM" } },
    },
    legend: {
      enabled: false,
    },
  };

  onMount(() => {
    getExchangeRates();
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/carbon-charts.min.css" />
</svelte:head>

<Header />

{#if $dividendsQuery.loading}
  <div class="fixed top-0 w-screen h-screen -z-1 flex flex-col justify-center items-center">
    <Loader />
    <div class="mx-auto text-center text-gray-500 font-semibold mt-6">배당 목록을 조회하고 있습니다.</div>
  </div>
{:else}
  <div class="mx-4 md:mx-8">
    <div class="w-full flex justify-between mt-5">
      <div>
        <p class="text-lg font-bold">총 배당수익 <span class="text-gray-400">(환율적용 합산)</span></p>
        <p class="text-5xl font-bold text-indigo-700">{baseCurrencySymbol}{thousandSeparate(totalRevenue)}</p>
      </div>
      <div class="flex flex-col space-y-2">
        <Toggle bind:toggled={showPosttax} labelToggled="세후" labelUntoggled="세전" />
        <CurrencySelector bind:selectedCurrency={baseCurrency} bind:selectedCurrencySymbol={baseCurrencySymbol} />
      </div>
    </div>
    {#if lineChartData.length > 0}
      <div class="mt-5">
        <LineChart data={lineChartData} {options} />
      </div>
    {/if}
  </div>
{/if}
