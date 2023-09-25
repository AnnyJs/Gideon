function perGlobalSearch() {
  var searchGlobal = document.getElementById('searchInput').value;
  var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchGlobal);
  window.open(searchUrl, '_blank');
}
document.getElementById('searchInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      perGlobalSearch();
      var suggestionsList = document.getElementById('suggestions');
      suggestionsList.innerHTML = '';
  }
});