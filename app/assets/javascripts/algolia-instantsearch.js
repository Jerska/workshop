$(document).ready(function() {
  var search = instantsearch({
    appId: 'XXX',
    apiKey: 'XXX',
    indexName: 'Actor'
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search for actors...'
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#results',
      templates: {
        item: '<li>{{ name }}</li>'
      }
    })
  );

  search.start();
});
