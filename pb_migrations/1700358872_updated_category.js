/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  collection.indexes = [
    "CREATE INDEX `idx_lQcbuB1` ON `category` (`is_parent`)"
  ]

  // update
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wrpjb8n6",
    "name": "publicId",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
})
