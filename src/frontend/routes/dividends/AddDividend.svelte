<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  import { CreateDividend, GetDividendsDoc } from "~/frontend/graphql/codegen";
  import { authState } from "~/frontend/stores/auth";
  import CompanySelector from "~/frontend/components/CompanySelector";
  import DatePicker from "~/frontend/components/DatePicker.svelte";

  const { close } = getContext("modal");

  let selectedCompany;
  let selectedCurrency;
  let amountPretax;
  let amountPosttax;
  let dividendDate;

  let dateChosen;
  let formattedSelectedDate;

  $: {
    console.log(dividendDate);
  }

  const _createDividend = CreateDividend();
  const onSubmit = async (e) => {
    const result = await _createDividend({
      variables: {
        dividend: {
          company_ticker: selectedCompany.ticker,
          currency_symbol: selectedCurrency,
          amount_pretax: amountPretax,
          amount_posttax: amountPosttax,
          date: dividendDate,
        },
        company: selectedCompany,
      },

      update: (cache, { data: { insert_Dividend_one } }) => {
        const existingDividends = cache.readQuery({
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

<div>
  <h2 class="relative text-xl text-center py-3 border-b border-gray-300">새 배당 추가</h2>

  <form on:submit|preventDefault={onSubmit} class="mt-10 px-2 md:px-8">
    <CompanySelector bind:selectedCompany />

    <div class="flex mt-3 border-b border-gray-300">
      <select class="p-2.5 cursor-pointer" name="currency_symbol" default="USD" bind:value={selectedCurrency} required>
        <option value="USD">$</option>
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

    <div class="flex mt-2.5 border-b border-gray-300">
      <select class="p-2.5 cursor-pointer" name="currency_symbol" default="USD" bind:value={selectedCurrency} required>
        <option value="USD">$</option>
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
      <div class="mt-3 p-2.5 border-b border-gray-300 cursor-pointer">
        <p>배당 입금일: {formattedSelectedDate}</p>
      </div>
    </DatePicker>

    <input
      class="w-full text-white mt-10 p-2.5 rounded-md bg-indigo-700 cursor-pointer"
      type="submit"
      value="추가"
      disabled={!selectedCompany} />
  </form>
</div>
