const $nav = document.querySelector("#nav");
const $navItems = Array.from($nav.children);

const $contents = document.querySelector("#contents");
const $contentsItems = Array.from($contents.children);

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    // entries는 observer가 적용된 모든 element를 의미

    const { target } =
      entries.find((entry) => {
        return entry.isIntersecting;
        // isIntersecting : 현재 화면에 표출되고 있는지 여부
        // intersectionRatio : 현재 화면에 표출되고 있는 비율
      }) || {};

    const targetIndex = $contentsItems.indexOf(target);
    $navItems.forEach((elem, index) => {
      if (index === targetIndex) elem.classList.add("on");
      else elem.classList.remove("on");
    });
  },

  { root: null, rootMargin: "0px", threshold: 0.5 }
);

$contentsItems.forEach((item) => scrollSpyObserver.observe(item));

// observe : 대상 관찰을 위한 등록
// unobserve : 대상 관찰 멈춤
// disconnect : 다수의 엘리먼트 모두 관찰 멈춤
// takerecords : 관찰 대상 객체 배열 리턴

$nav.addEventListener("click", (e) => {
  const targetElem = e.target;

  if (targetElem.tagName === "BUTTON") {
    $contentsItems[+targetElem.innerText - 1].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});
