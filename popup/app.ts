const navButtons = document.getElementsByClassName('navButton') as HTMLCollectionOf<HTMLButtonElement>;
const tabs = document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLDivElement>;

// display the tab that was clicked on, hide the rest
for (const navButton of navButtons) {
  navButton.addEventListener('click', () => {
    for (const tab of tabs) {
      // ignore the 'Tab' suffix in the tab's id
      if (tab.id.startsWith(navButton.id)) {
        tab.classList.remove('hidden');
      } else {
        tab.classList.add('hidden');
      }
    }
  });
}
