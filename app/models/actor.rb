class Actor < ApplicationRecord
  include AlgoliaSearch
  algoliasearch do
    attributes :name, :alternative_name
    searchableAttributes [:name, :alternative_name]
    customRanking ['desc(rating)']
  end
end
