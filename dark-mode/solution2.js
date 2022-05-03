document.addEventListener("DOMContentLoaded", () => {
  let theme = localStorage.getItem("theme");

  if (!theme) {
    const { matches } = window.matchMedia("(prefers-color-scheme: dark)");
    // window.matchMedia 메서드를 통해서 OS 테마를 감지할 수 있음
    // 사용자 OS 테마가 다크 모드일 경우 matches는 true를 반환
    theme = matches ? "dark" : "light";
    localStorage.setItem("theme", theme);
  }

  document.body.classList.toggle("dark", theme === "dark");

  setTimeout(() => {
    document.body.style.visibility = "visible";
  }, 300);
});

document.querySelector(".toggle-button").onclick = (e) => {
  const theme = localStorage.getItem("theme");

  localStorage.setItem("theme", `${theme === "dark" ? "light" : "dark"}`);

  document.body.classList.toggle("dark");
};
