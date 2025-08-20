// browser apis: sidebarAction, storage, action, alarms, theme, runtime
// listeners must be synchronous and at the top of the script
// no global variables; use storage api to manage state
// use alarms instead of setTimeout()

// script purposes and timeline ish 
// background script: when extension is installed, open to popup to get the user to enter their typing goals (duration and frequency (day/week/month/year)) into the popup. 
// popup script: whenever form data is changed, store it or just send it to the background script to recompute the longest streak. 
// background script: limit total monkeytype api requests to 30. get test activity for the last 372 days and grab as many results as possible. compute the time spent typing for each day, store it, and then compute the longest streak that satisfies the users goal. if the streak has yet to end, keep it as the current one as well. store the data for the last day separately but throw it into the pile with the rest of the data at midnight (via alarm). send computation back to the popup to display. 
// popup script: skeleton ui while waiting for background script streak computation, display historical best streak and current streak with goal. 
// content script: add an event listener to somehow detect when a user is typing. when a test completes, send the data over to the background script for the corresponding day. also, steal the theme that the use is using for the icon and update the icon. Then, add event listeners to the theme buttons change the icon theme whenever the user changes their mt theme.
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
