import { getIconURI, freezeObject, validate } from './utils.ts';

async function cacheThemeAndIconAndSetIcon(theme: Theme) {
  try {
    await browser.storage.local.set({ theme });
    const iconDataURI: StorageKey & string = getIconURI(theme);
    await browser.storage.local.set({ iconDataURI });
    return browser.action.setIcon({ path: iconDataURI });
  } catch (error) {
    throw error;
  }
}

// respond to requests from the content script to set the icon
browser.runtime.onMessage.addListener(
  async (request: any, sender: browser.runtime.MessageSender) => {
    try {
      const validationError = validate(request, freezeObject({
        action: 'updateIcon', theme: { mainColor: '123456', bgColor: '654321' }
      } as UpdateIconRequest));
      if (validationError !== undefined) {
        console.debug(`recieved non UpdateIconRequest, ${validationError}`);
        return false;
      }
      if (!sender.tab?.active) {
        console.debug(`ignoring UpdateIconRequest from inactive tab, ${validationError}`);
        return Promise.resolve(freezeObject({
          success: true, message: 'UpdateIconRequest ignored'
        } as UpdateIconResponse));
      }
      console.debug('recieved UpdateIconRequest, updating icon');
      await cacheThemeAndIconAndSetIcon(request.theme);
      return freezeObject({
        success: true,
        message: 'completed UpdateIconRequest, icon updated'
      } as UpdateIconResponse)
    } catch (error) {
      return Promise.resolve(freezeObject({
        success: false, message: `failed UpdateIconRequest, ${error}`
      } as UpdateIconResponse));
    }
  });

// requests the theme corresponding to the activated monkeytype tab 
browser.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tabs = await browser.tabs.query({
      active: true, currentWindow: true,
      url: 'https://monkeytype.com/*'
    });
    if (tabs.length === 0) {
      return;
    }
    const request: ThemeRequest = freezeObject({
      action: 'sendTheme'
    });
    console.debug('making ThemeRequest');
    const response = await browser.tabs.sendMessage(activeInfo.tabId, request);
    const validationError = validate(response, freezeObject({
      theme: { mainColor: '123456', bgColor: '654321' }
    } as ThemeResponse));
    if (validationError !== undefined) {
      throw new Error(`failed ThemeRequest, ${validationError}`);
    }
    await cacheThemeAndIconAndSetIcon(response.theme);
    console.debug('completed ThemeRequest, icon updated');
  } catch (error) {
    console.error(error);
  }
});

// attempts to set the icon upon browser startup using a cached version of it
browser.runtime.onStartup.addListener(async () => {
  try {
    const iconDataURIContainer = await browser.storage.local.get('iconDataURI');
    const validationError = validate(iconDataURIContainer, freezeObject({
      iconDataURI: 'dattebayo!'
    }));
    if (validationError === undefined) {
      console.debug(`cached iconDataURI not found: ${validationError}`);
    }
    await browser.action.setIcon(iconDataURIContainer.iconDataURI);
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
