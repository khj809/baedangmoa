<script>
  export let currentPage;
  export let totalPages;

  import { range } from "~/frontend/utils/number";

  let minPageNum;
  let maxPageNum;
  $: {
    if (currentPage < 4) {
      minPageNum = 1;
      maxPageNum = Math.min(7, totalPages);
    } else if (currentPage > totalPages - 3) {
      maxPageNum = totalPages;
      minPageNum = Math.max(1, totalPages - 6);
    } else {
      minPageNum = Math.max(1, currentPage - 3);
      maxPageNum = Math.min(totalPages, currentPage + 3);
    }
  }

  const onPageChanged = (newPage) => {
    currentPage = newPage;
  };
</script>

<nav class="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
  <button
    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
      class={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${i === currentPage ? 'text-indigo-700 font-bold' : 'text-black'}`}
      on:click={() => onPageChanged(i)}>{i}</button>
  {/each}
  <button
    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
