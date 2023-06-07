const $imgLoad = document.querySelector('#user-photo-url');
const $image = document.querySelector('#imgshow');
$imgLoad.addEventListener('input', function (event) {

  $image.setAttribute('src', event.target.value);
});

const $page = document.querySelector('#information');

function pageSubmit(event) {
  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId,
    title: event.target.elements.title.value,
    photoUrl: event.target.elements.url.value,
    notes: event.target.elements.notes.value
  };

  $page.reset();
  data.nextEntryId++;
  data.entries.unshift(entry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
}

$page.addEventListener('submit', pageSubmit);
