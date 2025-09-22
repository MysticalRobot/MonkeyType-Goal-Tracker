import { getIconURI, schemaContainer, validate } from './utils.ts';

browser.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((request) => {
    console.log(request);
  });
});

// respond to requests from the content script to set the icon
browser.runtime.onMessage.addListener(
  async (request: any, sender: browser.runtime.MessageSender) => {
    try {
      const validationError = validate(request, schemaContainer.updateIconRequest);
      if (validationError !== undefined) {
        console.debug(`recieved non UpdateIconRequest, ${validationError}`);
        return false;
      }
      const theme = request as UpdateIconRequest;
      if (sender.tab === undefined) {
        console.debug('ignoring UpdateIconRequest from closed tab');
        return false;
      }
      if (sender.tab.id === undefined) {
        return Promise.resolve(Object.freeze({
          success: false, message: 'failed UpdateIconRequest, unable to get tabId'
        } as UpdateIconResponse));
      }
      console.debug('recieved UpdateIconRequest, updating icon');
      await browser.storage.local.set({ theme });
      const iconDataURI = getIconURI(theme);
      await browser.storage.local.set({ iconDataURI });
      await browser.action.setIcon({ path: iconDataURI, tabId: sender.tab.id });
      return Object.freeze({
        success: true,
        message: 'completed UpdateIconRequest, icon updated'
      } as UpdateIconResponse)
    } catch (error) {
      return Promise.resolve(Object.freeze({
        success: false, message: `failed UpdateIconRequest, ${error}`
      } as UpdateIconResponse));
    }
  });

// attempts to set the icon upon browser startup using a cached version of it
browser.runtime.onStartup.addListener(async () => {
  try {
    // TODO maybe avoid getting the whole storage (for now it's small so it doesn't matter)
    const browserStorage = await browser.storage.local.get(null);
    const validationError = validate(browserStorage, schemaContainer.browserStorage);
    if (validationError !== undefined) {
      console.debug(`unable to retrieve browserStorage: ${validationError}`);
      return;
    }
    await browser.action.setIcon(browserStorage.iconDataURI);
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
