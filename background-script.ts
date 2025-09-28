import icon from './assets/icon.js';

// modifies the icon svg with the theme's colors and creates a data URI to use it
function getIconURI(theme: Theme): string {
  const mainColor = /e2b714/g;
  const bgColor = /323437/g;
  const modifedIcon = icon
    .replace(mainColor, theme.mainColor)
    .replace(bgColor, theme.bgColor);
  return `data:image/svg+xml;base64,${window.btoa(modifedIcon)}`;
}

function createUpdateIconRequestHandler(port: browser.runtime.Port,
  sender: browser.runtime.MessageSender) {
  return (message: object) => {
    // wrapped the async function, which should not throw errors, to type check
    (async () => {
      const theme = message as Theme;
      try {
        // this case probably will not happen 🤓
        if (sender.tab === undefined) {
          console.debug('ignoring UpdateIconRequest from closed tab');
          return;
        }
        if (sender.tab.id === undefined) {
          port.postMessage({
            success: false, message: 'failed UpdateIconRequest, unable to get tabId'
          } as UpdateIconResponse);
          return;
        }
        console.debug('recieved UpdateIconRequest, updating icon');
        await browser.storage.local.set({ theme });
        const iconDataURI = getIconURI(theme);
        await browser.storage.local.set({ iconDataURI });
        await browser.action.setIcon({ path: iconDataURI, tabId: sender.tab.id });
        port.postMessage({
          success: true,
          message: 'completed UpdateIconRequest, icon updated'
        } as UpdateIconResponse);
      } catch (error) {
        port.postMessage({
          success: false, message: `failed UpdateIconRequest, ${error}`
        } as UpdateIconResponse);
      }
    })();
  }
}

// respond to requests from the content script to set the icon
browser.runtime.onConnect.addListener((port) => {
  const sender = port.sender;
  if (sender === undefined) {
    port.disconnect();
    return;
  }
  const updateIconRequestHandler = createUpdateIconRequestHandler(port, sender);
  port.onMessage.addListener(updateIconRequestHandler);
});

// attempts to set the icon upon browser startup using a cached version of it
browser.runtime.onStartup.addListener(async () => {
  try {
    const iconDataURIKey: keyof BrowserStorage = 'iconDataURI';
    const iconDataURI = await browser.storage.local.get(iconDataURIKey);
    await browser.action.setIcon(iconDataURI);
  } catch (error) {
    console.error(error);
  }
});

// TODO create custom event(s) and listeners that fire and notify 
// respectively when the user hits certain milestones of their goal 

// const title = browser.i18n.getMessage('notificationTitle');
// const message = browser.i18n.getMessage('notificationContent', placeholder);
// browser.notifications.create({
//   type: 'basic',
//   iconUrl: browser.extension.getURL("icons/link-48.png"),
//   title: 'blah blah',
//   message: 'yass bitch'
// });
//
