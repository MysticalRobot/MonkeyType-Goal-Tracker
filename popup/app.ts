const defaultTheme: Theme = { mainColor: "e2b714", bgColor: "323437" };

async function init() {
  try {
    const themeKey: keyof BrowserStorage = 'theme';
    const theme = await browser.storage.local.get(themeKey);
    // TODO set css var colors using theme

    // maybe create functions for this
    const usernameInput = document.getElementById('usernameInput');
    if (usernameInput === null || !(usernameInput instanceof HTMLInputElement)) {
      throw new Error('unable to get usernameInput');
    }
    const apeKeyInput = document.getElementById('apeKeyInput');
    if (apeKeyInput === null || !(apeKeyInput instanceof HTMLInputElement)) {
      throw new Error('unable to get apeKeyInput');
    }
    const saveUsernameInput = document.getElementById('saveUsernameInput');
    if (saveUsernameInput === null) {
      throw new Error('unable to get confirmUsernameInput');
    }

    const port = browser.runtime.connect();
    port.postMessage('hi');
    port.disconnect();
    saveUsernameInput.addEventListener('click', (pointerEvent) => {
      pointerEvent.preventDefault();
      const username = usernameInput.value;
      const apeKey = apeKeyInput.value;
    });

    const dayInputs = document.getElementsByClassName('dayInput');
    const daysInWeek = 7;
    if (dayInputs.length !== daysInWeek) {
      throw new Error('unable to get all the dayInputs');
    }
    const saveGoalInput = document.getElementById('saveGoalInput');
    if (saveGoalInput === null) {
      throw new Error('unable to get saveGoalInput');
    }
    saveGoalInput.addEventListener('click', (pointerEvent) => {
      pointerEvent.preventDefault();
    });
    // TODO grab the user info
    // TODO add schema for ts or scrap it tbh
    // saveGoalInput.click();
  } catch (error) {
    console.error(error);
  }
}

init();
