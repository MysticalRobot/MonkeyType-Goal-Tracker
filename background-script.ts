import icon from './assets/icon.js';

// modifies the icon svg with the theme's colors and creates a data URI to use it
function getIconURI(theme: Theme): string {
  const mainColor = /e2b714/g;
  const bgColor = /323437/g;
  const modifedIcon = icon
    .replace(mainColor, theme.mainColor)
    .replace(bgColor, theme.bgColor);
  return 'data:image/svg+xml;base64,' + window.btoa(modifedIcon);
}
async function updateIconMessageHandler(message: UpdateIconMessage,
  sender: browser.runtime.MessageSender): Promise<MessageResponse> {
  console.debug('recieved UpdateIconMessage');
  const theme = message.theme;
  const tab = sender.tab;
  // this case probably will not happen 🤓
  if (tab === undefined) {
    return {
      success: false,
      message: 'UpdateIconMessage from closed tab ignored'
    };
  }
  if (tab.id === undefined) {
    return {
      success: false,
      message: 'failed to update icon, unable to get tab id'
    };
  }
  const iconDataURI = getIconURI(theme);
  const key: keyof BrowserStorage = 'themes';
  try {
    const container = await browser.storage.local.get(key);
    const initializeThemes = Object.entries(container).length === 0;
    const themes: Map<number, Theme> & BrowserStorage[keyof BrowserStorage]
      = initializeThemes ? new Map<number, Theme>() : container.themes;
    themes.set(tab.id, theme);
    await browser.storage.local.set({ themes });
    await browser.action.setIcon({ path: iconDataURI, tabId: tab.id });
    return { success: true, message: 'icon updated' };
  } catch (error) {
    return { success: false, message: 'failed to update icon, ' + error };
  }
}

async function saveTimeTypingMessageHandler(message: SaveTimeTypingMessage,
  sender: browser.runtime.MessageSender): Promise<MessageResponse> {
  console.debug('recieved saveTimeTypingMessage');
  const key: keyof BrowserStorage = 'timeTypingTodaySeconds';
  try {
    const container = await browser.storage.local.get(key);
    const initializeTimeTypingTodaySeconds = Object.entries(container).length === 0;
    const timeTypingTodaySeconds: number & BrowserStorage[keyof BrowserStorage]
      = (initializeTimeTypingTodaySeconds ? 0 : container.timeTypingTodaySeconds)
      + message.timeTypingSeconds;
    await browser.storage.local.set({ timeTypingTodaySeconds });
    return {
      success: true,
      message: `saved ${message.timeTypingSeconds} timeTypingSeconds`
    }
  } catch (error) {
    return {
      success: false, message: 'failed to save timeTypingSeconds, ' + error
    }
  }
}

// respond to requests from the content script to set the icon
browser.runtime.onMessage.addListener((message: Message,
  sender: browser.runtime.MessageSender): Promise<MessageResponse> => {
  // TODO fill in with the other functions
  switch (message.action) {
    case 'updateIcon':
      return updateIconMessageHandler(message as UpdateIconMessage, sender);
    case 'saveTimeTyping':
      return saveTimeTypingMessageHandler(message as SaveTimeTypingMessage, sender);
    case 'updateStreaks':
      break;
    case 'checkLoginStatus':
      break;
    case 'loadInfo':
      break;
  }
  return Promise.resolve({
    success: false,
    message: 'idk what happened; we gotta go bald',
  });
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
