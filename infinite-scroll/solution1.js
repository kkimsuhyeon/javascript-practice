import "regenerator-runtime/runtime";

import renderList from "./listRenderer";
import { debounce } from "./util";

const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const loadMore = async () => {
  const target = page ? fetchMoreTrigger : app;
  target.classList.add("loading");
  await renderList(page++);
  target.classList.remove("loading");
};

const onScroll = (e) => {
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
  if (scrollTop + clientHeight === scrollHeight) {
    loadMore();
  }
};

document.addEventListener("scroll", debounce(onScroll, 300));

loadMore();

// clientHeight : 현재 화면에 보이는 진짜 요소의 높이를 의미
// scrollHeight : 스크롤될 수 있는 높이
// scrollTop : 스크롤이 위에서 얼마나 떨어져있는지
