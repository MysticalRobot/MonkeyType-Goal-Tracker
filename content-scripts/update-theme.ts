// gets the colors that the current Monkeytype tab is using
const getTheme = (() => {
  // although the theme may change, this reference will not change
  const root_style = window.getComputedStyle(document.documentElement);
  return (): Theme => ({
    mainColor: root_style.getPropertyValue('--main-color').substring(1),
    bgColor: root_style.getPropertyValue('--bg-color').substring(1)
  })
})();

// established a connection to the bg script
const port = browser.runtime.connect();
port.onMessage.addListener((message: object) => {
  // only UpdateIconResponse messages need to be handled 
  const updateIconResponse = message as UpdateIconResponse;
  if (!updateIconResponse.success) {
    console.error(updateIconResponse.message);
  } else if (updateIconResponse.success) {
    console.debug(updateIconResponse.message);
  }
});

// sends a request to the bg script to update the icon 
const updateIconRequester = (() => {
  let theme: Theme & UpdateIconRequest | undefined = undefined;
  return () => {
    const currentTheme = getTheme();
    if (theme !== undefined && currentTheme.bgColor === theme.bgColor &&
      currentTheme.mainColor === theme.mainColor) {
      return;
    }
    theme = currentTheme;
    console.debug('making UpdateIconRequest');
    port.postMessage(theme);
  }
})();

// periodically updates the icon as needed while the current tab is active 
const intervalManager = (() => {
  let interval: number | undefined = undefined
  return () => {
    if (document.hidden && port !== undefined) {
      console.debug('clearing interval');
      clearInterval(interval);
      interval = undefined;

    } else {
      console.debug('settings interval');
      const oneSecond = 1000;
      interval = setInterval(updateIconRequester, oneSecond);
    }
  };
})();
document.addEventListener('visibilitychange', intervalManager);

// update the icon upon the addition or removal of stylesheets from the document's body 
const observer = new MutationObserver(updateIconRequester);
observer.observe(document.body, { childList: true });
