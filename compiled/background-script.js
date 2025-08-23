import { freezeObject, validate } from './utils.js';
async function updateIconAndCacheURI(iconDataURI) {
    await browser.storage.local.set({ iconDataURI });
    return browser.action.setIcon({ path: iconDataURI });
}
// requests icon data uri from the content script and 
// caches it into local storage for notification to use
async function makeIconDataURIRequest(tabId) {
    const request = freezeObject({
        action: 'sendIconDataURI'
    });
    console.log('making IconDataURIRequest');
    const response = await browser.tabs.sendMessage(tabId, request);
    const validationResult = validate(response, freezeObject({
        iconDataURI: 'skibidi toilet (random ahh string)'
    }));
    if (validationResult !== undefined) {
        throw new Error(`failed IconDataURIRequest, ${validationResult}`);
    }
    return updateIconAndCacheURI(response.iconDataURI);
}
// respond to requests from the content script to set the icon
browser.runtime.onMessage.addListener(async (request) => {
    try {
        const validationResult = validate(request, freezeObject({
            action: 'updateIcon', iconDataURI: 'skibidi toilet'
        }));
        if (validationResult !== undefined) {
            console.log(`recieved non UpdateIconRequest, ${validationResult}`);
            return false;
        }
        console.log('recieved UpdateIconRequest, updating icon');
        await updateIconAndCacheURI(request.iconDataURI);
        return freezeObject({
            success: true,
            message: 'completed UpdateIconRequest, icon updated'
        });
    }
    catch (error) {
        return Promise.resolve(freezeObject({
            success: false, message: `failed UpdateIconRequest, ${error}`
        }));
    }
});
// requests an icon data URI when a monkeytype tab is activated 
browser.tabs.onActivated.addListener(async (activeInfo) => {
    try {
        const tabs = await browser.tabs.query({
            active: true, currentWindow: true,
            url: 'https://monkeytype.com/*'
        });
        if (tabs.length > 0) {
            await makeIconDataURIRequest(activeInfo.tabId);
            console.log('completed IconDataURIRequest, icon updated');
        }
    }
    catch (error) {
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
