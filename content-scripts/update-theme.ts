import { getIntervalManager } from '../utils.ts';

// gets the colors that the current Monkeytype tab is using
const getTheme = (() => {
  // although the theme may change, this reference will not change
  const root_style = window.getComputedStyle(document.documentElement);
  return (): Theme => ({
    mainColor: root_style.getPropertyValue('--main-color').substring(1),
    bgColor: root_style.getPropertyValue('--bg-color').substring(1),
    subColor: root_style.getPropertyValue('--sub-color').substring(1),
    textColor: root_style.getPropertyValue('--text-color').substring(1),
    errorColor: root_style.getPropertyValue('--error-color').substring(1)
  })
})();

// sends a request to the bg script to update the icon 
const updateIcon = (() => {
  let theme: Theme | undefined = undefined;
  return async () => {
    const currentTheme = getTheme();
    if (theme !== undefined && currentTheme.bgColor === theme.bgColor &&
      currentTheme.mainColor === theme.mainColor) {
      return;
    }
    theme = currentTheme;
    console.debug('sending UpdateIconMessage');
    const message: UpdateIconMessage = { action: 'updateIcon', theme };
    try {
      const response: MessageResponse = await browser.runtime.sendMessage(message);
      if (response.success) {
        console.debug(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
})();

// periodically updates the icon as needed while the current tab is active 
const oneSecond = 1000;
document.addEventListener('visibilitychange',
  getIntervalManager(updateIcon, oneSecond, 'updateIcon'));

// update the icon upon the addition or removal of stylesheets from the document's body 
const observer = new MutationObserver(updateIcon);
observer.observe(document.body, { childList: true });
