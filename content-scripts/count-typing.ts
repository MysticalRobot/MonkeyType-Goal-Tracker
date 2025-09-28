function createTimingCallbacks(): [() => void, () => void] {
  let timeTypingSeconds: number = 0;
  let lastTime: number | undefined = undefined;
  const recordTimeTyping = () => {
    if (lastTime === undefined) {
      lastTime = Date.now();
    }
    const currentTime = Date.now();
    const oneSecondInMS = 1000;
    const elapsedTimeSeconds = (currentTime - lastTime) / oneSecondInMS;
    if (elapsedTimeSeconds > 1) {
      console.debug(`ignoring afk period of ${elapsedTimeSeconds} seconds`);
    } else {
      timeTypingSeconds += elapsedTimeSeconds
    }
    lastTime = currentTime;
  };
  const saveTimeTyping = () => {
    console.log(timeTypingSeconds);
    timeTypingSeconds = 0;
  };
  return [recordTimeTyping, saveTimeTyping]
}

const wordsInput = document.getElementById('wordsInput');
const [recordTimeTyping, saveTimeTyping] = createTimingCallbacks();
if (wordsInput !== null) {
  wordsInput.addEventListener('keypress', recordTimeTyping);
  wordsInput.addEventListener('focusout', saveTimeTyping);
  const tenSecondsInMS = 10000;
  setInterval(saveTimeTyping, tenSecondsInMS);
}
