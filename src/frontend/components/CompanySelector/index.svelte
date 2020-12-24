<script>
  export let selectedCompany = undefined;

  import axios from "axios";
  import Select from "svelte-select";
  import Item from "./Item.svelte";

  const searchCompanies = async (keyword) => {
    if (!keyword) {
      searchedCompanies = [];
      return;
    }
    const result = await axios.get("/api/symbol_search", {
      params: {
        text: keyword,
      },
    });
    return result.data;
  };

  const getOptionLabel = (option) => option.ticker;
  const getSelectionLabel = (option) => `${option.ticker} - ${option.name}`;
</script>

<style global>
  .selectContainer > input {
    cursor: text !important;
  }

  .selectContainer > input::placeholder {
    font-size: 1rem;
  }

  .selectContainer > div:not(.spinner):not(.clearSelect) {
    left: -1px !important;
  }
</style>

<Select
  loadOptions={searchCompanies}
  bind:selectedValue={selectedCompany}
  optionIdentifier="ticker"
  placeholder="종목을 선택해 주세요"
  noOptionsMessage="검색된 종목이 없습니다"
  {getOptionLabel}
  {getSelectionLabel}
  {Item} />
