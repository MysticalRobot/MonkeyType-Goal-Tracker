import { schemaContainer, validate } from './utils.ts';

// gets the colors that Monkeytype uses for it's tab icon
const getTheme = (() => {
  const root_style = window.getComputedStyle(document.documentElement);
  return (): Theme => (Object.freeze({
    mainColor: root_style.getPropertyValue('--main-color').substring(1),
    bgColor: root_style.getPropertyValue('--bg-color').substring(1)
  }))
})();

// if needed, handles the request to, and response from, the bg script to update the icon 
const updateIcon = (() => {
  let theme: Theme & UpdateIconRequest | undefined = undefined;
  return async () => {
    try {
      const currentTheme = getTheme();
      if (theme !== undefined && currentTheme.bgColor === theme.bgColor &&
        currentTheme.mainColor === theme.mainColor) {
        return;
      }
      theme = currentTheme;
      console.debug('making UpdateIconRequest');
      const response = await browser.runtime.sendMessage(theme);
      const validationError = validate(response, schemaContainer.updateIconResponse);
      if (validationError !== undefined) {
        throw new Error(`failed UpdateIconRequest, ${validationError}`);
      }
      const updateIconResponse = response as UpdateIconResponse;
      if (!updateIconResponse.success) {
        throw new Error(updateIconResponse.message);
      } else if (updateIconResponse.success) {
        console.debug(updateIconResponse.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
})();

// sets and removes the interval to update the icon upon the document's 
// visibilitychange to prevent meddling requests from inactive tabs
const intervalManager = (() => {
  let interval: NodeJS.Timeout | undefined;
  return () => {
    if (document.hidden) {
      console.log('clearing interval');
      clearInterval(interval);
    } else {
      console.log('setting interval');
      interval = setInterval(updateIcon, 1000);
    }
  };
})();
document.addEventListener('visibilitychange', intervalManager);

// update the icon updon the addition or removal of child nodes to the 
// document's body because monkeytype updates the theme this way
// (in particluar, it adds and removes links to stylesheets)
const observer = new MutationObserver(updateIcon);
observer.observe(document.body, { childList: true });

// update the icon upon page load
updateIcon();
