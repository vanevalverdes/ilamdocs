/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xsejy7ne",
    "name": "portada",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb")

  // remove
  collection.schema.removeField("xsejy7ne")

  return dao.saveCollection(collection)
})
