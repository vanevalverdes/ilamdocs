/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_r03SWil` ON `document` (`publicId`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  collection.indexes = []

  return dao.saveCollection(collection)
})
