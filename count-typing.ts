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
