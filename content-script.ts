import { icon, mainColor, bgColor, freezeObject, validate } from './utils.js';

const computeIconDataURI = (() => {
  const root_style = window.getComputedStyle(document.documentElement);
  return () => {
    // modify the svg string with the new hexadecimal colors and create a URI with it
    const modifedIcon = icon
      .split(mainColor)
      .join(root_style.getPropertyValue('--main-color').substring(1))
      .split(bgColor)
      .join(root_style.getPropertyValue('--bg-color').substring(1));
    return `data:image/svg+xml;base64,${window.btoa(modifedIcon)}`;
  }
})();

// listen for requests from the background script to send the URI 
// of the icon matching the activated tab's (this tab) theme 
browser.runtime.onMessage.addListener((request) => {
  const validationError = validate(request, freezeObject({
    action: 'sendIconDataURI'
  } as IconDataURIRequest));
  if (validationError) {
    console.error('recieved invalid IconDataURIRequest,', validationError);
    return false;
  }
  console.log('recieved IconDataURIRequest, sending IconDataURIResponse');
  return Promise.resolve(freezeObject({
    iconDataURI: computeIconDataURI()
  } as IconDataURIResponse));
});

// update the icon updon the addition or removal of child nodes to the 
// document's body because monkeytype updates the theme this way
// (in particluar, it adds and removes links to stylesheets)
const observer = new MutationObserver(() => {
  console.log('sending UpdateIconRequest');
  browser.runtime
    .sendMessage(freezeObject({
      action: 'updateIcon', iconDataURI: computeIconDataURI()
    } as UpdateIconRequest))
    .then((response) => {
      const validationError = validate(response, freezeObject({
        success: false, message: 'deez nuts'
      } as UpdateIconResponse));
      if (validationError) {
        console.error('recieved invalid UpdateIconResponse', validationError);
      } else if (!response.success) {
        console.error(response.message);
      } else if (response.success) {
        console.log(response.message);
      }
    })
    .catch((error) => { console.error(error) });
});
observer.observe(document.body, { childList: true });

// count the time spent typing
const wordsInput = document.getElementById('wordsInput');
if (wordsInput !== null) {
  let time: number = 0;
  let start: number | undefined = undefined;
  wordsInput.addEventListener('input', () => {
    if (start === undefined) {
      start = Date.now();
      return;
    }
    const end = Date.now();
    time += (end - start) / 1000;
    start = undefined;
  });
  wordsInput.addEventListener('focusout', () => {
    console.log(time);
    time = 0;
  });
}
