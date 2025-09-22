import { defaultTheme, schemaContainer, validate } from '../utils.ts';

// function showElement(element: Element) {
//   element.classList.remove('hidden');
//   element.ariaHidden = 'false';
// }
//
// function hideElement(element: Element) {
//   element.classList.add('hidden');
//   element.ariaHidden = 'true';
// }

function createActiveDayInputHandlers(dayInputs: Array<Element>) {
  let checkedDayInput = dayInputs.find((input) => input.getAttribute('checked') === 'true');
  const setActiveDayInput = (dayInput: Element) => (() => {
    if (checkedDayInput !== dayInput) {
      checkedDayInput = dayInput;
    }
  });
  return [setActiveDayInput];
}

async function init() {
  try {
    // TODO maybe avoid getting the whole storage, this will fail if not all components are in the storage
    // try to retrieve the theme in case it was cached
    const browserStorage = await browser.storage.local.get(null);
    const validationError = validate(browserStorage, schemaContainer.browserStorage);
    const theme = validationError === undefined ? browserStorage.theme : defaultTheme;
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

    const dayInputs = [...document.getElementsByClassName('dayInput')];
    const daysInWeek = 7;
    if (dayInputs.length !== daysInWeek) {
      throw new Error('unable to get all the dayInputs');
    }
    const saveGoalInput = document.getElementById('saveGoalInput');
    if (saveGoalInput === null) {
      throw new Error('unable to get saveGoalInput');
    }
    const [setActiveDayInput] = createActiveDayInputHandlers(dayInputs);
    dayInputs.forEach(input => input.addEventListener('click', setActiveDayInput(input)));
    saveGoalInput.addEventListener('click', (pointerEvent) => {
      pointerEvent.preventDefault();
    });

  } catch (error) {
    console.error(error);
  }
}

init();
