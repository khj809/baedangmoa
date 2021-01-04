<script lang="ts">
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import dayjs from "dayjs";

  import { CreateDividend, GetDividendsDoc } from "~/frontend/graphql/codegen";
  import type { GetDividendsQuery } from "~/frontend/graphql/codegen";
  import { authState } from "~/frontend/stores/auth";
  import CompanySelector from "~/frontend/components/CompanySelector/index.svelte";
  import CurrencySelector from "~/frontend/components/CurrencySelector.svelte";
  import DatePicker from "~/frontend/components/DatePicker.svelte";

  const { close } = getContext("modal");

  let selectedCompany;
  let selectedCurrency;
  let amountPretax;
  let amountPosttax;
  let dividendDate;

  let formattedSelectedDate;

  const _createDividend = CreateDividend();
  const onSubmit = async (e) => {
    const result = await _createDividend({
      variables: {
        dividend: {
          company_ticker: selectedCompany.ticker,
          currency_symbol: selectedCurrency,
          amount_pretax: amountPretax,
          amount_posttax: amountPosttax,
          date: dayjs(dividendDate).format("YYYY-MM-DD"),
        },
        company: selectedCompany,
      },

      update: (cache, { data: { insert_Dividend_one } }) => {
        const existingDividends = cache.readQuery<GetDividendsQuery>({
          query: GetDividendsDoc,
          variables: { userId: $authState.user.uid },
        });
        if (existingDividends && insert_Dividend_one) {
          cache.writeQuery({
            query: GetDividendsDoc,
            variables: { userId: $authState.user.uid },
            data: {
              Dividend: [...existingDividends?.Dividend, insert_Dividend_one],
            },
          });
        }
      },
    });
    if (!result.errors) {
      close();
    }
  };
</script>

<div transition:scale={{ duration: 300, easing: cubicInOut }}>
  <h2 class="relative text-xl text-center py-4 border-b border-gray-300">새 배당 추가</h2>

  <form on:submit|preventDefault={onSubmit} class="mt-12 px-4 md:px-8">
    <CompanySelector bind:selectedCompany />

    <div class="flex items-center mt-8 border-b border-gray-300">
      <CurrencySelector bind:selectedCurrency menuAlign="left" showBorder={false} />
      <input
        class="w-full p-2.5"
        type="number"
        step="any"
        name="amount_pretax"
        bind:value={amountPretax}
        placeholder="세전 금액"
        required />
    </div>

    <div class="flex items-center mt-8 border-b border-gray-300">
      <CurrencySelector bind:selectedCurrency menuAlign="left" showBorder={false} />
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

    <input
      class="w-full text-white mt-12 p-2.5 rounded-sm bg-indigo-700 cursor-pointer"
      type="submit"
      value="추가"
      disabled={!selectedCompany} />
  </form>
</div>
