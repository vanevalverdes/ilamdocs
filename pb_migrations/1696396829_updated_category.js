/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_tHd8axZ` ON `category` (`publicId`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wrpjb8n6",
    "name": "publicId",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  collection.indexes = []

  // remove
  collection.schema.removeField("wrpjb8n6")

  return dao.saveCollection(collection)
})
