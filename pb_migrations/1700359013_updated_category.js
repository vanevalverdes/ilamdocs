/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  collection.indexes = [
    "CREATE INDEX `idx_lQcbuB1` ON `category` (`is_parent`)"
  ]

  return dao.saveCollection(collection)
})
