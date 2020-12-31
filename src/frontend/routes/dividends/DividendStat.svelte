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

  let showPosttax = true;
  let dividendsQuery = GetDividends({ userId: $authState.user?.uid });
  $: dividends = !$dividendsQuery.loading ? $dividendsQuery.data?.Dividend : [];

  let exchangeRates = null;
  const getExchangeRates = async () => {
    const res = await axios.get("https://api.exchangeratesapi.io/latest", {
      params: {
        base: "USD",
        symbols: "KRW",
      },
    });
    exchangeRates = res.data;
  };

  let chartData = [];
  $: if (!!exchangeRates) {
    const monthlyRevenue = dividends.reduce((acc, div: dividendFragment) => {
      const month = dayjs(div.date).format("YYYY-MM");
      let amountPretax = div.amount_pretax;
      let amountPosttax = div.amount_posttax;
      if (div.currency.symbol !== "USD") {
        amountPretax /= exchangeRates.rates[div.currency.symbol];
        amountPosttax /= exchangeRates.rates[div.currency.symbol];
      }
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
    chartData = Object.entries(monthlyRevenue).map(([month, val]) => {
      return {
        group: "배당액",
        date: month,
        value: showPosttax ? val.amountPosttax : val.amountPretax,
      };
    });
  }
  $: totalRevenue = chartData.reduce((acc, data) => acc + data.value, 0).toFixed(2);

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
        <p class="text-lg font-bold">총 배당수익</p>
        <p class="text-5xl font-bold text-indigo-700">${totalRevenue}</p>
      </div>
      <Toggle bind:toggled={showPosttax} labelToggled="세후" labelUntoggled="세전" />
    </div>
    {#if chartData.length > 0}
      <div class="mt-5">
        <LineChart data={chartData} {options} />
      </div>
    {/if}
  </div>
{/if}
