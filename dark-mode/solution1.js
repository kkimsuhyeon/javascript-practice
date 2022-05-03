document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");

  if (!theme) localStorage.setItem("theme", "light");

  document.body.classList.toggle("dark", theme === "dark"); // 뒤에 값에 따라서 클래스 넣고 빼기함

  setTimeout(() => {
    document.body.style.visibility = "visible";
  }, 300);
});

document.querySelector(".toggle-button").onclick = (e) => {
  const theme = localStorage.getItem("theme");

  localStorage.setItem("theme", `${theme === "dark" ? "light" : "dark"}`);

  document.body.classList.toggle("dark");
};

// DOMContentLoaded : 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생 ( img, css 등의 기타 자원은 기다리지 않음)
//    DOM 노드를 찾아서 핸들러를 등록해 인터페이스 초기화 할 때 사용 가능
// load : HTML로 DOM 트리를 만드는게 완성되고, 이미지 / 스타일 시트같은 외부 자원도 모두 불러오는 것이 끝났을 떄
//    이미지 사이즈 확인, 화면에 뿌려지는 요소의 실제 크기를 확인할 수 있음
//    window.load
// beforeunload / unload : 사용자가 페이지를 떠날 때 발생
//    beforeunload : 사용자가 떠나기 전, 변경되지 않은 사항들 저장확인시킬때
//    unload : 사용자가 진짜 떠나기 전, 사용자 분석 정보를 담은 통계자료 전송

// document.readyState : 현재 로딩 상태를 알려줌 ( loading, interactive, complete )
