import { getIntervalManager } from "../utils";

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
  const saveTimeTyping = async () => {
    if (timeTypingSeconds === 0) {
      return;
    }
    const message: SaveTimeTypingMessage = {
      action: 'saveTimeTyping',
      timeTypingSeconds
    };
    console.debug('sending SaveTimeTypingMessage');
    const response: MessageResponse = await browser.runtime.sendMessage(message);
    if (response.success) {
      console.debug(response.message);
    } else {
      console.error(response.message);
    }
    timeTypingSeconds = 0;
  };
  return [recordTimeTyping, saveTimeTyping]
}

const wordsInput = document.getElementById('wordsInput');
const [recordTimeTyping, saveTimeTyping] = createTimingCallbacks();
if (wordsInput !== null) {
  wordsInput.addEventListener('keypress', recordTimeTyping);
  wordsInput.addEventListener('focusout', saveTimeTyping);
  // periodically save the time spent timing when the tab is active
  const tenSecondsInMS = 10000;
  document.addEventListener('visibilitychange',
    getIntervalManager(saveTimeTyping, tenSecondsInMS, 'saveTimeTyping'));
}
