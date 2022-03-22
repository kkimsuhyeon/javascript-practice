export const throttle = (callback, second) => {
  // 한번 실행하면 설정 초 동안은 함수가 실행되지 않음
  let throttled = false;

  return (...args) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        callback(...args);
        throttled = false;
      }, second);
    }
  };
};

export const debounce = (callback, second) => {
  // 특정 시간이 지난 후 하나의 이벤트가 발생되도록 함
  let timeId = null;

  return (...args) => {
    clearTimeout(timeId);
    timeId = setTimeout(callback.bind(null, ...args), second); // ??
  };
};
