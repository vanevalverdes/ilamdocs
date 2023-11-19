/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_y1SweGv` ON `category` (`publicId`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  collection.indexes = [
    "CREATE INDEX `idx_y1SweGv` ON `category` (`publicId`)"
  ]

  return dao.saveCollection(collection)
})
