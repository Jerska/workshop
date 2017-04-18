# Workshop

Sample Rails app with a single model: `Actor`.
This model contains the following properties:
- `name`: string
- `rating`: integer
- `image_path`: string
- `alternative_name`: string

## Steps to recreate this repository

### Initial setup

```sh
gem install rails -v 5
rails new workshop
rails g scaffold Actor name:string rating:integer image_path:string alternative_name:string
bundle exec rake db:migrate
bundle exec rake db:seed
```

Just for some beauty, in `app/views/layouts/application.html.erb`:
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/bootstrap/3.3.7/css/bootstrap.min.css" />
```

### Algolia configuration

```sh
echo "gem 'algoliasearch-rails', '~> 1.19.0'" >> Gemfile
bundle install
```

In `config/initializers/algoliasearch.rb`:

```ruby
AlgoliaSearch.configuration = {
  application_id: 'XXX',
  api_key: 'XXX'
}
```

In `app/models/actor.rb`:
```ruby
include AlgoliaSearch
algoliasearch do
  attributes :name, :alternative_name, :image_path, :rating
  searchableAttributes [:name, :alternative_name]
  customRanking ['desc(rating)']
end
```

### Algolia verification

In your `rails console`:

```ruby
Actor.reindex!
```

Check your Algolia dashboard, a new index should be there!

In your console again, try:

```ruby
pp Actor.search('George')
```

In `app/views/actors/index.html.erb`:

```html
<form action="/actors/search">
  <input id="search-input" type="text" name="query" placeholder="Search for actors..."/>
</form>
```

### Algolia front-end

In `app/views/layouts/application.html.erb`, before the Rails application bundle:

```html
<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
<script src="https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>
```

In `app/assets/javascripts/algolia.js`:

```js
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
```

In `app/assets/stylesheets/algolia.css`:

```css
.algolia-autocomplete {
  width: 100%;
}
.algolia-autocomplete .aa-input, .algolia-autocomplete .aa-hint {
  width: 100%;
}
.algolia-autocomplete .aa-hint {
  color: #999;
}
.algolia-autocomplete .aa-dropdown-menu {
  width: 100%;
  background-color: #fff;
  border: 1px solid #999;
  border-top: none;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
  cursor: pointer;
  padding: 5px 4px;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
  background-color: #B2D7FF;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
  font-weight: bold;
  font-style: normal;
}
```

## Next step

[Go to step 1](https://github.com/Jerskouille/workshop/tree/step1)
