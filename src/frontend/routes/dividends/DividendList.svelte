<script>
  import { getContext } from "svelte";
  import { link } from "svelte-spa-router";

  import { authState } from "~/frontend/stores/auth";
  import { GetDividends, GetDividendsDoc, UpdateDividend, DeleteDividend } from "~/frontend/graphql/codegen";
  import CompanyInfo from "~/frontend/components/CompanyInfo.svelte";

  const openModal = getContext("modal").open;

  const currencySymbolMap = {
    USD: "$",
    KRW: "₩",
  };

  let dividends = GetDividends({ userId: $authState.user.uid });

  //   const updateDividend = async (id, set) => {
  //     const result = await $client.mutate({ mutation: UpdateDividendDocument, variables: { id, set } });
  //     if (result.errors) {
  //       console.log(result.errors);
  //       return;
  //     }
  //     dividends[dividends.findIndex((item) => item.id === id)] = result.data.update_Dividend_by_pk;
  //   };

  const _deleteDividend = DeleteDividend();
  const deleteDividend = async (id) => {
    _deleteDividend({
      variables: { id },
      update: (cache, { data: { delete_Dividend_by_pk } }) => {
        const deletedId = delete_Dividend_by_pk.id;
        const existingDividends = cache.readQuery({
          query: GetDividendsDoc,
          variables: { userId: $authState.user.uid },
        });
        cache.writeQuery({
          query: GetDividendsDoc,
          variables: { userId: $authState.user.uid },
          data: {
            Dividend: existingDividends?.Dividend.filter((div) => div?.id !== deletedId),
          },
        });
      },
    });
  };

  const onCompanyClicked = (company) => {
    openModal(CompanyInfo, { company });
  };
</script>

<style>
  td {
    text-align: center;
  }
</style>

{#if !$dividends.loading}
  <a href="/dividends/new" use:link>새 배당 추가</a>
  <table class="table-auto w-full mt-10">
    <thead>
      <tr>
        <th>종목</th>
        <th>세전 배당금</th>
        <th>세후 배당금</th>
        <th>배당일</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {#each $dividends.data.Dividend as dividend}
        <tr class="hover:bg-gray-300">
          <td>
            <div class="flex space-x-2 items-center">
              <img
                class="flex-shrink-0"
                width={40}
                alt={dividend.company.country}
                src={`https://s3-symbol-logo.tradingview.com/country/${dividend.company.country}.svg`} />
              <div class="flex flex-col text-left">
                <p class="font-bold cursor-pointer" on:click={() => onCompanyClicked(dividend.company)}>
                  {dividend.company.ticker}
                </p>
                <p class="text-xs truncate">{dividend.company.name}</p>
              </div>
            </div>
          </td>
          <td>{currencySymbolMap[dividend.currency.symbol]}{dividend.amount_pretax}</td>
          <td>{currencySymbolMap[dividend.currency.symbol]}{dividend.amount_posttax}</td>
          <td>{dividend.date}</td>
          <td><button type="button">수정</button></td>
          <td><button type="button" on:click={() => deleteDividend(dividend.id)}>삭제</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
