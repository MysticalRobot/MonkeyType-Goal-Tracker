import { freezeObject, validate } from './utils.ts';

// gets the colors that Monkeytype uses for it's tab icon
const getTheme = (() => {
  const root_style = window.getComputedStyle(document.documentElement);
  return (): Theme => ({
    mainColor: root_style.getPropertyValue('--main-color').substring(1),
    bgColor: root_style.getPropertyValue('--bg-color').substring(1)
  })
})();

// if needed, handles the request to, and response from, the bg script to update the icon 
const updateIcon = (() => {
  let theme: Theme = getTheme();
  return async () => {
    try {
      const currentTheme = getTheme();
      if (currentTheme.bgColor == theme.bgColor &&
        currentTheme.mainColor == theme.mainColor) {
        return;
      }
      theme = currentTheme;
      console.debug('making UpdateIconRequest');
      const response = await browser.runtime.sendMessage(freezeObject({
        action: 'updateIcon', theme
      } as UpdateIconRequest));
      const validationError = validate(response, freezeObject({
        success: false, message: 'deez nuts (random ahh string)'
      } as UpdateIconResponse));
      if (validationError !== undefined) {
        throw new Error(`failed UpdateIconRequest, ${validationError}`);
      } else if (!response.success) {
        throw new Error(response.message);
      } else if (response.success) {
        console.debug(response.message);
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

// listen for requests from the background script to send the URI 
// of the icon matching the activated tab's (this tab) theme 
browser.runtime.onMessage.addListener((request) => {
  const validationError = validate(request, freezeObject({
    action: 'sendTheme'
  } as ThemeRequest));
  if (validationError !== undefined) {
    console.debug(`recieved non ThemeRequest, ${validationError}`);
    return false;
  }
  console.debug('recieved ThemeRequest, sending ThemeResponse');
  return Promise.resolve(freezeObject({
    theme: getTheme()
  } as ThemeResponse));
});
