const $ul = document.querySelector('.all-entries');
const $photoURL = document.getElementById('image-url');
const $entriesPage = document.getElementById('entries-page');
const $img = document.querySelector('img');
const $entryForm = document.querySelector('.entry-form');
const ul = document.querySelector('ul.all-entries');
const noEntriesParagraph = document.getElementById('no-entries-paragraph');

$photoURL.addEventListener('input', function (event) {

  $img.src = event.target.value;
});
const $submitForm = document.querySelector('form');
$submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = $submitForm.elements.title.value;
  const image = $submitForm.elements.image.value;
  const notes = $submitForm.elements.notes.value;
  const newObject = {
    title,
    image,
    notes,
    entryId: data.nextEntryId
  };
  data.entries.unshift(newObject);
  data.nextEntryId++;
  $img.src = './images/placeholder-image-square.jpg';
  $submitForm.reset();

  const newEntry = renderEntry(newObject);
  $ul.prepend(newEntry);
  viewSwap('entries');
});

function renderEntry(entry) {

  const uli = document.createElement('li');
  uli.setAttribute('class', 'is-flex');

  const imageDiv = document.createElement('div');
  imageDiv.setAttribute('class', 'column-one-half');
  uli.appendChild(imageDiv);

  const image = document.createElement('img');
  image.setAttribute('class', 'image-entry-desktop');
  image.setAttribute('alt', 'Image Description'); // Replace 'Image Description' with an appropriate description
  image.setAttribute('src', entry.image);
  imageDiv.appendChild(image);

  const textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-one-half padding');
  uli.appendChild(textDiv);

  const textDivContainer = document.createElement('div');
  textDiv.appendChild(textDivContainer);

  const title = document.createElement('h3');
  title.textContent = entry.title;
  textDivContainer.appendChild(title);

  const notes = document.createElement('p');
  notes.textContent = entry.notes;
  textDivContainer.appendChild(notes);

  return uli;
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length === 0) {
    toggleNoEntries();
  }

  viewSwap('entry-form');

  noEntriesParagraph.className = 'has-display-block';

  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = renderEntry(data.entries[i]);
    ul.appendChild(dataEntry);
  }
});

function toggleNoEntries(event) {

  if (data.entries.length === 0) {
    $entriesPage.className = 'has-display-none ';
  } else {
    $entriesPage.className = 'entries-desktop';
  }
}

function viewSwap(view) {
  if (view === 'entries') {
    $entryForm.style.display = 'none';
    $entriesPage.className = 'entries-desktop';

    if (data.entries.length > 0) {
      noEntriesParagraph.className = 'has-display-none';
    }
  }

  if (view === 'entry-form') {
    $entryForm.style.display = 'block';
    $entriesPage.className = 'has-display-none';
  }
}

const entriesLink = document.querySelector('.menu-entries');
entriesLink.addEventListener('click', function (event) {
  viewSwap('entries');
});

const newEntry = document.querySelector('.new-entries');
newEntry.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
