/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJson);
});

const previousDataJson = localStorage.getItem('javascript-local-storage');
if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}
