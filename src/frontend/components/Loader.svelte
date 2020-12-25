<script>
  export let width = "4rem";
  export let height = "4rem";
</script>

<style>
  .loader {
    border-top-color: rgba(79, 70, 229);
    width: var(--width);
    height: var(--height);
  }
</style>

<div
  class="loader mx-auto animate-spin rounded-full border-8 border-t-8 border-gray-200"
  style={`--width: ${width}; --height: ${height}`} />
