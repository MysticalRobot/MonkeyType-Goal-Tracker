const navLinks = document.getElementsByClassName('navLink') as HTMLCollectionOf<HTMLAnchorElement>;
const tabs = document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLDivElement>;
console.log(navLinks);
console.log(tabs);

// display the tab that was clicked on, hide the rest
for (const navLink of navLinks) {
  navLink.addEventListener('click', () => {
    // e.g. 'progressLink' -> 'progress'
    const tabId = navLink.id.slice(0, -4);
    console.log(tabId);
    for (const tab of tabs) {
      console.log(tab.id);
      tab.setAttribute('hidden', `${tab.id !== tabId}`);
    }
    console.log(tabs);
  });
}
