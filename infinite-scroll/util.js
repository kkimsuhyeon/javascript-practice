const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;
// 0 ~ 1 -> 0 ~ 5 -> 1 ~ 6 -> 250 ~ 1500

const randomTimer =
  (func, ...args) =>
  (resolve) => {
    setTimeout(() => resolve(func(...args)), getRandomSeconds());
  };

export const dummyFetcher = (method, args) =>
  new Promise(randomTimer(method, args));

export const throttle = (callback, second) => {
  let throttled = false;

  return (...args) => {
    if (throttled) return;
    throttled = true;
    setTimeout(() => {
      callback(...args);
      throttled = false;
    }, second);
  };
};

export const debounce = (callback, second) => {
  let timeId = null;

  return (...args) => {
    clearTimeout(timeId);
    timeId = setTimeout(() => callback(...args), second);
  };
};
