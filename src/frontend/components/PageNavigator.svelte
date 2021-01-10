<script>
  export let currentPage;
  export let totalPages;
  export let maxPagesToShow = 5;

  import { range } from "~/frontend/utils/number";

  let minPageNum;
  let maxPageNum;
  $: halfPagesToShow = (maxPagesToShow - 1) / 2;
  $: {
    if (currentPage < 1 + halfPagesToShow) {
      minPageNum = 1;
      maxPageNum = Math.min(maxPagesToShow, totalPages);
    } else if (currentPage > totalPages - halfPagesToShow) {
      maxPageNum = totalPages;
      minPageNum = Math.max(1, totalPages - (maxPagesToShow - 1));
    } else {
      minPageNum = Math.max(1, currentPage - halfPagesToShow);
      maxPageNum = Math.min(totalPages, currentPage + halfPagesToShow);
    }
  }

  const onPageChanged = (newPage) => {
    currentPage = newPage;
  };
</script>

<nav class="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
  <button
    class="relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100"
    on:click={() => onPageChanged(Math.max(currentPage - 1, 1))}>
    <span class="sr-only">Previous</span>
    <!-- Heroicon name: chevron-left -->
    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fill-rule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clip-rule="evenodd" />
    </svg>
  </button>
  {#each range(minPageNum, maxPageNum + 1, 1) as i}
    <button
      class={`relative inline-flex items-center font-medium text-sm px-3 py-1 border ${i === currentPage ? 'text-white border-indigo-400 bg-indigo-700' : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100'}`}
      on:click={() => onPageChanged(i)}>{i}</button>
  {/each}
  <button
    class="relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100"
    on:click={() => onPageChanged(Math.min(currentPage + 1, totalPages))}>
    <span class="sr-only">Next</span>
    <!-- Heroicon name: chevron-right -->
    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd" />
    </svg>
  </button>
</nav>
