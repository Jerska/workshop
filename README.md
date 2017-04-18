# Workshop Step 1

The goal here is simply to add a backend search.

1. Create a `/actors/search` route.
2. Add a new `search` method that accepts a `query` parameter
3. Set up a sample results list in this method:

    ```ruby
    def search
      @results = [{name: 'Test 1'}, {name: 'Test 2'}]
    end
    ```

4. Add a `search` view in the actors namespace that will show a list with the `@results` variable content
5. First try to use `sqlite` `LIKE` syntax:

    ```ruby
    query = '%Cho%'
    Actor.where('name LIKE ? OR alternative_name LIKE ?', query, query).order('rating DESC').limit(10)
    ```

6. Run a few searches. Try with typos.
7. Now try to replace this by Algolia.
   The gem documentation is here: https://github.com/algolia/algoliasearch-rails .

## Next step

[Go to step 2](https://github.com/Jerskouille/workshop/tree/step2)

## If you're stuck

1. [Step 0 to `LIKE` search](https://github.com/Jerskouille/workshop/commit/8f40d790cb5c02c560df609c2b22bf6863374e6a)
2. [`LIKE` to `Algolia`](https://github.com/Jerskouille/workshop/commit/2f7e5259576bac687004326e62bbc30ffd28257e)
