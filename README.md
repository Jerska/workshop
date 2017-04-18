# Workshop Step 2

Let's go further this time, we'll try to add an instant feeling to the page.

1. Create a new `/actors/instant_search` route.
2. Add a new empty `instant_search` method in the actor controller
3. Change the action of the form in `app/views/actors/index.html.erb` to target this new route.
4. Create a new `instant_search` view.
   In this one, you can copy-paste the header of your current `search` view, but keep the input and list out of it
5. For this step, we'll use another JavaScript library: `instantsearch.js`. It works as lego bricks for an instant search page.  
   Its documentation can be found here: https://community.algolia.com/instantsearch.js/documentation/ and an example of a basic set up here: https://community.algolia.com/instantsearch.js/documentation/#start .
6. First, let's add the script and its style to `app/views/layouts/application.html.erb`:

    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/instantsearch.js/1/instantsearch.min.css" />
    <script src="https://cdn.jsdelivr.net/instantsearch.js/1/instantsearch.min.js"></script>
    ```

7. Let's add the two main lego blocks in your HTML first:

    ```html
    <input id="search-box" type="text" />
    <ul id="results"></ul>
    ```

8. Then in a `app/assets/javascripts/algolia-instantsearch.js` file, let's add the main logic:

    ```js
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
    ```

9. Try to play with other widgets. `stats`, `pagination` and `slider` are all good candidates here.
10. Style it! Use the `image_path` in the records to display the picture of the actor/actress. (You need to prefix them with "https://image.tmdb.org/t/p/w45/")

## If you're stuck

[Add instant search to the code](https://github.com/Jerskouille/workshop/commit/025f4043ad993851bd686f55d434986c7167972d)
