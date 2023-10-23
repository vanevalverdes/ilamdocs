/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  // remove
  collection.schema.removeField("qwpkkzad")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8mge0cb5",
    "name": "institution",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "q6gzppj00x5mqq2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qwpkkzad",
    "name": "institution",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("8mge0cb5")

  return dao.saveCollection(collection)
})
