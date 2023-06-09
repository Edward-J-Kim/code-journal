const $ul = document.querySelector('.all-entries');
const $photoURL = document.getElementById('image-url');
const $entriesPage = document.getElementById('entries-page');
const $img = document.querySelector('img');
const $entryForm = document.querySelector('.entry-form');
const ul = document.querySelector('ul.all-entries');
const noEntriesParagraph = document.getElementById('no-entries-paragraph');
const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image-url');
const notesInput = document.getElementById('user-notes');
const entriesLink = document.querySelector('.menu-entries');

const img = document.querySelector('.display .image').firstChild;

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
    notes
  };

  if (data.editing === null) {
    newObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObject);
    const newEntry = renderEntry(newObject);
    $ul.prepend(newEntry);

  } else {
    const editedEntryId = data.editing.entryId;
    const editedEntry = {
      title,
      image,
      notes,
      entryId: editedEntryId
    };
    const index = data.entries.findIndex(entry => entry.entryId === editedEntryId);
    if (index !== -1) {
      data.entries[index] = editedEntry;
      const updatedEntry = renderEntry(editedEntry);
      const liToUpdate = $ul.querySelector(`li[data-entry-id="${editedEntryId}"]`);
      if (liToUpdate) {
        liToUpdate.replaceWith(updatedEntry);
      }
    }

    data.editing = null;
    viewSwap('entries');
  }

  $img.src = './images/placeholder-image-square.jpg';
  $submitForm.reset();
});

ul.addEventListener('click', function (event) {
  const clickedEntryId = event.target.attributes['data-entry-id'].value;

  viewSwap('entry-form');

  for (let i = 0; i < data.entries.length; i++) {
    if (parseInt(data.entries[i].entryId) === parseInt(clickedEntryId)) {
      data.editing = data.entries[i];
    }
  }

  populateEntryForm();
});

function renderEntry(entry) {
  const uli = document.createElement('li');
  uli.setAttribute('class', 'is-flex');
  uli.setAttribute('data-entry-id', entry.entryId);

  const imageDiv = document.createElement('div');
  imageDiv.setAttribute('class', 'column-one-half');
  uli.appendChild(imageDiv);

  const image = document.createElement('img');
  image.setAttribute('class', 'image-entry-desktop');
  image.setAttribute('alt', 'Image Description');
  image.setAttribute('src', entry.image);
  imageDiv.appendChild(image);

  const textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-one-half padding');
  uli.appendChild(textDiv);

  const textDivContainer = document.createElement('div');
  textDiv.appendChild(textDivContainer);
  textDivContainer.setAttribute('class', 'text-div');

  const title = document.createElement('h3');
  title.textContent = entry.title;
  textDivContainer.appendChild(title);

  const notes = document.createElement('p');
  notes.textContent = entry.notes;
  title.appendChild(notes);

  const pencil = document.createElement('i');
  pencil.setAttribute('class', 'fa-solid fa-pencil');
  pencil.setAttribute('data-entry-id', entry.entryId);
  textDivContainer.appendChild(pencil);

  return uli;
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length === 0) {
    toggleNoEntries();
  }

  viewSwap('data.view');

  noEntriesParagraph.className = 'has-display-block';

  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = renderEntry(data.entries[i]);
    ul.appendChild(dataEntry);
  }
});

function toggleNoEntries(event) {
  if (data.entries.length === 0) {
    $entriesPage.className = 'has-display-none';
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

function populateEntryForm() {

  img.setAttribute('src', data.editing.image);

  titleInput.value = data.editing.title;
  imageInput.value = data.editing.image;
  notesInput.value = data.editing.notes;

  const editTitle = document.querySelector('.new-entry');
  editTitle.textContent = 'Edit Entry';
}

entriesLink.addEventListener('click', function (event) {
  viewSwap('entries');
});

const newEntry = document.querySelector('.new-entries');
newEntry.addEventListener('click', function (event) {
  const editTitle = document.querySelector('.new-entry');
  editTitle.textContent = 'New Entry';
  viewSwap('entry-form');
});

// const newEntry = document.querySelector('.new-entries');
// newEntry.addEventListener('click', function (event) {
//   const editTitle = document.querySelector('.new-entry');
//   editTitle.textContent = 'New Entry';
//   viewSwap('entry-form');
// });
