<script>
  export let selected;
  export let dateChosen = null;
  export let formattedSelected = null;

  import DatePicker from "svelte-calendar";

  const format = "#{Y}년 #{m}월 #{d}일";
  const daysOfWeek = [
    ["일요일", "일"],
    ["월요일", "월"],
    ["화요일", "화"],
    ["수요일", "수"],
    ["목요일", "목"],
    ["금요일", "금"],
    ["토요일", "토"],
  ];
  const monthsOfYear = [
    ["1월", "1월"],
    ["2월", "2월"],
    ["3월", "3월"],
    ["4월", "4월"],
    ["5월", "5월"],
    ["6월", "6월"],
    ["7월", "7월"],
    ["8월", "8월"],
    ["9월", "9월"],
    ["10월", "10월"],
    ["11월", "11월"],
    ["12월", "12월"],
  ];
</script>

<style global>
  div.datepicker {
    width: 100%;
  }
</style>

<DatePicker {format} {daysOfWeek} {monthsOfYear} bind:selected bind:formattedSelected bind:dateChosen>
  <slot />
</DatePicker>
