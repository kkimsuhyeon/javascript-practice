const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;
// 0 ~ 1 -> 0 ~ 5 -> 1 ~ 6 -> 250 ~ 1500

const randomTimer =
  (func, ...args) =>
  (resolve) => {
    setTimeout(() => resolve(func(...args)), getRandomSeconds());
  };

const dummyFetcher = (method, args) => new Promise(randomTimer(method, args));
