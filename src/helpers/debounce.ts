export function debounce<T extends any[]>(
  func: (...args: T) => any,
  ms: number
) {
  let timeout: NodeJS.Timeout;

  return function (...args: T) {
    clearTimeout(timeout);
    if (args[0] === null) return;

    timeout = setTimeout(() => func.call(undefined, ...args), ms);
  };
}
