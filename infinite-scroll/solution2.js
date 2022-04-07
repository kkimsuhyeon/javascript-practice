import "regenerator-runtime/runtime";
import renderList from "./listRenderer";

const fetchMoreTrigger = document.querySelector("#fetchMore");
const app = document.querySelector("#app");

let page = 0;

const loadMore = async () => {
  if (page === 0) app.classList.add("loading");
  await renderList(page++);
  fetchMoreTrigger.classList.add("loading");
  if (app.classList.contains("loading")) app.classList.remove("loading");
};

const fetchMoreObserver = new IntersectionObserver(
  ([{ isIntersecting }]) => {
    if (isIntersecting) loadMore();
  },
  { root: null, rootMargin: "0px", threshold: 0.8 }
);

loadMore();

fetchMoreObserver.observe(fetchMoreTrigger);
