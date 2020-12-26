<script lang="ts">
  export let dividend: Dividend;

  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import dayjs from "dayjs";

  import { UpdateDividend, GetDividendsDoc } from "~/frontend/graphql/codegen";
  import type { GetDividendsQuery, Dividend } from "~/frontend/graphql/codegen";
  import { authState } from "~/frontend/stores/auth";
  import CompanySelector from "~/frontend/components/CompanySelector/index.svelte";
  import DatePicker from "~/frontend/components/DatePicker.svelte";

  const { close } = getContext("modal");

  let selectedCompany = dividend.company;
  let selectedCurrency = dividend.currency.symbol;
  let amountPretax = dividend.amount_pretax;
  let amountPosttax = dividend.amount_posttax;
  let dividendDate = dayjs(dividend.date).toDate();
  let formattedSelectedDate;

  let editButtonDisabled = true;
  $: {
    editButtonDisabled =
      !(
        selectedCompany.ticker !== dividend.company.ticker ||
        selectedCurrency !== dividend.currency.symbol ||
        amountPretax !== dividend.amount_pretax ||
        amountPosttax !== dividend.amount_posttax ||
        dayjs(dividendDate).format("YYYY-MM-DD") !== dividend.date
      ) || !selectedCompany;
  }

  const _updateDividend = UpdateDividend();
  const onSubmit = async (e) => {
    const result = await _updateDividend({
      variables: {
        id: dividend.id,
        set: {
          company_ticker: selectedCompany.ticker,
          currency_symbol: selectedCurrency,
          amount_pretax: amountPretax,
          amount_posttax: amountPosttax,
          date: dayjs(dividendDate).format("YYYY-MM-DD"),
        },
      },
    });
    if (!result.errors) {
      close();
    }
  };
</script>

<div transition:scale={{ duration: 300, easing: cubicInOut }}>
  <h2 class="relative text-xl text-center py-4 border-b border-gray-300">배당 정보 수정하기</h2>

  <form on:submit|preventDefault={onSubmit} class="mt-12 px-4 md:px-8">
    <CompanySelector bind:selectedCompany />

    <div class="flex mt-8 border-b border-gray-300">
      <select class="p-2.5 cursor-pointer bg-white" name="currency_symbol" bind:value={selectedCurrency} required>
        <option value="USD" default>$</option>
        <option value="KRW">₩</option>
      </select>
      <input
        class="w-full p-2.5"
        type="number"
        step="any"
        name="amount_pretax"
        bind:value={amountPretax}
        placeholder="세전 금액"
        required />
    </div>

    <div class="flex mt-8 border-b border-gray-300">
      <select class="p-2.5 cursor-pointer bg-white" name="currency_symbol" bind:value={selectedCurrency} required>
        <option value="USD" default>$</option>
        <option value="KRW">₩</option>
      </select>
      <input
        class="w-full p-2.5"
        type="number"
        step="any"
        name="amount_posttax"
        bind:value={amountPosttax}
        placeholder="세후 금액"
        required />
    </div>

    <DatePicker bind:selected={dividendDate} bind:formattedSelected={formattedSelectedDate}>
      <div class="mt-8 p-2.5 bg-gray-200 cursor-pointer">
        <div>
          <span class="align-middle">배당 입금일: {formattedSelectedDate}</span>
          <svg
            class="inline align-middle ml-2 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </DatePicker>

    <button
      class="w-full text-white mt-12 p-2.5 rounded-sm bg-indigo-700 disabled:opacity-50"
      disabled={editButtonDisabled}>수정</button>
  </form>
</div>
