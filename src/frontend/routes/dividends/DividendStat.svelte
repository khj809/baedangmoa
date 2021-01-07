<script lang="ts">
  import { onMount } from "svelte";
  import { LineChart, DonutChart } from "@carbon/charts-svelte";
  import axios from "axios";
  import dayjs from "dayjs";

  import { GetDividends } from "~/frontend/graphql/codegen";
  import type { dividendFragment } from "~/frontend/graphql/codegen";
  import { authState } from "~/frontend/stores/auth";
  import { exchangeRates } from "~/frontend/stores/exchangeRates";
  import Header from "~/frontend/components/Header.svelte";
  import Loader from "~/frontend/components/Loader.svelte";
  import Toggle from "~/frontend/components/Toggle.svelte";
  import CurrencySelector from "~/frontend/components/CurrencySelector.svelte";
  import { thousandSeparate } from "~/frontend/utils/number";

  let showPosttax = true;
  let dividendsQuery = GetDividends({ userId: $authState.user?.uid });
  $: dividends = !$dividendsQuery.loading ? $dividendsQuery.data?.Dividend : [];

  const getExchangeRates = async () => {
    if (!$exchangeRates) {
      const res = await axios.get("https://api.exchangeratesapi.io/latest", {
        params: {
          base: "USD",
          symbols: "USD,KRW",
        },
      });
      exchangeRates.set(res.data.rates);
    }
  };

  let baseCurrency;
  let baseCurrencySymbol;
  $: convertedExchangeRates =
    !!baseCurrency && !!$exchangeRates
      ? Object.keys($exchangeRates).reduce((acc, currency) => {
          acc[currency] = $exchangeRates[currency] / $exchangeRates[baseCurrency];
          return acc;
        }, {})
      : null;

  let lineChartData = [];
  $: if (!!convertedExchangeRates) {
    interface MonthlyDividend {
      [month: string]: {
        amountPretax: number;
        amountPosttax: number;
      };
    }
    const monthlyDividend: MonthlyDividend = dividends.reduce((acc, div: dividendFragment) => {
      const month = dayjs(div.date).format("YYYY-MM");
      let amountPretax = div.amount_pretax / convertedExchangeRates[div.currency.symbol];
      let amountPosttax = div.amount_posttax / convertedExchangeRates[div.currency.symbol];
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
    lineChartData = Object.entries(monthlyDividend).map(([month, val]) => {
      return {
        group: "배당액",
        date: month,
        value: showPosttax ? val.amountPosttax : val.amountPretax,
      };
    });
  }
  $: totalRevenue = lineChartData.reduce((acc, data) => acc + data.value, 0).toFixed(2);

  $: lineChartOption = {
    animations: true,
    axes: {
      bottom: { title: "연월", mapsTo: "date", scaleType: "time" },
      left: { title: `배당액(${baseCurrencySymbol})`, mapsTo: "value", scaleType: "linear" },
    },
    color: {
      scale: {
        배당액: "#4338ca",
      },
    },
    // curve: "curveMonotoneX",
    height: "35vh",
    timeScale: {
      timeIntervalFormats: { monthly: { primary: "MMM yyyy", secondary: "MMM" } },
    },
    legend: {
      enabled: false,
    },
  };

  let donutChartData = [];
  $: if (!!convertedExchangeRates) {
    interface DividendPerStock {
      [company: string]: {
        amountPretax: number;
        amountPosttax: number;
      };
    }
    const dividendPerStock: DividendPerStock = dividends.reduce((acc, div: dividendFragment) => {
      let amountPretax = div.amount_pretax / convertedExchangeRates[div.currency.symbol];
      let amountPosttax = div.amount_posttax / convertedExchangeRates[div.currency.symbol];
      if (!acc[div.company.ticker]) {
        acc[div.company.ticker] = {
          amountPretax,
          amountPosttax,
        };
      } else {
        acc[div.company.ticker].amountPretax += amountPretax;
        acc[div.company.ticker].amountPosttax += amountPosttax;
      }
      return acc;
    }, {});
    donutChartData = Object.entries(dividendPerStock)
      .map(([company, val]) => {
        return {
          group: company,
          value: showPosttax ? val.amountPosttax : val.amountPretax,
        };
      })
      .sort((a, b) => (a.value < b.value ? 1 : -1));
  }
  $: donutChartOption = {
    legend: {
      alignment: "center",
      position: "right",
    },
    donut: {
      center: {
        numberFormatter: (number) => `${baseCurrencySymbol}${thousandSeparate(number.toFixed(2))}`,
      },
      alignment: "center",
    },
    height: "40vh",
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
  <div class="px-4 md:px-8 mt-10">
    <div class="w-full flex justify-between items-center">
      <p class="text-base mb-2">총 배당수익 <span class="text-gray-500">(환율적용 합산)</span></p>
      <div class="flex items-center space-x-2">
        <Toggle bind:toggled={showPosttax} labelToggled="세후" labelUntoggled="세전" />
        <CurrencySelector bind:selectedCurrency={baseCurrency} bind:selectedCurrencySymbol={baseCurrencySymbol} />
      </div>
    </div>
    <p class="text-4xl text-indigo-700 break-all">{baseCurrencySymbol}{thousandSeparate(totalRevenue)}</p>

    {#if lineChartData.length > 0}
      <div class="mt-8">
        <LineChart data={lineChartData} options={lineChartOption} />
      </div>
    {/if}
    {#if donutChartData.length > 0}
      <div class="my-10">
        <DonutChart data={donutChartData} options={donutChartOption} />
      </div>
    {/if}
  </div>
{/if}
