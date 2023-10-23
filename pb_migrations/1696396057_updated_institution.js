/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q6gzppj00x5mqq2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z8j7tvrj",
    "name": "service",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vzt4v4hfg0xd6ak",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q6gzppj00x5mqq2")

  // remove
  collection.schema.removeField("z8j7tvrj")

  return dao.saveCollection(collection)
})
