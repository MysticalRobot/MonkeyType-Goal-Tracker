import { freezeObject, validate } from './utils.js';
// listen for requests from the content script to set the browser action icon
browser.runtime.onMessage.addListener(async (request) => {
    const validationError = validate(request, freezeObject({
        action: 'updateIcon', iconDataURI: 'skibidi toilet'
    }));
    if (validationError) {
        return Promise.resolve(freezeObject({
            success: false,
            message: `failed UpdateIconRequest, ${validationError}`
        }));
    }
    console.log('recieved UpdateIconRequest, updating icon');
    return browser.action
        .setIcon({ path: request.iconDataURI })
        .then(() => (freezeObject({
        success: true, message: 'completed UpdateIconRequest, icon updated'
    })))
        .catch((error) => (freezeObject({
        success: false, message: `failed UpdateIconRequest, ${error}`
    })));
});
// listen for changes in the active tab to tell the content
// script to update local storage with the matching theme icon URI
browser.tabs.onActivated.addListener((activeInfo) => {
    const request = freezeObject({
        action: 'sendIconDataURI'
    });
    console.log('sending IconDataURIRequest');
    browser.tabs
        .sendMessage(activeInfo.tabId, request)
        .then((response) => {
        const validationError = validate(response, freezeObject({
            iconDataURI: 'skibidi toilet'
        }));
        if (validationError) {
            console.error('failed IconDataURIRequest, invalid IconDataURIResponse,', validationError);
            return;
        }
        return browser.action.setIcon({ path: response.iconDataURI });
    })
        .then(() => { console.log('completed IconDataURIRequest, icon updated'); })
        .catch((error) => { console.error(error); });
});
// TODO init extension
browser.runtime.onInstalled.addListener(() => { });
