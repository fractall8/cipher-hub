export function debounce<T extends (...args: never[]) => void>(
  func: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), ms);
  };
}
