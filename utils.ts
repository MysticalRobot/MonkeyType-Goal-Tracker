export function getIntervalManager(callback: () => void,
  timeout: number, intervalType: string) {
  let interval: number | undefined = undefined
  return () => {
    if (document.hidden) {
      console.debug(`clearing ${intervalType} interval`);
      clearInterval(interval);

    } else {
      console.debug(`setting ${intervalType} interval`);
      interval = setInterval(callback, timeout);
    }
  };
}
