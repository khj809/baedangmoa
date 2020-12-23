<script>
  import { getContext } from "svelte";
  import { link } from "svelte-spa-router";
  import { slide } from "svelte/transition";

  import { authState } from "~/frontend/stores/auth";
  import { GetDividends, GetDividendsDoc, UpdateDividend, DeleteDividend } from "~/frontend/graphql/codegen";
  import CompanyInfo from "~/frontend/components/CompanyInfo.svelte";
  import { thousandSeparate } from "~/frontend/utils/number";

  const openModal = getContext("modal").open;

  const currencySymbolMap = {
    USD: "$",
    KRW: "₩",
  };

  let curFocusedDiv = null;

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

  const onDividendClicked = (dividend) => {
    if (curFocusedDiv === dividend.id) {
      curFocusedDiv = null;
    } else {
      curFocusedDiv = dividend.id;
    }
  };
</script>

<style>
  td {
    text-align: center;
    padding: 0;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>

{#if !$dividends.loading}
  <a href="/dividends/new" use:link>새 배당 추가</a>
  <table class="w-full mt-10 table-fixed">
    <colgroup>
      <col width="40%" />
      <col width="20%" />
      <col width="20%" />
      <col width="20%" />
    </colgroup>
    <thead>
      <tr>
        <th>종목</th>
        <th>세전 배당금</th>
        <th>세후 배당금</th>
        <th>배당일</th>
      </tr>
    </thead>
    <tbody>
      {#each $dividends.data.Dividend as dividend}
        <tr class="hover:bg-gray-300" on:click={() => onDividendClicked(dividend)}>
          <td>
            <div class="flex space-x-2 items-center w-full">
              <img
                class="flex-shrink-0"
                width={40}
                alt={dividend.company.country}
                src={`https://s3-symbol-logo.tradingview.com/country/${dividend.company.country}.svg`} />
              <div class="no-scrollbar text-left overflow-scroll">
                <p class="font-bold cursor-pointer inline-block" on:click={() => onCompanyClicked(dividend.company)}>
                  {dividend.company.ticker}
                </p>
                <p class="text-xs whitespace-nowrap">{dividend.company.name}</p>
              </div>
            </div>
          </td>
          <td>
            <div class="no-scrollbar text-right">
              {currencySymbolMap[dividend.currency.symbol]}{thousandSeparate(dividend.amount_pretax)}
            </div>
          </td>
          <td>
            <div class="no-scrollbar text-right">
              {currencySymbolMap[dividend.currency.symbol]}{thousandSeparate(dividend.amount_posttax)}
            </div>
          </td>
          <td>
            <p class="text-xs md:text-base">{dividend.date}</p>
          </td>
        </tr>
        {#if curFocusedDiv === dividend.id}
          <tr>
            <td colspan={4}>
              <div class="flex" transition:slide={{ duration: 300 }}>
                <button class="w-full bg-blue-300 py-3">수정</button>
                <button class="w-full bg-red-200 py-3" on:click={() => deleteDividend(dividend.id)}>삭제</button>
              </div>
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
{/if}
