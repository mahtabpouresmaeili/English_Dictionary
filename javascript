const inputEl = document.getElementById('input');
const infoTextEl = document.getElementById('info-text');
const meaningContainerEl = document.getElementById('meaning-container');
const titleEl = document.getElementById('title');
const audioEl = document.getElementById('audio');
const meaningEl = document.getElementById('meaning');

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"...`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((response) => response.json());

    infoTextEl.style.display = "none";
    meaningContainerEl.style.display = "block";

    titleEl.innerText = result[0].word;

    const meanings = result[0].meanings;
    const definition = meanings[0].definitions[0].definition;
    meaningEl.innerText = definition;

    audioEl.src = result[0].phonetics[0]?.audio || "";

  } catch (error) {
    infoTextEl.innerText = "An error occurred. Please try another word.";
    meaningContainerEl.style.display = "none";
    console.log(error);
  }
}

inputEl.addEventListener('keyup', (event) => {
  if (event.target.value && event.key === 'Enter') {
    fetchAPI(event.target.value);
  }
});
