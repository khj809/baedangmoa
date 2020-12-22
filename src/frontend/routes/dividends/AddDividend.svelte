<script>
  import { pop, push } from "svelte-spa-router";

  import { CreateDividend, GetDividendsDoc } from "~/frontend/graphql/codegen";
  import { authState } from "~/frontend/stores/auth";
  import CompanySelector from "~/frontend/components/CompanySelector";

  let selectedCompany;
  let selectedCurrency;
  let amountPretax;
  let amountPosttax;
  let dividendDate;

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
      push("/dividends");
    }
  };
</script>

<button on:click={pop}>뒤로가기</button>
<h1 class="text-4xl">새 배당 추가하기</h1>
<form on:submit|preventDefault={onSubmit}>
  <CompanySelector bind:selectedCompany />
  <select class="w-full" name="currency_symbol" default="USD" bind:value={selectedCurrency} required>
    <option value="USD">USD</option>
    <option value="KRW">KRW</option>
  </select>
  <input
    class="w-full"
    type="number"
    step="any"
    name="amount_pretax"
    bind:value={amountPretax}
    placeholder="세전 금액"
    required />
  <input
    class="w-full"
    type="number"
    step="any"
    name="amount_posttax"
    bind:value={amountPosttax}
    placeholder="세후 금액"
    required />
  <input class="w-full" type="date" placeholder="배당일" bind:value={dividendDate} required />

  <input type="submit" value="추가" disabled={!selectedCompany} />
</form>
