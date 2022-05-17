document.querySelector<HTMLDivElement>(".stopwatch").onclick = (() => {
  let isRunning = false;
  let elapsedTime = { mm: 0, ss: 0, ms: 0 };
  let laps = [];

  const [$btnStartOrStop, $btnResetOrLap] =
    document.querySelectorAll<HTMLButtonElement>(".stopwatch > .control");

  const formatElapsedTime = (() => {
    const format = (n: number) => (n < 10 ? "0" + n : n + "");
    return ({ mm, ss, ms }: { mm: number; ss: number; ms: number }) =>
      `${format(mm)}:${format(ss)}:${format(ms)}`;
  })();

  const renderElapsedTime = (() => {
    const $display = document.querySelector(".stopwatch > .display");
    return () => {
      $display.textContent = formatElapsedTime(elapsedTime);
      // textContent는 <script>와 <style> 요소를 포함한 모든 요소의 콘텐츠를 가져옵니다.
      // innerText는 "사람이 읽을 수 있는" 요소만 처리합니다.
      // https://developer.mozilla.org/ko/docs/Web/API/Node/textContent#innertext%EC%99%80%EC%9D%98_%EC%B0%A8%EC%9D%B4%EC%A0%90

      // 화면이 수정되는 코드가 있으면 무조건 렌더링 하는듯 ??
    };
  })();

  const renderLaps = (() => {
    const $laps = document.querySelector<HTMLDivElement>(".stopwatch > .laps");

    const createLapElement = (
      newLap: { mm: number; ss: number; ms: number },
      index: number
    ) => {
      const $fragment = document.createDocumentFragment();
      // Fragment를 생성

      const $index = document.createElement("div");
      $index.textContent = `${index}`;
      $fragment.appendChild($index);

      const $newLab = document.createElement("div");
      $newLab.textContent = formatElapsedTime(newLap);
      $fragment.appendChild($newLab);

      $laps.appendChild($fragment);

      $laps.style.display = "grid";
    };

    const removeAllLapElement = () => {
      document
        .querySelectorAll<HTMLDivElement>(".laps > div:not(.lap-title)")
        .forEach(($lap) => $lap.remove()); // 요소 삭제

      $laps.style.display = "none";
    };

    return () => {
      const { length } = laps;

      if (length) {
        const newLap = laps[length - 1];
        createLapElement(newLap, length);
      } else {
        removeAllLapElement();
      }
    };
  })();

  const handleBtnStartOrStop = (() => {
    let timeId: NodeJS.Timer | null = null;

    const start = () => {
      timeId = setInterval(() => {
        let { mm, ms, ss } = elapsedTime;

        ms = ms + 1;

        if (ms >= 100) {
          ss = ss + 1;
          ms = 0;
        }

        if (ss >= 60) {
          mm = mm + 1;
          ss = 0;
        }

        $btnResetOrLap.disabled = !(mm + ss + ms);

        elapsedTime = { mm, ss, ms };
        renderElapsedTime();
      }, 10);
    };

    const stop = () => {
      clearInterval(timeId);
    };

    return () => {
      isRunning ? stop() : start();
      isRunning = !isRunning;

      $btnStartOrStop.textContent = isRunning ? "Stop" : "Start";
      $btnResetOrLap.textContent = isRunning ? "Lap" : "Reset";
    };
  })();

  const handleBtnResetOrLap = (() => {
    const reset = () => {
      $btnResetOrLap.disabled = true;

      elapsedTime = { mm: 0, ss: 0, ms: 0 };
      renderElapsedTime();

      laps = [];
      renderLaps();
    };

    const addLap = () => {
      laps = [...laps, elapsedTime];
      renderLaps();
    };

    return () => {
      isRunning ? addLap() : reset();
    };
  })();

  return ({ target }) => {
    if (!(target as HTMLElement).classList.contains("control")) return;
    target === $btnStartOrStop ? handleBtnStartOrStop() : handleBtnResetOrLap();
  };
})();
