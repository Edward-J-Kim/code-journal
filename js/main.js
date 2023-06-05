const div = document.querySelector('.all-entries');
const photoURL = document.getElementById('image-url');
const entriesPage = document.getElementById('entries-page');

photoURL.addEventListener('input', function (event) {
  const img = document.querySelector('img');
  img.src = event.target.value;
});
const submitForm = document.querySelector('form');
submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = submitForm.elements.title.value;
  const image = submitForm.elements.image.value;
  const notes = submitForm.elements.notes.value;
  const newObject = {
    title,
    image,
    notes,
    entryId: data.nextEntryId
  };
  data.entries.unshift(newObject);
  data.nextEntryId++;
  const img = document.querySelector('img');
  img.src = './images/placeholder-image-square.jpg';
  submitForm.reset();

  const newEntry = renderEntry(newObject);
  div.prepend(newEntry);
  viewSwap('entries');
});

function renderEntry(entry) {

  const ul = document.createElement('ul');
  ul.setAttribute('class', 'is-flex');

  const imageLi = document.createElement('li');
  imageLi.setAttribute('class', 'column-one-half');
  ul.appendChild(imageLi);

  const imageDiv = document.createElement('div');
  imageLi.appendChild(imageDiv);

  const image = document.createElement('img');
  image.setAttribute('class', 'image-entry-desktop');
  image.setAttribute('src', entry.image);
  imageDiv.appendChild(image);

  const textLi = document.createElement('li');
  textLi.setAttribute('class', 'column-one-half');
  ul.appendChild(textLi);

  const textDiv = document.createElement('div');
  textLi.appendChild(textDiv);

  const title = document.createElement('h3');
  title.textContent = entry.title;
  textDiv.appendChild(title);

  const notes = document.createElement('p');
  notes.textContent = entry.notes;
  textDiv.appendChild(notes);

  return ul;
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length === 0) {
    toggleNoEntries();
  }

  viewSwap('entry-form');

  document.getElementById('no-entries-paragraph').className = 'has-display-block';

  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = renderEntry(data.entries[i]);
    div.appendChild(dataEntry);
  }
});

function toggleNoEntries(event) {

  if (data.entries.length === 0) {
    entriesPage.className = 'has-display-none ';
  } else {
    entriesPage.className = 'entries-desktop';
  }
}

function viewSwap(view) {
  const entryForm = document.querySelector('.entry-form');

  if (view === 'entries') {
    entryForm.style.display = 'none';
    entriesPage.className = 'entries-desktop';

    if (data.entries.length > 0) {
      document.getElementById('no-entries-paragraph').className = 'has-display-none';

    }
  }

  if (view === 'entry-form') {
    entryForm.style.display = 'block';
    entriesPage.className = 'has-display-none';
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
