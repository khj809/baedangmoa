import Home from "./Home.svelte";
// import Mypage from './Mypage.svelte';
import { DividendListPage, AddDividendPage } from "./dividends";
import NotFound from "./NotFound.svelte";

export default {
  "/dividends/new": AddDividendPage,
  "/dividends": DividendListPage,
  "/": Home,
  "*": NotFound,
};
