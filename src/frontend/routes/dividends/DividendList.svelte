<script lang="ts">
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";

  import { authState } from "~/frontend/stores/auth";
  import preferences from "~/frontend/stores/preferences";
  import swipe from "~/frontend/actions/swipe";
  import safariOverflowHidden from "~/frontend/actions/safariOverflowHidden";
  import { GetDividends, GetDividendsDoc, DeleteDividend } from "~/frontend/graphql/codegen";
  import type { GetDividendsQuery, dividendFragment } from "~/frontend/graphql/codegen";
  import Header from "~/frontend/components/Header.svelte";
  import type { ModalContext } from "~/frontend/components/Modal.svelte";
  import Loader from "~/frontend/components/Loader.svelte";
  import SortIcon from "~/frontend/components/SortIcon.svelte";
  import PageNavigator from "~/frontend/components/PageNavigator.svelte";
  import AddDividend from "./AddDividend.svelte";
  import EditDividend from "./EditDividend.svelte";
  import { thousandSeparate } from "~/frontend/utils/number";
  import { resolve } from "~/frontend/utils/object";

  const openModal = getContext<ModalContext>("modal").open;

  const currencySymbolMap = {
    USD: "$",
    KRW: "₩",
  };

  let dividendsQuery = GetDividends({ userId: $authState.user?.uid });
  $: originalDividends = !$dividendsQuery.loading ? $dividendsQuery.data?.Dividend : [];
  let dividends: dividendFragment[] = [];

  type SortingOrder = "asc" | "desc";
  type SortingField = "company.ticker" | "amount_pretax" | "amount_posttax" | "date";
  let sortingOrder: SortingOrder = "desc";
  let sortingField: SortingField = "date";
  const onSortingChanged = (field: SortingField) => {
    if (sortingField === field) {
      if (sortingOrder === "desc") {
        sortingOrder = "asc";
      } else {
        sortingOrder = "desc";
      }
    } else {
      sortingField = field;
      sortingOrder = "desc";
    }
  };

  let searchKeyword = "";

  let currentPage = 1;
  let itemsPerPage = $preferences.dividend.tableItemsPerPage;
  $: totalPages = Math.ceil(originalDividends.length / itemsPerPage);
  $: preferences.set({ ...$preferences, dividend: { ...$preferences.dividend, tableItemsPerPage: itemsPerPage } });

  $: {
    let _dividends = originalDividends.slice();
    if (searchKeyword !== "") {
      const searchKeywordLower = searchKeyword.toLowerCase();
      _dividends = _dividends.filter(
        (div) =>
          div.company.name.toLowerCase().includes(searchKeywordLower) ||
          div.company.ticker.toLowerCase().includes(searchKeywordLower)
      );
    }
    if (sortingOrder && sortingField) {
      _dividends.sort((a, b) => {
        const aValue = resolve(a, sortingField);
        const bValue = resolve(b, sortingField);
        const result = sortingOrder === "asc" ? aValue > bValue : aValue < bValue;
        return result ? 1 : -1;
      });
    }

    totalPages = Math.ceil(_dividends.length / itemsPerPage);
    dividends = _dividends;
  }

  let curFocusedDiv = null;

  const _deleteDividend = DeleteDividend();
  const deleteDividend = async (id) => {
    await _deleteDividend({
      variables: { id },
      update: (cache, { data: { delete_Dividend_by_pk } }) => {
        const deletedId = delete_Dividend_by_pk.id;
        const existingDividends = cache.readQuery<GetDividendsQuery>({
          query: GetDividendsDoc,
          variables: { userId: $authState.user.uid },
        });
        cache.writeQuery({
          query: GetDividendsDoc,
          variables: { userId: $authState.user.uid },
          data: {
            Dividend: existingDividends.Dividend.filter((div) => div?.id !== deletedId),
          },
        });
      },
    });
    curFocusedDiv = null;
    if (currentPage > totalPages) {
      currentPage = Math.max(1, totalPages);
    }
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

  const onEditDividend = (dividend) => {
    openModal(EditDividend, { dividend });
  };

  const handleSwipe = (event: CustomEvent) => {
    if (event.detail.dx >= 100) {
      if (event.detail.horizontal === "left") {
        currentPage = currentPage < totalPages ? currentPage + 1 : currentPage;
      } else {
        currentPage = currentPage > 1 ? currentPage - 1 : currentPage;
      }
    }
  };
</script>

<Header />

{#if !$dividendsQuery.loading}
  <div class="pb-24 pt-14">
    <div class="flex justify-between mb-5 px-2 md:px-8">
      <input
        class="w-1/2 px-2 border border-gray-300"
        bind:value={searchKeyword}
        placeholder="종목명/회사명 으로 검색"
      />
      <button
        class="icon-add flex items-center text-sm md:text-base text-indigo-700 font-bold py-2 px-2 shadow-md rounded-sm bg-indigo-100 hover:bg-indigo-200"
        on:click={onCreateDividend}
      >
        <svg
          class="w-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="rgba(79, 70, 229)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        새 배당 추가
      </button>
    </div>
    {#if dividends.length > 0}
      <table class="w-full table-fixed">
        <colgroup>
          <col width="35%" />
          <col width="20%" />
          <col width="20%" />
          <col width="25%" />
        </colgroup>

        <thead class="border-b-2 border-gray-300">
          <tr>
            <th class="text-left py-2 pl-2 md:pl-8">
              <div class="inline-block align-middle cursor-pointer" on:click={() => onSortingChanged("company.ticker")}>
                <span class="th-width">종목</span>
                {#if sortingField === "company.ticker"}
                  <SortIcon order={sortingOrder} />
                {/if}
              </div>
            </th>
            <th class="text-right py-2 break-keepall">
              <div
                class="inline-block align-middle text-right cursor-pointer"
                on:click={() => onSortingChanged("amount_pretax")}
              >
                {#if sortingField === "amount_pretax"}
                  <SortIcon order={sortingOrder} />
                {/if}
                <span class="th-width">세전<em class="hidden md:inline not-italic">배당금</em></span>
              </div>
            </th>
            <th class="text-right py-2 break-keepall">
              <div
                class="inline-block align-middle text-right cursor-pointer"
                on:click={() => onSortingChanged("amount_posttax")}
              >
                {#if sortingField === "amount_posttax"}
                  <SortIcon order={sortingOrder} />
                {/if}
                <span class="th-width">세후<em class="hidden md:inline not-italic">배당금</em></span>
              </div>
            </th>
            <th class="text-right py-2 pr-2 md:pr-8 break-keepall">
              <div
                class="inline-block align-middle text-right cursor-pointer"
                on:click={() => onSortingChanged("date")}
              >
                {#if sortingField === "date"}
                  <SortIcon order={sortingOrder} />
                {/if}
                <span class="th-width"><em class="hidden md:inline not-italic">배당</em>입금일</span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody use:swipe on:swipeend={handleSwipe}>
          {#each dividends.slice((currentPage - 1) * itemsPerPage, Math.min((currentPage - 1) * itemsPerPage + itemsPerPage, originalDividends.length + 1)) as dividend, idx}
            <tr
              class={`h-16 cursor-pointer ${idx % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              on:click={() => onDividendClicked(dividend)}
            >
              <td class="pl-2 md:pl-8">
                <div class="flex items-center w-full">
                  <img
                    class="flex-shrink-0 rounded-full"
                    width={40}
                    alt={dividend.company.country}
                    src={`https://s3-symbol-logo.tradingview.com/country/${dividend.company.country}.svg`}
                  />
                  <div class="no-scrollbar text-left overflow-scroll ml-2">
                    <p class="inline-block font-bold">{dividend.company.ticker}</p>
                    <p class="text-xs whitespace-nowrap">{dividend.company.name}</p>
                  </div>
                </div>
              </td>
              <td class="pl-1.5">
                <p class="text-sm md:text-base text-right font-bold no-scrollbar overflow-scroll">
                  {currencySymbolMap[dividend.currency.symbol]}{thousandSeparate(dividend.amount_pretax)}
                </p>
              </td>
              <td class="pl-1.5">
                <p class="text-sm md:text-base text-right font-bold no-scrollbar overflow-scroll">
                  {currencySymbolMap[dividend.currency.symbol]}{thousandSeparate(dividend.amount_posttax)}
                </p>
              </td>
              <td class="text-right pl-1.5 pr-2 md:pr-8">
                <p class="text-xs md:text-base text-right">{dividend.date}</p>
              </td>
            </tr>
            {#if curFocusedDiv === dividend.id}
              <tr>
                <td colspan={4} class="p-0">
                  <div class="flex" transition:slide={{ duration: 300 }} use:safariOverflowHidden>
                    <button
                      class="flex justify-center items-center w-full py-3 text-sm md:text-base bg-blue-100 hover:bg-blue-200"
                      on:click={() => onEditDividend(dividend)}
                    >
                      <svg
                        class="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span>수정</span>
                    </button>
                    <button
                      class="flex justify-center items-center w-full py-3 text-sm md:text-base bg-red-100 hover:bg-red-200"
                      on:click={() => deleteDividend(dividend.id)}
                    >
                      <svg
                        class="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
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
      <div class="flex justify-between mt-5 px-2 md:px-8">
        <div class="flex flex-col">
          <p class="text-xs md:text-base">페이지당 표시 수</p>
          <select class="border-b bg-white" bind:value={itemsPerPage}>
            {#each [5, 6, 7, 8, 9, 10] as value}
              <option {value}>{value}</option>
            {/each}
          </select>
        </div>
        <PageNavigator bind:currentPage {totalPages} />
      </div>
    {:else}
      <div class="fixed top-0 w-screen h-screen -z-1 flex flex-col justify-center items-center">
        <svg
          class="text-gray-400 w-36 h-36"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-gray-400">배당내역이 존재하지 않습니다.</p>
      </div>
    {/if}
  </div>
{/if}

{#if $dividendsQuery.loading}
  <div class="fixed top-0 w-screen h-screen -z-1 flex flex-col justify-center items-center">
    <Loader />
    <div class="mx-auto text-center text-gray-500 font-semibold mt-6">배당 목록을 조회하고 있습니다.</div>
  </div>
{/if}

<style>
  .th-width {
    max-width: calc(100% - 1.25rem);
  }
</style>
