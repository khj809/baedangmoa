import { replace } from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import Home from "./Home.svelte";
// import Mypage from './Mypage.svelte';
import { DividendListPage, AddDividendPage } from "./dividends";
import NotFound from "./NotFound.svelte";

import { authState } from "~/frontend/stores/auth";

const withAuth = (Component) => {
  return wrap({
    component: Component,
    conditions: [
      (detail) => {
        console.log(!!authState.get());
        return !!authState.get().user;
      },
    ],
  });
};

export const onConditionsFailed = (event) => {
  console.log(event.detail);
  if (!event.detail.userData) {
    replace("/");
  }
};

export default {
  "/dividends/new": withAuth(AddDividendPage),
  "/dividends": withAuth(DividendListPage),
  "/": Home,
  "*": NotFound,
};
