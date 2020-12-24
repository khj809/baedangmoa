<script>
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";

  import { authState } from "~/frontend/stores/auth";
  import { GetDividends, GetDividendsDoc, UpdateDividend, DeleteDividend } from "~/frontend/graphql/codegen";
  import Header from "~/frontend/components/Header.svelte";
  import CompanyInfo from "~/frontend/components/CompanyInfo.svelte";
  import AddDividend from "./AddDividend.svelte";
  import { thousandSeparate } from "~/frontend/utils/number";

  const openModal = getContext("modal").open;

  const currencySymbolMap = {
    USD: "$",
    KRW: "₩",
  };

  let curFocusedDiv = null;

  let dividends = GetDividends({ userId: $authState.user?.uid });

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

  const onCreateDividend = () => {
    openModal(AddDividend);
  };
</script>

<style>
  th {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: 1px solid #fff;
  }

  .tr-info-1 {
    background-color: #eee;
  }

  .tr-button > td {
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
  <Header />

  <div class="float-right float-fix mr-2 md:mr-8">
    <button
      class="icon-add flex items-center text-sm md:text-base text-indigo-700 font-bold my-4 py-2 px-2 rounded-sm bg-indigo-100 hover:bg-indigo-200"
      on:click={onCreateDividend}>
      <svg
        class="w-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="rgba(79, 70, 229)">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      새 배당 추가
    </button>
  </div>

  <table class="w-full table-fixed">
    <colgroup>
      <col width="35%" />
      <col width="20%" />
      <col width="20%" />
      <col width="25%" />
    </colgroup>

    <thead class="border-b-2 border-gray-300 ">
      <tr>
        <th class="text-left pl-2 md:pl-8">종목</th>
        <th class="text-right keepall-word">세전 배당금</th>
        <th class="text-right keepall-word">세후 배당금</th>
        <th class="text-right pr-2 md:pr-8 keepall-word">배당 입금일</th>
      </tr>
    </thead>

    <tbody>
      {#each $dividends.data.Dividend as dividend, idx}
        <tr class={`h-16 tr-info-${idx % 2} cursor-pointer`} on:click={() => onDividendClicked(dividend)}>
          <td class="pl-2 md:pl-8">
            <div class="flex items-center w-full">
              <img
                class="flex-shrink-0 rounded-full"
                width={40}
                alt={dividend.company.country}
                src={`https://s3-symbol-logo.tradingview.com/country/${dividend.company.country}.svg`} />
              <div class="no-scrollbar text-left overflow-scroll ml-4">
                <p class="inline-block font-bold" on:click={() => onCompanyClicked(dividend.company)}>
                  {dividend.company.ticker}
                </p>
                <p class="text-xs whitespace-nowrap">{dividend.company.name}</p>
              </div>
            </div>
          </td>
          <td>
            <div class="no-scrollbar text-right">
              <p class="text-sm font-bold md:text-base">
                {currencySymbolMap[dividend.currency.symbol]}{thousandSeparate(dividend.amount_pretax)}
              </p>
            </div>
          </td>
          <td>
            <div class="no-scrollbar text-right">
              <p class="text-sm font-bold md:text-base">
                {currencySymbolMap[dividend.currency.symbol]}{thousandSeparate(dividend.amount_posttax)}
              </p>
            </div>
          </td>
          <td class="text-right pr-2 md:pr-8">
            <p class="text-sm md:text-base text-right">{dividend.date}</p>
          </td>
        </tr>
        {#if curFocusedDiv === dividend.id}
          <tr class="tr-button">
            <td colspan={4}>
              <div class="flex" transition:slide={{ duration: 300 }}>
                <button
                  class="flex justify-center items-center w-full py-3 text-sm md:text-base bg-blue-100 hover:bg-blue-200">
                  <svg
                    class="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>수정</span>
                </button>
                <button
                  class="flex justify-center items-center w-full py-3 text-sm md:text-base bg-red-100 hover:bg-red-200"
                  on:click={() => deleteDividend(dividend.id)}>
                  <svg
                    class="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>삭제</span>
                </button>
              </div>
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
{/if}

{#if $dividends.loading}
  <div class="table w-full h-screen">
    <div class="table-cell text-center align-middle">
      <div class="inline-block align-top">
        <div class="loader mx-auto animate-spin w-16 h-16 rounded-full border-8 border-t-8 border-gray-200" />
        <div class="mx-auto text-center text-gray-500 font-semibold mt-6">배당 목록을 조회하고 있습니다.</div>
      </div>
    </div>
  </div>
{/if}
