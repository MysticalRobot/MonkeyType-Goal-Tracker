// create handlers that manage the time spent typing and last keypress time
function createCallbacks() {
  let time: number = 0;
  let last: number | undefined = undefined;
  const keypressCallback = () => {
    if (last === undefined) {
      last = Date.now();
    }
    const current = Date.now();
    const oneSecond = 1000;
    const elapsed = (current - last) / oneSecond;
    if (elapsed > 1) {
      console.debug(`ignoring afk period of ${elapsed} seconds`);
    } else {
      time += elapsed
    }
    last = current;
  };
  const saveElapsedTime = () => {
    console.log(time);
    time = 0;
  };
  return [keypressCallback, saveElapsedTime]
}

const wordsInput = document.getElementById('wordsInput');
const [keypressCallback, saveElapsedTime] = createCallbacks();
if (wordsInput !== null &&
  keypressCallback !== undefined &&
  saveElapsedTime !== undefined) {
  wordsInput.addEventListener('keypress', keypressCallback);
  wordsInput.addEventListener('focusout', saveElapsedTime);
  const tenSeconds = 10000;
  setInterval(saveElapsedTime, tenSeconds);
}
