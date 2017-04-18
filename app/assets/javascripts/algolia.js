$(document).ready(function () {
  var client = algoliasearch('XXX', 'XXX')
  var index = client.initIndex('Actor');
  autocomplete('#search-input', { hint: false }, [
    {
      source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
      displayKey: 'name',
      templates: {
        suggestion: function(suggestion) {
          return suggestion._highlightResult.name.value;
        }
      }
    }
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
    location.href = '/actors/' + suggestion.objectID
  });
});
