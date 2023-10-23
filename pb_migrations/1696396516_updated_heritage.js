/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uvg2wcyxvpmdldv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c4y2ense",
    "name": "parent",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "uvg2wcyxvpmdldv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uvg2wcyxvpmdldv")

  // remove
  collection.schema.removeField("c4y2ense")

  return dao.saveCollection(collection)
})
