export const debouncer = (callback: Function, cooldown: number) => {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.call(null, args);
    }, cooldown);
  };
};
export const possibleLanguages = ["en", "ja", "ar", "fr"];
