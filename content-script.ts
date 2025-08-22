console.log('update-icon loaded');
const body = document.body;
const action = 'updateIcon';
const callback = (mutationList: Array<MutationRecord>): void => {
  for (const mutation of mutationList) {
    mutation.addedNodes.forEach((addedNode) => {
      if (!(addedNode instanceof HTMLLinkElement)) return;
      if (addedNode.getAttribute('id') !== 'nextTheme') return;
      const style = window.getComputedStyle(body, '::selection');
      const mainColor = style.backgroundColor.split(' ').join('');
      const backgroundColor = style.color.split(' ').join('');
      console.log(mainColor, backgroundColor);
      browser.runtime.sendMessage({ action, mainColor, backgroundColor })
        .catch((error) => {
          console.error('failed to update icon', error);
        })
    });
  }
};
const mtObserver = new MutationObserver(callback);
const config = { childList: true };
mtObserver.observe(body, config)
