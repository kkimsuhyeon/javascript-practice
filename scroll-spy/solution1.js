import { debounce, throttle } from "./utils.js";

const $nav = document.querySelector("#nav");
const $navItems = Array.from($nav.children);

const $contents = document.querySelector("#contents");
const $contentsItems = Array.from($contents.children);

let offsetTops = [];

const getOffsetTops = () => {
  offsetTops = $contentsItems.map((elem) => {
    const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
    return [ofs - clh / 2, ofs + clh / 2];
  });
};

const settingNav = () => {
  const scrollTop = window.pageYOffset;

  const targetIndex = offsetTops.findIndex(
    ([from, to]) => scrollTop >= from && scrollTop < to
  );

  $navItems.forEach((elem, index) => {
    if (index === targetIndex) elem.classList.add("on");
    else elem.classList.remove("on");
  });
};

window.addEventListener("scroll", throttle(settingNav, 300));

window.addEventListener("load", () => {
  getOffsetTops();
  settingNav();
});

window.addEventListener(
  "resize",
  debounce(() => {
    getOffsetTops();
    settingNav();
  }, 300)
);

$nav.addEventListener("click", (e) => {
  const targetElem = e.target;

  if (targetElem.tagName === "BUTTON") {
    $contentsItems[+targetElem.innerText - 1].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

// offsetTop : offsetTop은 부모(position이 relative인 요소)를 기준으로 위에서 얼마나 떨어져 있는지를 알려줌
// offsetLeft : offsetTop은 부모(position이 relative인 요소)를 기준으로 왼쪽에서 얼마나 떨어져 있는지를 알려줌
// 부모로 부터 거리를 체크하기 때문에 body를 기준으로의 절대값이 필요한 경우 오차가 발생할 수 있음

// clientHeight : 화면에 표시되는 진짜 요소의 높이를 의미 ( border, margin은 속하지 않음 )
// offsetHeight : 화면에 표시되는 요소의 높이를 의미 ( margin은 속하지 않음 )
// scrollHeight : 요소가 들어가 있는 컨텐츠의 전체 높이 ( 스크롤 되는 높이 전체를 의미, margin은 속하지 않음 )
// https://blogpack.tistory.com/706

// getBoundingClientRect : viewPort를 기준으로 좌표를 구해줌
// x, y, top, bottom, left, right, width, height

// 요소의 절대좌표 구하는 방법
// window.pageYOffset + element.getBoundingClientRect().top
